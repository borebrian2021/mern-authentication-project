const express = require('express')
const app =express()
const cors =require('cors')



//CONFIGURE CORS
app.use(cors())


//REGISTER USER ENDPOINT
app.post('/api/register', (req,res)=>{
console.log(req.body)
res.json({status:"ok"})

})
app.listen(1337,()=>{
    console.log('listening on 1337')
})


