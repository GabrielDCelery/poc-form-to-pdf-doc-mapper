const _ = require('lodash');
const fs = require('fs');
const path = require('path');
const multer = require('multer');
const rimraf = require('rimraf');
const extractMetadataOfFilePath = require('./extractMetadataOfFilePath');

class TempPdfSaver {
  constructor(_folderPath) {
    this.folderPath = _folderPath;
  }

  async _removeDir(_folderPath) {
    return new Promise((_accept, _reject) => {
      rimraf(_folderPath, _error => {
        if (_error) {
          return _reject(_error);
        }

        return _accept(true);
      });
    });
  }


  async _removeFile(_folderPath) {
    return new Promise((_accept, _reject) => {
      fs.unlink(_folderPath, _error => {
        if (_error) {
          return _reject(_error);
        }

        return _accept(true);
      });
    });
  }

  async saveFile(_req, _res) {
    return new Promise((_accept, _reject) => {
      let _fileName = null;

      const storage = multer.diskStorage({
        destination: this.folderPath,
        filename: (_req, _file, _callback) => {
          _fileName = `${new Date().getTime()}_${_file.originalname}`;

          _callback(null, _fileName);
        },
      });
      const upload = multer({ storage: storage }).single('file');

      upload(_req, _res, _error => {
        if (_error) {
          return _reject(_error);
        }

        return _accept({
          fileName: _fileName,
          filePath: _.isNil(_fileName) ? null : path.join(this.folderPath, _fileName)
        });
      })
    });
  }

  async removeFile(_fileName) {
    const _filePath = path.join(this.folderPath, _fileName);
    const { fileName, folderPath } = extractMetadataOfFilePath(_filePath);
    const _pngFolderPath = path.join(folderPath, fileName);

    await this._removeDir(_pngFolderPath);
    await this._removeFile(_filePath);
  }
}

module.exports = TempPdfSaver;