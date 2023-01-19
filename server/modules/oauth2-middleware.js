// const pool = require('../modules/pool');
// where can we drop this middleware?
const checkAuthTokens = async (req, res, next) => {
    try {
        tools.checkForUnauthorized(req, requestObj, err, response).then(async function ({ err, response }) {
            // status code 401 corrosponds to unauthorized request.
            // in future testing. 'invalid_grant' also occurs;; err.body.error ;; when should we specify?
          if (response.statusCode === 401 ) {
            // FOR TESTING
            // console.log(response.statusCode)
            // console.log(err.body)
            // If unauthorized, send this command back to client. if fetchQbCustomers in quickbooks.saga.js recieves command, client redirects to /connect_to_qb route.
            res.send('connectToQB')
    
            // don't know if this second else-if block is necessary, ie, covering non-401 errors.
          } else if (err || response.statusCode != 200) {
            return res.json({ error: err, statusCode: response.statusCode })
          } else {
    
            console.log(response)
          }
    }, (error)=> {
            console.log(error)
            return res.json(err)
        });
    } catch (err) {
        console.log('err', err);
    }
    next();
}

// const checkAuthTokens = async (req, res, next) => {
//     console.log('in da middle');
//     try {
//         const time = await pool.query(`
//             SELECT access_time, refresh_time FROM oauth2_tokens WHERE id = 1
//         `);
//         // console.log(time.rows[0],Date.get(),Date.prototype.getTime(Date.getUTCDate()));


//     } catch (err) {
//         console.log('err', err)
//     }

//     next();
//     // } else {
//     //   // failure best handled on the server. do redirect here.
//     //   res.sendStatus(403);
//     // }
//   };
  
module.exports = { checkAuthTokens };
  