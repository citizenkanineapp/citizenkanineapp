// module imports

const express = require('express');
const tools = require('../modules/tools');
const config = require('../modules/config');
const request = require('request');
const router = express.Router();

// api endpoint https://this_app/api/qbInvoice/

router.post('/', async (req, res) => {
  // console.log('in server post invoice',req.body);

  // tools module creates OAUTH token object
  // from client's session data sent to this endpoint as part of HTTP request;

  const token = tools.getToken(req.session);
  
  if (token) {

    // generates query URL
    const query = '/invoice?';
    const url = config.api_uri + req.session.realmId + query ;
    console.log('Making API INVOICE call to: ' + url);

    // creates invoice objects
    const invoicesList = createInvoiceItems(req.body);
    // console.log(invoicesList);
    // invoicesList.map(invoice => console.log(invoice.Line))

    // batch-sends invoice objects to quickbooks
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

      // This function is an implementation of the Quickbooks OAuth2.0 SDK/toolkit
      request(requestObj, function (err, response) {   
        // checks current access token. If access token is expired, it renews access token using the stored refresh token.
        tools.checkForUnauthorized(req, requestObj, err, response).then(function ({ err, response }) {
            // status code 401 corrosponds to unauthorized request.
            // in future testing. 'invalid_grant' also occurs;; err.body.error ;; when should we specify?
          if (response.statusCode === 401 ) {
            // If unauthorized, send this response back to client.
            //if fetchQbCustomers() in quickbooks.saga.js recieves this response,
            //client redirects to this app server's /connect_to_qb endpoint.
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

// creating array of invoice objects
function createInvoiceItems(invoiceItems) {

  // creates set of unique client IDs and empty array object
  const clients = new Set(invoiceItems.map(({qb_id}) => qb_id));
  const invoicesList = [];
  // console.log('clients qbID: ', clients);

  //For each unique client in clients set, creates single invoice object.
  //invoice objects formatted to Quickbooks Online API
  clients.forEach((client)=>{
    // console.log(client)
    // One invoice object per client
    const invoice = {};

    // Force-allows online payments in Quickbooks billing; see quickbooks API reference
    invoice.AllowOnlineACHPayment=true;
    invoice.CustomerRef = {
      "value": client
    }
    invoice.Line = [];
    invoicesList.push(invoice);

    // loops through invoiceItems; if invoice item matches current client id,
    // pushes new line item to invoice.Line array
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
        });
        invoice.BillEmail = {
          "Address": item.email
        }
      }
    }
    // console.log('new invoice', invoice)
  })
  return invoicesList;
}

module.exports = router;
