const express = require('express');
const pool = require('../modules/pool');
const tools = require('../modules/tools')
// const cors = require('cors');
const request = require('request');
const router = express.Router();
let config ;
if (process.env.PORT) {
  config = require('../../config.json')
} else {
  config = require('../../config.dev.json')
}
// const config = require('../../config.dev.json');

router.get('/', async (req, res) => {
  console.log('in server fetch services')
  const token = tools.getToken(req.session)
  // console.log(token.accessToken)
  // console.log(tools.basicAuth)
  if (token) {
    const query = encodeURI(`/query?query= select * from item where Active = true`);
    const url = config.api_uri + req.session.realmId + query
    console.log('Making API Customer call to: ' + url)
    
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
          
          // If unauthorized, send this command back to client. if fetchQbCustomers in quickbooks.saga.js recieves command, client redirects to /connect_to_qb route.
          res.send('connectToQB')

          // don't know if this second else-if block is necessary, ie, covering non-401 errors.
        } else if (err || response.statusCode != 200) {
          console.log('error in services request', response.statusCode)
          return res.json({ error: err, statusCode: response.statusCode })
        } else {
      
          let services = JSON.parse(response.body).QueryResponse.Item;        
          //filters parent item 'Group Dog Walking" from services array
          services = services.filter(service => service.ParentRef);
          let qbServices = [];

          //for some reason, can't directly filter out service.ParentRef.name/service.ParentRef.value
          for (let service of services) {
            if (service.ParentRef.name === 'Group Dog Walking') {
              qbServices.push(service);
            }
          }

          postServices(qbServices);
          
          res.sendStatus(201);
        }   
      }, function (err) {
        console.log('err in services request');
        return res.json(err)
      })
    })
    
  } else {
    console.log('null token');
    res.send('connectToQb');
  }
}) 

async function postServices(qbServices) {
  const client = await pool.connect();
  // console.log(qbServices);

      const servicesQuery = `
        UPDATE services
          SET
            qb_id = $1,
            price = $2
          WHERE
            name = $3;
      `;

      await Promise.all(qbServices.map(service => {
        const values = [service.Id, service.UnitPrice, service.FullyQualifiedName];
        client.query(servicesQuery, values);
      }))
}


module.exports = router;
