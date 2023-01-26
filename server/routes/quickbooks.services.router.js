const express = require('express');
const axios = require('axios');
const pool = require('../modules/pool');
const tools = require('../modules/tools')
// const cors = require('cors');
const config = require('../../config.json');
const request = require('request');
const router = express.Router();

router.get('/', (req, res) => {
  console.log('in server fetch services')
  const token = tools.getToken(req.session)
  // console.log(token.accessToken)
  // console.log(tools.basicAuth)

  const query = encodeURI('/query?query= select * from item');
  const url = config.api_uri + req.session.realmId + query
  console.log('Making API Customer call to: ' + url)
  
  // tools.refreshTokensWithToken(token.refreshToken)

  const requestObj = {
    url: url,
    headers: {
      'Authorization': 'Bearer ' + token.accessToken,
      'Accept': 'application/json'
    }
  }

  request(requestObj, function (err, response) { 

    // checks current access token. If access token is expired, it renews access token with stored refresh token.
    // we need to test this at least 36 hours after refresh changes.

    tools.checkForUnauthorized(req, requestObj, err, response).then(async function ({ err, response }) {
        // status code 401 corrosponds to unauthorized request.
        // in future testing. 'invalid_grant' also occurs;; err.body.error ;; when should we specify?
      if (response.statusCode === 401 ) {
        // FOR TESTING
        // console.log("response bad auth", response)
        // console.log(err.body)
        // If unauthorized, send this command back to client. if fetchQbCustomers in quickbooks.saga.js recieves command, client redirects to /connect_to_qb route.
        res.send('connectToQB')

        // don't know if this second else-if block is necessary, ie, covering non-401 errors.
      } else if (err || response.statusCode != 200) {
        // console.log(response.statusCode)
        return res.json({ error: err, statusCode: response.statusCode })
      } else {
        // const items = JSON.parse(response.body).QueryResponse.Item;
        // for(let item of items){
        // console.log(item)
        // }
        // we could organize this into to different modules based on the request type; ie, req.body? there will be multiple API calls?git ci
        console.log("response with fresh auth", response)
        let services = JSON.parse(response.body);
        services = services.QueryResponse.Item;
        console.log(services);
        // this function starts the process of formatting the customers
        // let filteredCustomers =  filterCustomers(customers)
        // console.log('second log', tools.getToken(req.session))


        /*  this sucessfully sent back the customers after being processed
        do we need to worry about timing issues long term?  */
        // res.send(filteredCustomers)
        res.sendStatus(201);
      }   
    }, function (err) {
      console.log(err)
      return res.json(err)
    })
  })
}) 

module.exports = router;
