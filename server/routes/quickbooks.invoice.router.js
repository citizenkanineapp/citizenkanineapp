const express = require('express');
const axios = require('axios');
const pool = require('../modules/pool');
const tools = require('../modules/tools');
const config = require('../modules/config');
// const cors = require('cors');
const request = require('request');
const router = express.Router();

router.post('/', async (req, res) => {
  // console.log('in server post invoice',req.body);
  const token = tools.getToken(req.session);
  
  if (token) {

    const query = '/invoice?';
    const url = config.api_uri + req.session.realmId + query ;
    console.log('Making API INVOICE call to: ' + url);

    const invoicesList = createInvoiceItems(req.body);
    // console.log(invoicesList);
    // invoicesList.map(invoice => console.log(invoice.Line))  
    await Promise.all(invoicesList.map(invoice => {
      const requestObj = {
        method: 'POST',
        url: url,
        headers: {
          'Authorization': 'Bearer ' + token.accessToken,
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        json: invoice
      }
      request(requestObj, function (err, response) {   
        // checks current access token. If access token is expired, it renews access token with stored refresh token.
        tools.checkForUnauthorized(req, requestObj, err, response).then(function ({ err, response }) {
            // status code 401 corrosponds to unauthorized request.
            // in future testing. 'invalid_grant' also occurs;; err.body.error ;; when should we specify?
          if (response.statusCode === 401 ) {
            // If unauthorized, send this command back to client. if fetchQbCustomers in quickbooks.saga.js recieves command, client redirects to /connect_to_qb route.
            res.send('connectToQB')
    
            // don't know if this second else-if block is necessary, ie, covering non-401 errors.
          } else if (err || response.statusCode != 200) {
            console.log('ERROR!', err, response.body, response.body.Fault.Error)

            //turned off since we don't have handling for it on client side
            //res.sendStatus(403)
          } else {
            console.log('invoice created')
            //doesn't work
          }
        }, function (err) {
          console.log('error in invoice request')
          // return res.json(err)
        })
      })
    }))
    res.sendStatus(201);

  } else {
    console.log('null token', token);
    res.send('connectToQb');
  }
})

function createInvoiceItems(invoiceItems) {
  const clients = new Set(invoiceItems.map(({qb_id}) => qb_id));
  // console.log(clients);
  const invoicesList = [];
  clients.forEach((client)=>{
    const invoice = {};
    invoice.AllowOnlineACHPayment=true;
    invoice.CustomerRef = {
      "value": client
    }
    invoice.Line = [];
    invoicesList.push(invoice);

    for (let item of invoiceItems) {
      if(item.qb_id === client) {
        invoice.Line.push({
          "Description": item.description,
          "Amount":item.service.price * item.dates.length,
          "DetailType":"SalesItemLineDetail",
          "SalesItemLineDetail": {
            "Qty": item.dates.length,
            "UnitPrice": item.service.price,
            "ItemRef": {
              "value": item.service.qb_id,
              "name": item.service.service
            }
          }      
        })
      }
    }
    // console.log('new invoice', invoice)
  })
  return invoicesList;
}

module.exports = router;
