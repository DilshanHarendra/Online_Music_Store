const express = require('express');

const router =express.Router();
const core =require('cors');
const fs = require('fs');
const fileUpload= require('express-fileupload');
const bodyParser = require('body-parser');
router.use(core());
router.use(fileUpload());
router.use(bodyParser());


const Songschema = require('../Schemas/SongsSchema');

router.get('/',(req,res)=>{
    res.send("hello");
});





//-------------------------------------------------------------- add new song ----------------------------------------------------------------

async function  uploadFilse(req,res,next){

    // upload files meddleware
    var mediaFiles=req.files;
    var data=await JSON.parse(req.body.data);
    var songs =data[1];

    //upload cover images to temp folder
    mediaFiles.coverImage.mv(`./Uploads/temp/coverImages/${data[0].coverImage}`, async err=>{
        if (err){
            console.log(err);
            res.status(500).send(err);
        }
    });

    // upload songs to temp folder
    for(var i=0;i<mediaFiles.songs.length;i++){
       mediaFiles.songs[i].mv(`./Uploads/temp/songs/${songs[i].songName}`,async err=>{
            if (err){
                console.log(err);
               res.status(500).send(err);
            }
       });
    }

  next();
}


function moveToServer(coverImage,Songs){
    //move files from temp to valid folder
    try{
        fs.rename(`./Uploads/temp/coverImages/${coverImage}`,`./Uploads/coverImages/${coverImage}`,err=>{
            if (err) console.log(err);
        });

        for(var i=0;i<Songs.length;i++){
            fs.rename(`./Uploads/temp/songs/${Songs[i].songName}`,`./Uploads/songs/${Songs[i].songName}`,async err=>{
                if (err){
                    console.log(err);
                    res.status(500).send(err);
                }
            });
        }
    }catch (e) {
        console.log(e)
    }

}

router.post('/addsongs',uploadFilse,async (req,res)=>{

    try {

        var data=await JSON.parse(req.body.data);
        var album=data[0];
        var songs =data[1];

        // save songs
        await  Songschema.collection.insertMany(songs,(err,song)=>{
            if (err){
                console.log(err)
                res.status(500).send("error"+err);
            }else{
                var coverName=album.coverImage;
                moveToServer(coverName,songs);
                res.status(200).send("success");
            }
        });


    }catch (e) {
        console.log(e)
        res.status(500).send(e);
    }

});

//---------------------------------get Methodes------------------------------------------------------

router.get('/addsongs',async (req,res)=>{


    var data= await Songschema.find({}).skip(parseInt(req.query.skip)).limit(parseInt(req.query.limit));
    res.status(200).send(data);
});

router.get('/metadata',async (req,res)=>{

    try{
        await Songschema.count({},function (err,count) {
            if (err) res.sataus(500).send(err);
            res.send({count});
        })
    }catch (e) {
        console.log(e);
    }

});


module.exports= router;


