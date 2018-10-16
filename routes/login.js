const express = require('express');
const router = express.Router();
const API = require('../api');

router.post('/', async function(req, res, next) {
	if (req.body.code !== undefined) {
    const response = await API.getAccessToken(req.body.code);
    res.json(response);
  } else {
    res.send(400);
  }
});

module.exports = router;
