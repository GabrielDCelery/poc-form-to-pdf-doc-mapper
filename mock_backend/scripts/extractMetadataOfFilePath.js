const _ = require('lodash');

const extractMetadataOfFilePath = (_filePath) => {
  const _file = _.replace(_filePath, /^.*[\\\/]/, '');
  const _extension = _.chain(_file).split('.').last().value();
  const _fileName = _.replace(_file, `.${_extension}`, '');
  const _folderPath = _filePath.replace(_file, '');

  return {
    extension: _extension,
    fileName: _fileName,
    folderPath: _folderPath
  };
}

module.exports = extractMetadataOfFilePath;