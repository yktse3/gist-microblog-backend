const express = require('express');
const router = express.Router();
const API = require('../api');
const errorHandling = require('../errorHandling');

router.get('/', async function(req, res, next) {
  if (req.query.accessToken !== undefined) {
    try {
      // const response = await API.getAllGists('');
      const response = await API.getAllGists(req.query.accessToken);

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

      res.json(result);
    } catch (e) {
      errorHandling(e, res, next);
    }
  } else {
    res.send(400);
  }
});

module.exports = router;