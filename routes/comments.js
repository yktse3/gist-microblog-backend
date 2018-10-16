const express = require('express');
const router = express.Router();
const API = require('../api');
const errorHandling = require('../errorHandling');

router.get('/', async function(req, res, next) {
  if (req.query.uri !== undefined) {
    try {
      const response = await API.getComments(req.query.uri);

      let result = response.map((comment) => {
        return {
          id: comment.id,
          userID: comment.user.login,
          content: comment.body,
        }
      });

      res.json(result);
    } catch (e) {
      errorHandling(e, res, next);
    }
  } else {
    res.send(400);
  }
});

module.exports = router;
