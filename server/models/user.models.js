
const mongoose =require('mongoose');


//DEFINE TABLE STRUCTURE
const User=new mongoose.Schema({
    fullNames: {type: String,required: true},
    email: {type: String ,required: true,unique: true},
    profileUrl:{type:String,required:true},
    phoneNumber: {type:String,required:true},
    gender: {type:String,required:true},
    role: {type:String,required:true},
    password:{type:String,required:true}
},{
    collection:'user-data'
})

const model = mongoose.model('UserData',User)

module.exports =model
