const CLIENT_ID = 'b77a50cf0d2a3029972c';
const CLIENT_SECRET = 'f29284e62d8c8bdd0fba0b304b7c5c243eec0d88';
const HEADER_ACCEPT_GITHUB_V3 = 'application/vnd.github.v3+json';
const rp = require('request-promise');
const octopage = require('github-pagination');

const makeRequest = async function(method, uri, accessToken, body, queryString) {
  try {
    let url = uri;
    if (queryString) {
      url += `?${Object.entries(queryString).map(e => e.join('=')).join('&')}`;
    }
    const config = {
      method,
      uri: url,
      headers: {
        accept: HEADER_ACCEPT_GITHUB_V3,
        'User-Agent': 'microblog-app',
      },
      json: true,
      resolveWithFullResponse: true,
    }

    if (accessToken) {
      config.headers.authorization = `token ${accessToken}`;
    }

    if (method.toUpperCase() !== 'GET') {
      config.body = body;
    }

    const response = await rp(config);
    return response;
  } catch (e) {
    throw e;
  }
}

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
      throw e;
    }
}

const getAllGists = async function(accessToken, page) {
  try {
    const response = await makeRequest(
      'GET',
      'https://api.github.com/gists',
      accessToken,
      null,
      {
        page,
      }
    );
    let pages = octopage.parser(response.headers.link);
    if (!pages.hasOwnProperty('last')) {
      pages.last = page;
    }

    return {
      response: response.body,
      pages
    }
  } catch (e) {
    throw e;
  }
}

const getGist = async function(uri) {
  try {
    const response = await rp({
      method: 'GET',
      uri,
    })
    return response;
  } catch (e) {
    throw e;
  }
}

const createGist = async function(description, content, accessToken) {
  try {
    const body = {
      description,
      public: false,
      files: {
        [`${description.split(' ').join('_')}.txt`]: {
          content
        }
      }
    };

    const response = await makeRequest(
      'POST',
      'https://api.github.com/gists',
      accessToken,
      body,
    );
    return response.body;
  } catch (e) {
    throw e;
  }
}

const getComments = async function(uri) {
  try {
    const response = await makeRequest('GET', uri);

    return response.body;
  } catch (e) {
    throw e;
  }
}

const createComment = async function(gistID, content, accessToken) {
  try {
    const body = {
      body: content,
    };

    const response = await makeRequest(
      'POST',
      `https://api.github.com/gists/${gistID}/comments`,
      accessToken,
      body,
    )
    
    return response.body;
  } catch (e) {
    throw e;
  }
}

module.exports = {
  getAccessToken,
  getAllGists,
  getGist,
  createGist,
  getComments,
  createComment,
}
