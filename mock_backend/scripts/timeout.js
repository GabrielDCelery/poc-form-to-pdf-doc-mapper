
const timeout = _ms => {
  return new Promise(_accept => {
    setTimeout(_accept, _ms);
  });
}

module.exports = timeout;