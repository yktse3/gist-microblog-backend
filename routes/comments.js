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

router.post('/', async function(req, res, next) {
  if (
    req.body.id !== undefined
    && req.body.content !== undefined
    && req.body.accessToken !== undefined
  ) {
    try {
      const response = await API.createComment(
        req.body.id,
        req.body.content,
        req.body.accessToken,
      );

      res.json({
        id: response.id,
        userID: response.user.login,
        content: response.body,
      });
    } catch (e) {
      errorHandling(e, res, next);
    }
  } else {
    res.send(400);
  }
});

module.exports = router;
