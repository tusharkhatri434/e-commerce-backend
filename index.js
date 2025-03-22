const express = require('express');
const mongoose = require('mongoose');

const connectDB = require('./src/utils/db');

const app = express();
const PORT = 8090;

connectDB();
app.use(express.json());
app.use(express.urlencoded({extended:true}));




app.listen(PORT,()=>{
    console.log(`Listening on ${PORT}`)
})