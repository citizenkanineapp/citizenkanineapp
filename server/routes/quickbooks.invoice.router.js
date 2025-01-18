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
      // await Promise.all(
      //   invoicesList.map((invoice) => sendInvoiceRequest(url, token, invoice, req))
      // );
      await processBatches(url, token, invoicesList, req)
      res.sendStatus(201);
    } catch (error) {
      console.error("Error creating invoices:", error);
      res.sendStatus(500);
    }
  });
  
  async function processBatches(url, token, invoicesList, req) {
    const batchSize = 30; // limit per QB guide
    for (let i = 0; i < invoicesList.length; i += batchSize) {
      const batch = invoicesList.slice(i, i + batchSize);
      console.log(`Processing batch ${i / batchSize + 1} of the ${Math.ceil(invoicesList.length / batchSize)}`);
      await sendBatchInvoices(batch, url, token, req);
      await new Promise(resolve => setTimeout(resolve, 2000));
    }
  }

  async function sendBatchInvoices(batch, url, token, req) {
    await Promise.all(
      batch.map(invoice => sendInvoiceRequest(url, token, invoice, req))
    );
  }

  // Helper Function to Send Invoice Request
  function sendInvoiceRequest(url, token, invoice, req, retryCount = 0) {
    const maxRetries = 5;
    const backoffTime = 1000 * Math.pow(2, retryCount);

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
        // try {
        //   const { err: authErr, response: authResponse } = await tools.checkForUnauthorized(req, requestObj, err, response);
  
        //   if (authResponse.statusCode === 401) {
        //     console.warn("Unauthorized request: Connect to QB.");
        //     return res.send("connectToQB");
        //   }
  
        //   if (authErr || authResponse.statusCode !== 200) {
        //     console.error("Invoice request error:", authErr, JSON.stringify(authResponse.body?.fault?.error));
        //     return reject(new Error("Failed to create invoice"));
        //   }
  
        //   // console.log("Invoice created:", JSON.stringify(authResponse.body, null, 2));
        //   console.log("Invoice created:", JSON.stringify(authResponse.body.Invoice.CustomerRef.name, null, 2));
        //   resolve();
        // } catch (error) {
        //   console.error("Error in invoice request handling:", error);
        //   reject(error);
        // }
        
        if (response?.statusCode === 429) {
          console.warn(`Throttle limit exceeded. Retrying in ${backoffTime}ms`)
          if (retryCount < maxRetries) {
            setTimeout(() => resolve(sendInvoiceRequest(url, token, invoice, req, retryCount + 1)), backoffTime);
          } else {
            reject(new Error("Max retries reached for invoice request."));
          }
          return;
        }
        
        if (err || response.statusCode !== 200) {
          console.error("Invoice request error:", err, response?.body);
          return reject(err || new Error("Failed to create valid invoice"));
        }

        console.log("Invoice created:", JSON.stringify(response.body.Invoice.CustomerRef.name, null, 2));
        resolve();
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
