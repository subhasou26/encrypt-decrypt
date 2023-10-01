require('dotenv').config
const { json } = require("express");
const { default: mongoose } = require("mongoose");
const encrypt = require('mongoose-encryption');
require('../db/connect');
const User=require('../module/registerModule');
const crypto=require("crypto");


exports.info=(req,res)=>{
    res.send({name:"Subhadip paul",
address:{villege:"Paikpari",city:"kolaghat",pin:721134},
phoneNo:8170004267})
};

exports.college=(req,res)=>{
    res.send({college:"IEM Kolkata"})
}

exports.work=(req,res)=>{
    res.send({data:"I am only student"})
}

// set encryption algorithem 


//private key must be 32 char


// random 16 digit initialization vector

const iv=crypto.randomBytes(16);


exports.register=(req,res)=>{

    const {name, email,dob,num}=req.body; // creating object

    if(!name|| !email||!dob||!num){
        return res.status(422).json({error:"Please fill all data"});
    }

    User.findOne({num:num}).then((UserExist)=>{
        if(UserExist){ // if allredy exist
            return res.status(422).json({error:"Number  allredy exsist"});
        }
        // in case of new user
        // encryption
         const cipher=crypto.createCipheriv(process.env.algorithm,process.env.pkey,iv);
         let cryptedData=cipher.update(email,"utf-8","hex");
         cryptedData+=cipher.final("hex");
         // convrt iv to string
         const basedata=Buffer.from(iv,'binary').toString('base64');

        const data=new User({name:name, email:cryptedData,dob:dob,num:num,iv:basedata});// if both key and value are same name so don't neet to write name:name etc
        
        data.save().then(()=>{
            res.status(201).json({massage:"Data save succefully"});

        }).catch((err)=>res.status(500).json({error:"Failed to register"}));
   
    }).catch(err=>{console.log(err);})
    
}

//  const alldata =async(req,res)=>{
//     res.status(200).json({msg:"I am a bad boy"})
//  }


  exports.alldata=async(req,res)=>{
    // const encrypted=req.params.encrypted;
    // const obj=await User.collection("students").findOne({
    //     email:encrypted
    // });
    // if(obj==null){
    //     res.status(401).send("Not found");
    //     return;
    // }
    const myData=await User.find({},{"email":1,"_id":0,"iv":1});
    
    
    const origionData=Buffer.from(myData[3].iv,'base64');
    const decipher=crypto.createDecipheriv(process.env.algorithm,process.env.pkey,origionData);
     let dcryptedData=decipher.update(myData[3].email,"hex",'utf-8');
     dcryptedData+=decipher.final('utf8');
     console.log(dcryptedData);
     res.status(200).json(dcryptedData);
    // res.send(dcryptedData);
 }
 //module.exports={alldata};