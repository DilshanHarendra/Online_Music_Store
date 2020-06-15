const express = require('express');
const core =require('cors');
const mongoose = require('mongoose')
require('dotenv').config();
const  app = express();
app.use(core());

mongoose.connect(process.env.DB_URL,{useNewUrlParser:true});
const mydb= mongoose.connection;
mydb.on('error',err=>console.log(err));
mydb.once('open',()=>console.log("Db Connected"));


app.get('/',(req,res)=>{
    res.send("hellow world");
});

app.listen(process.env.PORT||4000,console.log("server Run"));