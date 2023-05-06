const express = require('express')
const app = express()
const cors = require('cors')
const mangoose = require('mongoose')
const User = require('./models/user.models')
const jwt = require("jsonwebtoken")
const crypto = require('crypto');
//CONFIGURE CORS
app.use(cors())
app.use(express.json())



//CONNECT TO DB
mangoose.connect('mongodb://localhost:27017/mern-auth')


//LOGIN USER ENDPOINT
app.post('/api/login', async (req, res) => {
    try {
        const user = await User.findOne({
            email: req.body.email,
            password: req.body.password,
        })
        console.log(user)
        if (user) {
            const token = jwt.sign({
                name: user.fullNames,
                email: user.email,
                role: user.role
            },
                'mern-assesement2023'
            )
            return res.json({ status: "ok", user: token, login: true })
        }
        else {
            return res.json({ status: 'error', user: false, login: false })
        }
    }
    catch (err) {
        return res.json({ status: err })

    }

})



//RESET PASSWORD
app.post('/api/reset', async (req, res) => {



})


//REGISTER USER ENDPOINT
app.post('/api/register', async (req, res) => {

    try {
        await User.create({
            fullNames: req.body.fullNames,
            email: req.body.email,
            role: req.body.role,
            phoneNumber: req.body.phoneNumber,
            gender: req.body.gender,
            profileUrl: req.body.profileLink,
            password: req.body.confirmPassword

        })
        res.json({ status: "OK", error: "Data inserted successfully!" })

    }
    catch (err) {
        console.log(err)
        res.json({ status: req.body })
    }

})
app.listen(1337, () => {
    console.log('listening on 1337')
})


