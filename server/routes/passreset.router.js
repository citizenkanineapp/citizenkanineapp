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
    // const queryTextEmail = `
    //     SELECT EXISTS
    //         (SELECT "email" FROM "user" WHERE "email"=$1);
    //     `;
    // if (!email) {
    //     console.log('no email');
    //     res.sendStatus(500); //format error client side!
    // } else {

    // //checks if email exists in database
    // const email_isTrue = await pool.query(queryTextEmail,[email])

    // //if e-mail exists
    // if(email_isTrue.rows[0].exists) {
        // console.log(email_isTrue.rows[0].exists);

        //generates password reset token
        const token = crypto.randomBytes(20).toString('hex');
        console.log('token: ',token);
        //get user id above
        const resetExpires = Date.now()+6000;
        console.log(resetExpires);
        const queryTextToken = `
            UPDATE "user" 
              SET
                "password_reset_token" = $1
              WHERE "id" = '1';
        `;

        pool.query(queryTextToken,[token])
            .then(()=> res.sendStatus(201))
            .catch((err)=> {
            console.log('token update failed. ', err);
            res.sendStatus(500);
            })
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'citizenkanineapp@gmail.com',
                pass: 'duuydbxfeolgddcn'
            }
        });

        const mailOptions = {
            from: 'citizenkanineapp@gmail.com', //sender
            to: `${email}`,
            subject: 'password reset',
            text:
                `You are receiving this because you (or someone else) have request a password reset from your account. \n\n` +
                `Please click on the following link, or paste this into your browser to complete these process: \n\n` +
                `LINK\n`,
        }

        transporter.sendMail(mailOptions, (err, emailres) => {
            if (err) {
                console.log(err);
            } else {
                console.log('email send?', emailres)
                res.sendStatus(200);
            }
        });

    // } else {
    //     console.log(email_isTrue.rows[0].exists);
    //     res.sendStatus(500); //formate error client side!
    // }

    res.sendStatus(200);
    // }
  });
  
  module.exports = router