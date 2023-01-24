const express = require('express');
const nodemailer = require('nodemailer');
const crypto = require('crypto');

// const {
//   rejectUnauthenticated,
// } = require('../modules/authentication-middleware');
// const encryptLib = require('../modules/encryption');

const pool = require('../modules/pool');
const userStrategy = require('../strategies/user.strategy');

const router = express.Router();

// sends password reset email
router.post('/', async (req, res) => {
    
    const email = req.body.email;
    console.log(email);
    // queries table if email exists
    const queryTextEmail = `
        SELECT "id", "email"
            FROM "user" WHERE "email"=$1
        `;
    if (!email) {
        console.log('no email');
        res.sendStatus(500); //format error client side!
        return;
    } else {

        // //checks if email exists in database
        const userData = await pool.query(queryTextEmail,[email])
        // console.log(userData.rows[0]);



        //if e-mail exists
        if(userData.rows[0]) {
            console.log(userData.rows[0].email);

            //generates password reset token
            const token = crypto.randomBytes(20).toString('hex');
            console.log('token: ',token);
            //get user id above
            const resetExpires = Date.now()+6000;
            console.log(Date.now() + ' ' + resetExpires);
            const queryTextToken = `
                UPDATE "user" 
                SET
                    "password_reset_token" = $1
                WHERE "id" = '${userData.rows[0].id}'
                RETURNING "password_reset_token";
            `;

            console.log(userData.rows[0].id)
            const resolve = await pool.query(queryTextToken,[token])
            const tokenParam = resolve.rows[0].password_reset_token;

            const transporter = nodemailer.createTransport({
                service: 'gmail',
                auth: {
                    user: 'citizenkanineapp@gmail.com',
                    pass: 'duuydbxfeolgddcn'
                }
            });

            const resetLink = `http://localhost:3000/#/resetpass/${userData.rows[0].id}&${tokenParam}`;

            const mailOptions = {
                from: 'citizenkanineapp@gmail.com', //sender
                to: `${email}`,
                subject: 'password reset',
                text:
                    `You are receiving this because you (or someone else) have request a password reset from your account. \n\n` +
                    `Please click on the following link, or paste this into your browser to complete these process: \n\n` +
                    `${resetLink}\n`,
            }

            transporter.sendMail(mailOptions, (err, emailres) => {
                if (err) {
                    console.log(err);
                } else {
                    console.log('email send?', emailres)
                    res.sendStatus(200);
                }
            });

    } else {
        console.log(userData.rows[0]);
        res.sendStatus(500);//formate error client side!
        return;
    }

    res.sendStatus(200);
    }
  });
  
  module.exports = router