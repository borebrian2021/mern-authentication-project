const express = require('express')
const app =express()
const cors =require('cors')
const mangoose =require('mongoose')
const User = require('./models/user.models')

//CONFIGURE CORS
app.use(cors())
app.use(express.json())



//CONNECT TO DB
mangoose.connect('mongodb://localhost:27017/mern-auth')


//REGISTER USER ENDPOINT
app.post('/api/register', async (req,res)=>{

try{
    await User.create({
        fullNames: req.body.fullNames,
        email: req.body.email,
        phoneNumber: req.body.phoneNumber,
        gender: req.body.gender,
        profileUrl: req.body.profileLink,
        password: req.body.confirmPassword
    
    })
res.json({status:"OK", error:"Data inserted successfully!"})

}
catch (err) {
console.log(err)
res.json({status:err, error:"Duplicate email address"})
}

})
app.listen(1337,()=>{
    console.log('listening on 1337')
})


