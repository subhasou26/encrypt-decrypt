const dotenv=require("dotenv");
const encrypt = require('mongoose-encryption');
const express = require("express");
const app = express();
const mongoose = require("mongoose");
dotenv.config({path:'./config.env'});
require('./db/connect');


const PORT=process.env.PORT;

const User = require("./module/registerModule");

app.use(express.json());

app.use(require('./routes/auth')); // for router
app.listen(PORT, () => {
  console.log("Server started");
});
