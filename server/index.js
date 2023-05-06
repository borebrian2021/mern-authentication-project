const express = require('express')
const app = express()
const cors = require('cors')
const mangoose = require('mongoose')
const User = require('./models/user.models')
const jwt = require("jsonwebtoken")
const crypto = require('crypto');
const nodemailer = require('nodemailer');

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
        return res.json({ status: "error", message: "Error occured while loging in" })

    }

})



//RESET PASSWORD
app.post('/api/send-reset-code', async (req, res) => {
    console.log(req.body)
    const user = await User.findOne({ email: req.body.email });
    if (!user) {

        return res.json({ status: 'error', message: "Email does not exist!" })
    }
    else {

        const resetCode =Math.floor(100000 + Math.random() * 900000);
        user.code = resetCode;
        user.reset = true;
        await user.save();

        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'briankoskei2023@gmail.com',
                pass: 'gqndbmumklhwzyza'
            }
        });

        const mailOptions = {
            from: 'briankoskei2023@gmail.com',
            to: user.email,
            subject: 'Password Reset Code',
            text: `Your password reset code is: ${resetCode}`
        };

        transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
                console.log(error);
            } else  {
                console.log('Email sent: ' + info.response);
        return res.json({ status: 'ok', message: "Email sent successfully!" })

            }
        });
    }

   


})

//VERIFY CODE 
app.post('/api/verify-reset-code', async (req, res) => {


    const user = await User.findOne({ email: req.body.email, code: req.body.code });
    if (user) {
        // user.password = req.password;
        // user.reset = false;
        // await user.save();
        return res.json({ status: 'ok', message: "Code verification success!" })

    } else {
        return res.json({ status: 'error', message: "Code verification fail!" })

    }
})

//RESET PASSWORD
app.post('/api/change-password', async (req, res) => {


    const user = await User.findOne({ email: req.body.email, code: req.body.code });
    if (user) {
        user.password = req.password;
        user.reset = false;
        user.code='000000'
        await user.save();
        return res.json({ status:'ok', message: "Password reset success!" })

    } else {
        return res.json({ status: 'error', message: "Password reset  fail!" })

    }
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


