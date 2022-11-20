const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const { cloudinary } = require('../modules/cloudinary.js');


/**
 * This uploads an image to cloudinary
 */
router.post('/', async (req, res) => {
    //    console.log(req.body)
    try {
        const fileStr = req.body.new_image_url;
        // need to either configure upload_preset
        //or remove.  Does not seem to be doing anything
        const uploadResponse = await cloudinary.uploader.upload(fileStr, {
            upload_preset: 'dog_photos',
            folder: 'dog_photos',
        });
        console.log('url for photo:', uploadResponse.url);
        const addParams = '/upload/c_fit,h_650,w_650/';

        const firstChunk = uploadResponse.url.split("upload/");
        const updatedURL = firstChunk[0] + addParams + firstChunk[1];
        // image='https://res.cloudinary.com/dot06ib2h/image/upload/c_fill,h_200,w_200/v1668885929/dog_photos/isxcraxctg2s1be1qn0b.jpg' />

        console.log('FIRST CHUNK IS:', updatedURL);
        res.send(uploadResponse.url);
        //I think no post to database is needed.  Will 
        //post to database with dog registration
    } catch (error) {
        console.log(error)
        res.sendStatus(500);
    }
})

module.exports = router;
