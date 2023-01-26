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
        // console.log("response with fresh auth", response)
        const services = JSON.parse(response.body).QueryResponse.Item;
        postServices(services);
        
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

async function postServices(services) {
  const client = await pool.connect();
  // console.log(services);
  //filters parent item 'Group Dog Walking" from services array
  const servicesFiltered = services.filter(service => service.ParentRef);
  const serviceQuery = `
  INSERT INTO services
      ("qb_id", "name", "price")
    VALUES
      ($1, $2, $3);    
  `;

  try{
    await Promise.all(servicesFiltered.map(service => {
      const serviceValues = [service.Id, service.FullyQualifiedName, service.UnitPrice];
      client.query(serviceQuery, serviceValues)
    }))
  } catch (error) {
    console.log('query error in postServices', error);
  }
  


  

}


module.exports = router;
