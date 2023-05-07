const express = require('express')
const app = express()
const cors = require('cors')
const mangoose = require('mongoose')
const User = require('./models/user.models')
const AudiTrail = require('./models/audit.trail')
const jwt = require("jsonwebtoken")
const crypto = require('crypto');
const nodemailer = require('nodemailer');
const now = new Date();

//CONFIGURE CORS
app.use(cors())
app.use(express.json())



//CONNECT TO DB
mangoose.connect('mongodb://localhost:27017/mern-auth')
// userID: {type: String,required: true},
// Name: {type: String ,required: true,unique: true},
// role: {type:String,required:true},
// action:{type:String,required:true},
// time:{type:String,required:true},
//AUDIT TRAIL

async function insertTrail(userID, name, role, action) {
    try {
        await AudiTrail.create({
            userID: userID,
            name: name,
            role: role,
            action: action,
            time: now.toLocaleString(),
        })


    }
    catch (err) {
        console.log(err)
        res.json({ status: req.body })
    }
}


//CHECK AUTH STATUS
app.get('/api/get-trail', async (req, res) => {

    const token = req.headers['x-access-token']

    try {
        const decode = jwt.verify(token, 'mern-assesement2023')
        if(decode.role==1){

            return res.json({ error: err, status: 'error', message: "Unauthorized" })
        }
        else{

        const auditTrail = await AudiTrail.find();
        return res.json({ status: 'ok', data:auditTrail, message: "Authenticated" })

        }

     
    }
    catch (err) {

        return res.json({ error: err, status: 'error', message: "Unauthorized" })

    }

})

//LOGIN USER ENDPOINT
app.post('/api/login', async (req, res) => {
    try {
        const expiresIn = 1800;
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
                'mern-assesement2023', { expiresIn }
            )

            //LETS RECORD USER ACTION TO AUDIT TRAIL
            insertTrail(user.id, user.name, user.role, "Login Succesfully!");

            return res.json({ status: "ok", user: token, login: true })
        }
        else {
            insertTrail(req.email, req.email, "Unknown", "Login failed! User not found")

            return res.json({ status: 'error', user: false, login: false })
        }
    }
    catch (err) {
        insertTrail(user.email, user.name, user.role, "Login failed! Reason:" + err)

    }

})



//RESET PASSWORD
app.post('/api/send-reset-code', async (req, res) => {
    console.log(req.body)
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
        insertTrail(req.body.email, req.body.email, "Unknown", "Reset failed! Email does not exist!")

        return res.json({ status: 'error', message: "Email does not exist!" })
    }
    else {

        const resetCode = Math.floor(100000 + Math.random() * 900000);
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
            } else {
                console.log('Email sent: ' + info.response);
                insertTrail(user.email, user.name, user.role, "Email verification code sent successfully!")

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
        insertTrail(user.id, user.name, user.role, "Password reset verification success!")

        return res.json({ status: 'ok', message: "Code verification success!" })

    } else {
        insertTrail(req.body.email, req.body.email, "Unknown", "Code verification failure")

        return res.json({ status: 'error', message: "Code verification fail!" })

    }
})

//RESET PASSWORD
app.post('/api/change-password', async (req, res) => {


    const user = await User.findOne({ email: req.body.email, code: req.body.code });
    if (user) {
        user.password = req.body.password;
        user.reset = false;
        user.code = '000000'
        await user.save();
        insertTrail(user.email, user.name, user.role, "Password reset success!")

        return res.json({ status: 'ok', message: "Password reset success!" })

    } else {
        insertTrail(req.body.email, req.body.email, "Unknown", "Password reset failure!")
        return res.json({ status: 'error', message: "Password reset  fail!" })

    }
})


//GET ALL USERS PASSWORD
app.get('/api/get-users', async (req, res) => {

    const token = req.headers['x-access-token']

    try {
        const decode = jwt.verify(token, 'mern-assesement2023')
        console.log(token)

        const users = await User.find();
        return res.json({ status: 'ok', admin: decode.role, data: users, username: decode.name, message: "Users retrieved successfully!" })
    }
    catch (err) {

        return res.json({ error: err, status: 'error', message: "Session expried please log in again!" })

    }

}
)
//CHECK AUTH STATUS
app.get('/api/check-status', async (req, res) => {

    const token = req.headers['x-access-token']



    try {
        const decode = jwt.verify(token, 'mern-assesement2023')
        console.log(token)

        const users = await User.find();
        return res.json({ status: 'ok', message: "Authenticated", isAdmin: users.role })
    }
    catch (err) {

        return res.json({ error: err, status: 'error', message: "Unauthenticated" })

    }

})




//UPDATE USER PASSWORD
app.post('/api/update-user', async (req, res) => {
    const user = await User.findOne({ email: req.body.email, code: req.body.code })
    if (user) {
        user.fullNames = req.body.fullNames;
        user.email = req.body.email;
        user.role = req.body.role;
        user.phoneNumber = req.body.phoneNumber;
        user.gender = req.body.gender;
        user.profileLink = req.body.profileLink;
        await user.save();
        insertTrail(user.email, user.name, user.role, "User Updated successfully!")

        return res.json({ status: 'ok', data: user, message: "User Updated successfully!" })

    } else {
        insertTrail(req.body.email, req.body.email, "Uknown", "User uodate failure!")
        return res.json({ status: 'error', message: "User uodate fail!" })

    }
})


//UPDATE USER DETAILS
app.get('/api/get-users', async (req, res) => {


    try {
        const users = await User.find();
        return res.json({ status: 'ok', data: users, message: "Users retrieved successfully!" })
    }
    catch (err) {

        return res.json({ status: 'error', message: "Failed to get users!" })

    }

})




//DELETE USER
app.delete('/api/delete-user/:id', async (req, res) => {
    const token = req.headers['x-access-token']
    const decode = jwt.verify(token, 'mern-assesement2023')
    try {
        await User.findOneAndDelete({ _id: req.params.id });

        insertTrail(decode.email, decode.name, decode.role, "Deleted user of ID:"+req.params.id)

        return res.json({ status: 'ok', message: "User deleted successfully!" })

    }
    catch (err) {
        insertTrail(decode.email, decode.name, decode.role, "Failed to deleted user of ID:"+req.params.id)

        return res.json({ status: 'error', message: "Failed to delete" })

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
        insertTrail(req.body.email, req.body.fullNames, req.body.role, "Account created successfully!")

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


