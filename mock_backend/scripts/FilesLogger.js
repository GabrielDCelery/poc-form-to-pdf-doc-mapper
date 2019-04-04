const _ = require('lodash');
const fs = require('fs');
const path = require('path');
const FILE_NAME = 'listOfPdfs.json';

let SINGLETON = null;

class FilesLogger {
  constructor(_folderPath) {
    if (SINGLETON) {
      return SINGLETON;
    }

    this.setFolder(_folderPath);
    SINGLETON = this;
  }

  _prepareJSONForFileWrite(_JSON) {
    return JSON.stringify(_JSON);
  }

  _convertFileDataToJSON(_fileData) {
    if (_.isNil(_fileData) || _fileData === '') {
      return [];
    }

    try {
      return JSON.parse(_fileData);
    } catch (_error) {
      return [];
    }
  }

  _readFile() {
    if (!fs.existsSync(this.filePath)) {
      return Promise.resolve(null);
    }

    return new Promise((_accept, _reject) => {
      fs.readFile(this.filePath, (_error, _data) => {
        if (_error) {
          return _reject(_error);
        }

        return _accept(_data);
      });
    });
  }

  _writeFile(_data) {
    return new Promise((_accept, _reject) => {
      fs.writeFile(this.filePath, _data, _error => {
        if (_error) {
          return _reject(_error);
        }

        return _accept(true);
      });
    });
  }

  setFolder(_folderPath) {
    this.filePath = path.join(_folderPath, FILE_NAME);

    return this;
  }

  async getListOfPdfs() {
    return this._convertFileDataToJSON(await this._readFile());
  }

  async appendPdf(_fileName, _numOfPages) {
    const _listOfPdfs = await this.getListOfPdfs();

    _listOfPdfs.push({
      fileName: _fileName,
      numOfPages: _numOfPages
    });

    return this._writeFile(this._prepareJSONForFileWrite(_listOfPdfs));
  }

  async removePdf(_fileName) {
    const _listOfPdfs = await this.getListOfPdfs();
    const _listOfFinalPdfs = [];

    _listOfPdfs.forEach(_pdf => {
      if (_pdf.fileName === _fileName) {
        return;
      }

      _listOfFinalPdfs.push(_pdf);
    });

    return this._writeFile(this._prepareJSONForFileWrite(_listOfFinalPdfs));
  }
}

module.exports = FilesLogger;