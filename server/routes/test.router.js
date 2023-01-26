const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const axios = require('axios');
const OAuthClient = require('intuit-oauth');
require('dotenv').config();


//where should this go?

const oauthClient = new OAuthClient({
    clientId: process.env.clientId,
    clientSecret: process.env.clientSecret,
    environment: 'sandbox',
    redirectUri: 'http://localhost:5000/api/test/callback',
  });

/**
 * GET route template
 */

 router.get('/trigger', async (req, res) => {
  console.log('trigger');
   try{
    const connectHandler = await axios.get('http://localhost:5000/api/test')
    console.log('anything happen here?', connectHandler)
    res.sendStatus(200)
   }catch(error){
    console.log('error in get request in trigger', error)
   }
        // .then((res)=>{
        //     // console.log('res', res);
        // })
        // .catch((err)=>{
        //     console.log('err!', err);
        // })
 })



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
