const mongoose = require('mongoose');

const SongsSchema= new mongoose.Schema({
    songName:{
        type:String,
        required:true
    },

    addDate:{
        type:Date,
        required:true
    },
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
module.exports= mongoose.model('Songs',SongsSchema,'songs');
