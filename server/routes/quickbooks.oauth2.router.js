const express = require('express');
const axios = require('axios');
const pool = require('../modules/pool');
const tools = require('../modules/tools')
const request = require('request');
const router = express.Router();

let config ;
if (process.env.PORT) {
  config = require('../../config.json')
} else {
  config = require('../../config.dev.json')
}

const {
  fixCors,
} = require('../modules/cors_middleware');

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
    console.log('does it have header', res)
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
    // Store token - this would be where tokens would need to be
    // persisted (in a SQL DB, for example).
    // const tokenQuery = `
    //   UPDATE oauth2_tokens
    //     SET
    //       access_token = $1,
    //       refresh_token = $2
    //     WHERE
    //       id = 1;
    // `;
    // pool.query(tokenQuery, [token.data.access_token, token.data.refresh_token])
    
    tools.saveToken(req.session, token)

    console.log('token', token.data);
    
      // this block of code stores returned tokens and expiration times in SQL db. unnecessary, as we are currently relying on browser storage of tokens. this will not pass must
      // ALSO, it might make sense to move this to storage but abandon the time field. we are refreshing automatically based on server responses.
    // try {
    //   const tokensQuery = `
    //     UPDATE "oauth2_tokens"
    //       SET
    //         access_token = $1,
    //         access_time = NOW() + INTERVAL '3600 seconds',
    //         refresh_token = $2,
    //         refresh_time = NOW() + INTERVAL '8726400 seconds'
    //       WHERE id = 1
    //       RETURNING access_time, refresh_time;
    //   `
    // const accessTime = await pool.query(tokensQuery,[token.accessToken, token.refreshToken]);
    // console.log(accessTime.rows);

    // } catch(err) {
 
    // }
    req.session.realmId = req.query.realmId;

    if(process.env.PORT) {
      res.redirect('https://citizen-kanine.herokuapp.com/#/clients');
    } else {
      res.redirect('http://localhost:3000/#/clients')
    }
    


    })
})

module.exports = router;
