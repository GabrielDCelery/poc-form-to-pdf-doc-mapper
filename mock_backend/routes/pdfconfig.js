const express = require('express');
const router = express.Router();
const timeout = require('../utils/timeout');
const tempPdfSaver = require('../utils/tempPdfSaver');

router.post('/save', async (_req, _res) => {
  await tempPdfSaver.saveFile(_req, _res)

  return _res.send({
    success: true,
    statusCode: 200,
    payload: {}
  });
});

module.exports = router;