
const mangoose =require('mangoose');


//DEFINE TABLE STRUCTURE
const User=new mangoose.Schema({
    fullName: {type: String,required: true},
    email: {type: String ,required: true},
    profileUrl:{type:String,required:true},
    phoneNumber: {type:String,required:true},
    gender: {type:String,required:true},
    password:{type:String,required:true}
})

const model = mangoose.model('UserData',User)

module.exports =model
