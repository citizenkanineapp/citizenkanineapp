const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const {cloudinary } = require('../modules/cloudinary.js');


/**
 * This uploads an image to cloudinary
 */
 router.post('/', async (req, res) => {
//    console.log(req.body)
    try{
        const fileStr = req.body.new_image_url;
        // need to either configure upload_preset
        //or remove.  Does not seem to be doing anything
        const uploadResponse = await cloudinary.uploader.upload(fileStr, {
            upload_preset: 'dog_photos',
            folder: 'dog_photos',
        });
        console.log('url for photo:', uploadResponse.url);
        res.send(uploadResponse.url);
        //I think no post to database is needed.  Will 
        //post to database with dog registration
    } catch (error){
        console.log(error)
        res.sendStatus(500);
    }
})

module.exports = router;
