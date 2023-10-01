const mongoose=require("mongoose");
const encrypt = require('mongoose-encryption');


const DB =process.env.DATABASE;
mongoose.connect(DB).then(() => {
    console.log(`Connection Succfull`);
    

  }).catch((err) => console.log(`no connection`));

