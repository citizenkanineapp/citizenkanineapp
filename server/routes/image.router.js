//Note from Sam: this may become 
//part of a different router.  This is for 
//testing

const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const {cloudinary } = require('../modules/cloudinary.js');

//maybe don't need this here AND server
// router.use(express.json({limit: '50mb'}));
// router.use(express.urlencoded({limit: '50mb', extended: true}))

/**
 * GET route template
 */
router.get('/', (req, res) => {
  // GET route code here
});

/**
 * This uploads an image to cloudinary
 */
 router.post('/', async (req, res) => {
//    console.log(req.body)
    try{
        const fileStr = req.body.new_image_url;
        // console.log(fileStr);
        const uploadResponse = await cloudinary.uploader.upload(fileStr, {
            upload_preset: 'citizen_kanine',
        });
        console.log(uploadResponse);
        res.send(uploadResponse.url);
        // const queryTxt = `
        //     INSERT INTO image ("image_url")
        //     VALUES
        //     ($1);
        // `
        // const queryValues= [uploadResponse.url]
        // pool.query(queryTxt, queryValues)
    } catch (error){
        console.log(error)
        res.sendStatus(500);
    }
})

module.exports = router;
