const mongoose=require('mongoose');
const encrypt = require('mongoose-encryption');


const studentSchema=new mongoose.Schema({
   name:{type:String,required:true},
   email:{type:String,required:true},
   dob:{type:String,required:true},
   num:{type:Number,required:true},
   iv:{type:String,required:true}


});


const Student=mongoose.model('STUDENT',studentSchema);


module.exports=Student;