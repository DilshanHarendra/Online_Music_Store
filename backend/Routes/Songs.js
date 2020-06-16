const express = require('express');
const router =express.Router();
const core =require('cors');
const fs = require('fs');
const fileUpload= require('express-fileupload');
const bodyParser = require('body-parser');
router.use(core());
router.use(fileUpload());
router.use(bodyParser());


router.get('/',(req,res)=>{
    res.send("hello");
});

router.post('/uploadsongs',(req,res)=>{
    console.log(req.files);
    res.send("hello");
});

module.exports= router;


