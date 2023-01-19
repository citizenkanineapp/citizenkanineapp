// const express = require('express');
// const axios = require('axios');
// const app = express();
// const pool = require('../modules/pool');
// const tools = require('../modules/tools')
// const cors = require('cors');

// const router = express.Router();

// router.get('/', function (req, res) {
//     console.log('in /api/callback')
//     console.log('do we get req.session.realmId', req.session)
//     // Verify anti-forgery
//     if(!tools.verifyAntiForgery(req.session, req.query.state)) {
//         return res.send('Error - invalid anti-forgery CSRF response!')
//     }


//     // Exchange auth code for access token
//     tools.intuitAuth.code.getToken(req.originalUrl).then(function (token) {
//     // Store token - this would be where tokens would need to be
//     // persisted (in a SQL DB, for example).
//     tools.saveToken(req.session, token)
//     req.session.realmId = req.query.realmId
//     console.log(req.session.realmId);

//     res.redirect('http://localhost:3000/#/about')


// //if we skip JWT token-----> next step is to get to "connected page"
        

    
//     // var errorFn = function(e) {
//     //     console.log('Invalid JWT token!')
//     //     console.log(e)
//     //     res.redirect('/')
//     // }

//         // if(token.data.id_token) {
//         //     try {
//         //     // We should decode and validate the ID token
//         //         jwt.validate(token.data.id_token, function() {
//         //     // Callback function - redirect to /connected
//         //         res.redirect('connected')
//         //     }, errorFn)
//         //     } catch (e) {
//         //     errorFn(e)
//         //     }
//         //     } else {
//         //     // Redirect to /connected
//         //     res.redirect('connected')
//         //     }
//         //     }, function (err) {
//         //     console.log(err)
//         //     res.send(err)
//         //     })   
//     })
// })

// module.exports = router