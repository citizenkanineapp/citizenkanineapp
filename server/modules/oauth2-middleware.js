const pool = require('../modules/pool');

const checkAuthTokens = async (req, res, next) => {
    console.log('in da middle');
    try {
        const time = await pool.query(`
            SELECT access_time, refresh_time FROM oauth2_tokens WHERE id = 1
        `);
        // console.log(time.rows[0],Date.get(),Date.prototype.getTime(Date.getUTCDate()));


    } catch (err) {
        console.log('err', err)
    }

    next();
    // } else {
    //   // failure best handled on the server. do redirect here.
    //   res.sendStatus(403);
    // }
  };
  
module.exports = { checkAuthTokens };
  