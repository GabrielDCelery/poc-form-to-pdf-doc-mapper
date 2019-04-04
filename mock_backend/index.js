const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors')
const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/pdf', require('./routes/pdf'));

app.listen(3003, () => {
  console.log(`JSON Server is running on port ${3003}`);
});