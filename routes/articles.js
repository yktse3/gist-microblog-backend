const express = require('express');
const router = express.Router();
const API = require('../api');
const errorHandling = require('../errorHandling');

router.get('/', async function(req, res, next) {
  if (req.query.accessToken !== undefined) {
    try {
      // const response = await API.getAllGists('');
      const { response, pages } = await API.getAllGists(req.query.accessToken, req.query.page);

      let result = response.map((gist) => {
        return {
          id: gist.id,
          title: gist.description,
          comments: gist.comments,
          comments_url: gist.comments_url,
          created_at: gist.created_at,
          url: gist.files[Object.keys(gist.files)[0]].raw_url,
        }
      });

      const content = await Promise.all(result
        .map((gist) => {
          return API.getGist(gist.url)
        }))
      
      result = result.map((gist, index) => {
        delete gist.url;
        gist.content = content[index];
        return gist;
      })

      res.json({
        articles: result,
        pages,
      });
    } catch (e) {
      errorHandling(e, res, next);
    }
  } else {
    res.send(400);
  }
});

router.post('/', async function(req, res, next) {
  if (req.body.title && req.body.content && req.body.accessToken) {
    try {
      const gist = await API.createGist(
        req.body.title,
        req.body.content,
        req.body.accessToken
      );
      const content = await API.getGist(gist.files[Object.keys(gist.files)[0]].raw_url);

      res.json({
        id: gist.id,
        title: gist.description,
        comments: gist.comments,
        comments_url: gist.comments_url,
        created_at: gist.created_at,
        content,
      });
    } catch (e) {
      errorHandling(e, res, next);
    }
  } else {
    res.send(400);
  }
})

module.exports = router;
