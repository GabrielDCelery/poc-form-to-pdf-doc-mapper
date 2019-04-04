//const PDF2Pic = require('pdf2pic').default;
const _ = require('lodash');
const fs = require('fs');
const path = require('path');
const PdfExtractor = require('pdf-extractor').PdfExtractor;
const extractMetadataOfFilePath = require('./extractMetadataOfFilePath');

class PdfToPngConverter {
  constructor (_folderPath) {
    this.folderPath = _folderPath;
  }

  _createFolder(_folderPath, _folderName) {
    return new Promise((_accept, _reject) => {
      const _resultPath = path.join(_folderPath, _folderName);

      fs.mkdir(_resultPath, _error => {
        if (_error) {
          return _reject(_error);
        }

        return _accept(_resultPath);
      });
    });
  }

  async process(_filePath) {
    const { fileName, folderPath, extension } = extractMetadataOfFilePath(_filePath);
    const _pngFolderPath = await this._createFolder(folderPath, fileName);
    const _result = await new PdfExtractor(_pngFolderPath).parse(_filePath);

    return { 
      fileName: `${fileName}.${extension}`,
      pngFolderPath: _pngFolderPath,
      numOfPages: _.get(_result, ['jsonData', 'numpages'])
    };
  }
}

module.exports = PdfToPngConverter;