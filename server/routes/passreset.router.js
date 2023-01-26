const express = require('express');
const nodemailer = require('nodemailer');
const crypto = require('crypto');
const { DateTime } = require("luxon");
require('dotenv').config();

const {
    rejectUnauthenticated,
  } = require('../modules/authentication-middleware');
  const encryptLib = require('../modules/encryption');

const pool = require('../modules/pool');
// const userStrategy = require('../strategies/user.strategy');

const router = express.Router();

// sends password reset email
router.post('/email_reset_link', async (req, res) => {
    
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
            //should there be another step to encrypt token in DB?


            console.log('token: ',token);
            //get user id above
            let resetExpires = DateTime.now().plus({minutes: 60}).toString();
            // console.log(DateTime.now().toString() + ' ' + resetExpires.toString());
            console.log(resetExpires, typeof resetExpires);
            const queryTextToken = `
                UPDATE "user" 
                    SET
                        "password_reset_token" = $1,
                        "password_reset_expires" = $2
                    WHERE "id" = $3
                    RETURNING "password_reset_token";
            `;

            console.log(userData.rows[0].id)
            const resolve = await pool.query(queryTextToken,[token, resetExpires.toString(), userData.rows[0].id])
            const tokenParam = resolve.rows[0].password_reset_token;

            const transporter = nodemailer.createTransport({
                service: 'gmail',
                //set to KEYS
                auth: {
                    user: process.env.resetEmail,
                    pass: process.env.emailKey
                }
            });

            const resetLink = `http://localhost:3000/#/resetpass/${userData.rows[0].id}/${tokenParam}`;

            const mailOptions = {
                from: process.env.resetEmail, //sender
                to: `${email}`,
                subject: 'password reset',
                text:
                    `You are receiving this because you (or someone else) have request a password reset from Citizen Kanine. \n\n` +
                    `Please click on the following link, or paste this into your browser to complete these process: \n\n` +
                    `${resetLink}\n\n` +
                    `This link expires in 60 minutes\n`,
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

  //PUT route for password reset. need user ID params.
router.put('/resetpass/:id', rejectUnauthenticated, (req, res) => {
    const userId = req.params.id;
    // console.log(req.params.id)
    const password = encryptLib.encryptPassword(req.body.password);
  
    const queryText = `UPDATE "user" 
      SET "password" = $1
      WHERE "id" = $2;`;
    pool
      .query(queryText, [password, userId])
      .then(()=> res.sendStatus(201))
      .catch((err)=> {
        console.log('Password reset failed. ', err);
        res.sendStatus(500);
      })
  })
  
  //PUT route for password reset from e-mail link. accepts user id and reset token in link URL.
  router.put('/resetpassfromlink', async (req, res) => {
    const { id, token } = req.body;
    const password = encryptLib.encryptPassword(req.body.password);
    // console.log('in resetpassfromlink: ', id, password, token);
    try {
      const validateTokenQuery = `
        SELECT password_reset_token, password_reset_expires
          FROM "user"
          WHERE id = $1
      `;
      const validations = await pool.query(validateTokenQuery, [id]);
      const password_reset_expires = DateTime.fromISO(validations.rows[0].password_reset_expires);
      const storedToken = validations.rows[0].password_reset_token;
    //   console.log(storedToken, token)
      if(
            password_reset_expires > DateTime.now() &&
            storedToken === token
        ) {
        // console.log('not expired, passwords match');
        updatePasswordQuery = `
            UPDATE "user"
                SET
                    "password" = $1,
                    "password_reset_token" = NULL,
                    "password_reset_expires" = NULL
                WHERE id= $2;
        `;

        await pool.query(updatePasswordQuery,[password, id])

      } else {
        console.log('expired');
        res.sendStatus(500)
        return;
      }
      res.sendStatus(201);
      } catch (error) {
      console.log(error)
      res.sendStatus(500);
    }
  })
  
  
  
  module.exports = router