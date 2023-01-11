const express = require('express');
const axios = require('axios');
const app = express();
const pool = require('../modules/pool');
const tools = require('../modules/tools')
// const cors = require('cors');

const router = express.Router();

// var corsOptions = {
//     origin: 'http://localhost:3000',
//     optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
//   }
// app.use(cors());

// router.post('/trigger', (req, res) => {
//   console.log('trigger');
//     axios.get('http://localhost:5000/api/quickbooks/connect_handler')
//         .then((res)=>{
//             console.log('res');
//         })
//         .catch((err)=>{
//             console.log('err!', err);
//         })
// })

router.get('/connect_handler', (req, res) => {
    // GET route code here
    console.log('in api/quickbooks/connect_handler');
    // console.log(corsOptions);
    // Set the OpenID + Accounting + Payment scopes
    tools.setScopes('connect_handler')

    //console.log(tools.intuitAuth);
    // // Constructs the authorization URI.
    var uri = tools.intuitAuth.code.getUri({
        // Add CSRF protection
        state: tools.generateAntiForgery(req.session)
    })
    // Redirect
    console.log('Redirecting to authorization uri: ' + uri)
    // TO SEE /callback console.logs, copy generated uri from terminal and paste in browser. once Qb log in is complete, a req is sent to teh /callback endpoint!

    // res.redirect('http://localhost:5000/api/callback');
    res.send(uri);
    // axios.get('http://localhost:5000/api/callback')
    //     .then(res=>{
    //         console.log(200)
    //     })
    //     .catch(err=>{
    //         console.log('err!')
    //     })
  });
  

module.exports = router;
