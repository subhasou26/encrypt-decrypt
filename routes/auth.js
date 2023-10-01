const express=require("express");
const encrypt = require('mongoose-encryption');
const router=express.Router();
const controls=require('../controller/control');
const user=require('../module/registerModule');
const userOne=user.Students;
router.get("/info",controls.info);

router.get("/college",controls.college);

router.get("/work",controls.work);

 router.get("/getalldata", controls.alldata);

router.post('/register',controls.register);



module.exports=router;