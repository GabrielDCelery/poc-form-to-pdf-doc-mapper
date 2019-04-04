const express = require('express');
const router = express.Router();
const TempPdfSaver = require('../scripts/TempPdfSaver');
const PdfToPngConverter = require('../scripts/PdfToPngConverter');
const path = require('path');
const FilesLogger = require('../scripts/FilesLogger');

router.get('/getlist', async (_req, _res) => {
  try {
    const _folderPath = path.join(__dirname, '../files');
    const _pdfs = await new FilesLogger(_folderPath).getListOfPdfs();

    return _res.send({
      success: true,
      statusCode: 200,
      message: null,
      payload: _pdfs
    });
  } catch (_error) {
    return _res.send({
      success: false,
      statusCode: 400,
      message: _error.message,
      payload: null
    });
  }
});

router.post('/save', async (_req, _res) => {
  try {
    const _folderPath = path.join(__dirname, '../files');
    const { filePath } = await new TempPdfSaver(_folderPath).saveFile(_req, _res);
    const { fileName, numOfPages } = await new PdfToPngConverter(_folderPath).process(filePath);
    await new FilesLogger(_folderPath).appendPdf(fileName, numOfPages);

    return _res.send({
      success: true,
      statusCode: 200,
      message: null,
      payload: null
    });
  } catch (_error) {
    return _res.send({
      success: false,
      statusCode: 400,
      message: _error.message,
      payload: null
    });
  }
});

router.post('/remove', async (_req, _res) => {
  try {
    const _folderPath = path.join(__dirname, '../files');
    const _fileName = _req['body']['fileName'];
    await new TempPdfSaver(_folderPath).removeFile(_fileName);
    //await new FilesLogger(_folderPath).removePdf(_fileName);

    return _res.send({
      success: true,
      statusCode: 200,
      message: null,
      payload: null
    });
  } catch (_error) {
    return _res.send({
      success: false,
      statusCode: 400,
      message: _error.message,
      payload: null
    });
  }
});

module.exports = router;