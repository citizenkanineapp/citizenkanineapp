const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const OAuthClient = require('intuit-oauth');
require('dotenv').config();


//where should this go?

const oauthClient = new OAuthClient({
    clientId: process.env.clientId,
    clientSecret: process.env.clientSecret,
    environment: 'sandbox' || 'production',
    redirectUri: 'http://localhost:5000/api/test/callback',
  });

/**
 * GET route template
 */
router.get('/', (req, res) => {
    console.log('arrive in get route?', oauthClient)
    const authUri = oauthClient.authorizeUri({
        scope: [OAuthClient.scopes.Accounting],
        state: 'testState',
      });
      res.redirect(authUri)
});

/**
 * POST route template
 */
router.post('/', (req, res) => {
  // POST route code here
});

module.exports = router;
