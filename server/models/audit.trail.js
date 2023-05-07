
const mongoose =require('mongoose');


//DEFINE TABLE STRUCTURE
const AuditTrail=new mongoose.Schema({
    userID: {type: String,required: true},
    name: {type: String ,required: true},
    role: {type:String,required:true},
    action:{type:String,required:true},
    time:{type:String,required:true},
 
},{
    collection:'audit-trail'
})

const model = mongoose.model('AuditData',AuditTrail)

module.exports =model
