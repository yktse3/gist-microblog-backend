module.exports = function(e, res, next) {
  if (e.statusCode && e.response.body) {
    res.status(e.statusCode).send(e.response.body);
  } else {
    res.status(500).send(e.message);
  }
}