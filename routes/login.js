const express = require('express');
const router = express.Router();
const API = require('../api');
const errorHandling = require('../errorHandling');

router.post('/', async function(req, res, next) {
	if (req.body.code !== undefined) {
    try {
      const response = await API.getAccessToken(req.body.code);

      res.json(response);
    } catch (e) {
      errorHandling(e, res, next);
    }
  } else {
    res.send(400); //change this too.
  }
});

module.exports = router;
