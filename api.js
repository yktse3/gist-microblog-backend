const CLIENT_ID = 'b77a50cf0d2a3029972c';
const CLIENT_SECRET = 'f29284e62d8c8bdd0fba0b304b7c5c243eec0d88';
const HEADER_ACCEPT_GITHUB_V3 = 'application/vnd.github.v3+json';
const rp = require('request-promise');

const getAccessToken = async function(code) {
    try {
      const response = await rp({
        method: 'POST',
        uri: 'https://github.com/login/oauth/access_token',
        body: {
          client_id: CLIENT_ID,
          client_secret: CLIENT_SECRET,
          code,
        },
        json: true,
      })

      return response;
    } catch (e) {
      next(e);
    }
}

module.exports = {
  getAccessToken,
}
