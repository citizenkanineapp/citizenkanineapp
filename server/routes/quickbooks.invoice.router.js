// module imports

const express = require("express");
const tools = require("../modules/tools");
const config = require("../modules/config");
const request = require("request");
const router = express.Router();

// api endpoint https://this_app/api/qbInvoice/

router.post("/", async (req, res) => {
    const token = tools.getToken(req.session);
  
    if (!token) {
      console.log("Null token received.");
      return res.send("connectToQb");
    }
  
    const url = `${config.api_uri}${req.session.realmId}/invoice?`;
    console.log(`Making API INVOICE call to: ${url}`);
  
    const invoicesList = createInvoiceItems(req.body);
  
    try {
      await Promise.all(
        invoicesList.map((invoice) => sendInvoiceRequest(url, token, invoice, req))
      );
      res.sendStatus(201);
    } catch (error) {
      console.error("Error creating invoices:", error);
      res.sendStatus(500);
    }
  });
  
  // Helper Function to Send Invoice Request
  function sendInvoiceRequest(url, token, invoice, req) {
    return new Promise((resolve, reject) => {
      const requestObj = {
        method: "POST",
        url: url,
        headers: {
          Authorization: `Bearer ${token.accessToken}`,
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        json: invoice,
      };
  
      request(requestObj, async (err, response) => {
        try {
          const { err: authErr, response: authResponse } = await tools.checkForUnauthorized(req, requestObj, err, response);
  
          if (authResponse.statusCode === 401) {
            console.warn("Unauthorized request: Connect to QB.");
            return res.send("connectToQB");
          }
  
          // if (authErr || authResponse.statusCode !== 200) {
          //   console.error("Invoice request error:", authErr, authResponse.body?.Fault?.Error);
          //   return reject(new Error("Failed to create invoice"));
          // }
  
          console.log("Invoice created:", JSON.stringify(authResponse.body, null, 2));
          resolve();
        } catch (error) {
          console.error("Error in invoice request handling:", error);
          reject(error);
        }
      });
    });
  }

// creating array of invoice objects
function createInvoiceItems(invoiceItems) {
  // console.log('are we here?', invoiceItems);

  // creates set of unique client IDs and empty array object
  const clients = new Set(invoiceItems.map(({ qb_id }) => qb_id));
  const invoicesList = [];
  // console.log('clients qbID: ', clients);

  //For each unique client in clients set, creates single invoice object.
  //invoice objects formatted to Quickbooks Online API
  clients.forEach((client) => {
    // console.log(client)
    // One invoice object per client
    const invoice = {};

    // Force-allows online payments in Quickbooks billing; see quickbooks API reference
    // This was a surprise issue that came up after the first month of production.
    // My client alerted me that some of *her* clients did not receive any online-payment options in their monthy
    // billing email. I had to reinvestigate the QB online API/invoice object to diagnose this problem and
    // then discover how to force this option to TRUE.

    invoice.AllowOnlineACHPayment = true;
    invoice.CustomerRef = {
      value: client,
    };

    // formats transaction number, which appears on invoice. Preferences.CustomTxnNumber must be TRUE.
    // invoice.DocNumber = `${client} - ${invoiceItems[0].month}${invoiceItems[0].year}`
    invoice.Line = [];
    invoicesList.push(invoice);

    // loops through invoiceItems; if invoice item matches current client id,
    // pushes new line item to invoice.Line array
    for (let item of invoiceItems) {
      if (item.qb_id === client) {
        invoice.Line.push({
          Description: item.description,
          Amount: item.service.price * item.dates.length,
          DetailType: "SalesItemLineDetail",
          SalesItemLineDetail: {
            Qty: item.dates.length,
            UnitPrice: item.service.price,
            ItemRef: {
              value: item.service.qb_id,
              name: item.service.service,
            },
          },
        });
        invoice.BillEmail = {
          Address: item.email,
        };
      }
    }
    // console.log('new invoice', invoice)
  });
  return invoicesList;
}

module.exports = router;
