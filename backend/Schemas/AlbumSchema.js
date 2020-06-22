const mongoose = require('mongoose');

const AlbumSchema = new mongoose.Schema({
    albumName:{
        type:String,
        required:true
    },
    artistName:{
        type:String,
        required: true
    },
    albumCategory:{
        type:String,
    },
    year:{
        type:String,

    },
    otherDetails:{
        type:String,

    },
    coverImage:{
        type:String,
        required:true

    },



});
module.exports= mongoose.model("Album",AlbumSchema,"album");
