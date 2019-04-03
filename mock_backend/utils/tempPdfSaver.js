const path = require('path');
const multer = require('multer');

const storage = multer.diskStorage({
  destination: path.join(__dirname, '../temp'),
  filename(req, _file, _callback) {
    _callback(null, `${new Date().getTime()}-${_file.originalname}`);
  },
});

const saveFile = (_req, _res) => {
  return new Promise((_accept, _reject) => {
    const upload = multer({ storage }).single('file');

    upload(_req, _res, _error => {
      if (_error) {
        return _reject(_error);
      }

      return _accept();
    })
  });
}

class TempPdfSaver {
  constructor() {
    this.storage = multer.diskStorage({
      destination: path.join(__dirname, '../temp'),
      filename(req, _file, _callback) {
        _callback(null, `${new Date().getTime()}-${_file.originalname}`);
      },
    })
  }

  async saveFile(_req, _res) {
    return new Promise((_accept, _reject) => {
      const upload = multer({ storage: this.storage }).single('file');
  
      upload(_req, _res, _error => {
        if (_error) {
          return _reject(_error);
        }
  
        return _accept();
      })
    });
  }
}

module.exports = new TempPdfSaver();