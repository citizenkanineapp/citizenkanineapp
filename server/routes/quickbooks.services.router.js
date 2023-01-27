const express = require('express');
const axios = require('axios');
const pool = require('../modules/pool');
const tools = require('../modules/tools')
// const cors = require('cors');
const config = require('../../config.json');
const request = require('request');
const router = express.Router();

router.get('/', async (req, res) => {
  console.log('in server fetch services')
  const dbServices = await pool.query(`SELECT * FROM services`);
  // console.log('DB services: ', dbServices.rows);

  const token = tools.getToken(req.session)
  // console.log(token.accessToken)
  // console.log(tools.basicAuth)

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
        // console.log(response.statusCode)
        return res.json({ error: err, statusCode: response.statusCode })
      } else {
    
        let services = JSON.parse(response.body).QueryResponse.Item;        
        //filters parent item 'Group Dog Walking" from services array
        services = services.filter(service => service.ParentRef);
        let qbServices = [];

        //for some reason, can't directly filter out service.ParentRef.name/service.ParentRef.value
        for (let i of services) {
          if (i.ParentRef.name === 'Group Dog Walking') {
            qbServices.push(i);
          }
        }
        // console.log(qbServices)


        postServices(qbServices, dbServices.rows);
        
        res.sendStatus(201);
      }   
    }, function (err) {
      console.log(err)
      return res.json(err)
    })
  })
}) 

async function postServices(qbServices, dbServices) {
  const client = await pool.connect();
  // console.log(qbServices);

      let existingServiceIds = new Set(dbServices.map(({qb_id}) => qb_id));
      let existingServices = qbServices.filter( service => existingServiceIds.has(Number(service.Id)));
      let uniqueServices = qbServices.filter( service => !existingServiceIds.has(Number(service.Id)))
      console.log(existingServiceIds, existingServices.length, uniqueServices.length);

      // this adds a service_id, and hard-codes a value based on actual service provided.
      // another option would be to hard-code servcie name into database, and re-name QB services to fit.
      // This is awkward and may break if additional services are added, going through with it at this point.
      for (let service of uniqueServices) {
        switch (service.FullyQualifiedName){
          case 'Group Dog Walking:3 dogs':
            service.service_id = 8;
            break;
          case 'Group Dog Walk:1'

        }
      }

      const updateExistingServicesQuery = `
        UPDATE services
          SET
            name = $1,
            price = $2
          WHERE
            qb_id = $3;
      `;

      const insertUniqueServicesQuery = `
      INSERT INTO services
          ("qb_id", "name", "price")
        VALUES
          ($1, $2, $3);    
      `;

      // await Promise.all(uniqueServices.map(service => {
      //   const values = [service.Id, service.FullyQualifiedName, service.UnitPrice];
      //   client.query(insertUniqueServicesQuery, values);
      // }))

      // await Promise.all(existingServices.map(service => {
      //   const values = [service.FullyQualifiedName, service.UnitPrice, service.Id];
      //   client.query(updateExistingServicesQuery, values);
      // }))

}


module.exports = router;
