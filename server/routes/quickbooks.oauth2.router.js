const express = require('express');
const pool = require('../modules/pool');
const tools = require('../modules/tools');
const config = require('../modules/config');

const router = express.Router();

router.get('/connect_handler', (req, res) => {
    // GET route code here
    console.log('in api/oauth2/connect_handler');
    console.log(req.session.data)
    // console.log(req)
  
    // Set  Accounting scopes
    tools.setScopes('connect_handler')

    // // Constructs the authorization URI.
    var uri = tools.intuitAuth.code.getUri({
        // Add CSRF protection
        state: tools.generateAntiForgery(req.session)
    })
    // Redirect
    console.log('Redirecting to authorization uri: ' + uri)
    // console.log('does it have header', res)
    res.redirect(uri);
  });

  router.get('/callback', function (req, res) {
    console.log('in /api/quickbooks/callback');
    console.log('do we get req.session.realmId', req.session)
    // Verify anti-forgery
    if(!tools.verifyAntiForgery(req.session, req.query.state)) {
        return res.sendStatus('Error - invalid anti-forgery CSRF response!')
    }

    // Exchange auth code for access token
    tools.intuitAuth.code.getToken(req.originalUrl).then(async function (token) {
      
    tools.saveToken(req.session, token)

    console.log('token', token.data);
    
    req.session.realmId = req.query.realmId;

    res.redirect(config.redirectClientUri + '#/clients')
    })
})

module.exports = router;
