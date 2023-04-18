const { Users_schema } = require('../models');
require("dotenv").config()
const CryptoJS = require('crypto-js');
const jwt = require('jsonwebtoken')
const nodemailer = require("nodemailer")
const { checkAdmin } = require('../function/checkAdmin');
const { generateAccessToken } = require('../function/generateAccessToken');
const SECRET = process.env.SECRET
const PASS = process.env.PASS

function send_mail(mail,token){
    const transporter = nodemailer.createTransport({
        service: "Gmail",
        auth: {
            user: "vshadyan070@gmail.com",
            pass: PASS
        },tls:{
            rejectUnauthorized:false
          }
    })
    
    const mailOptions = {
        from: "vshadyan070@gmail.com",
        to: mail,
        subject: "Sending Email using Node.js",
        text: `sexmel http://localhost:3000/verified/${token}`
    }
    
    transporter.sendMail(mailOptions, function(error, info){
        if(error){
            console.log(error)
        } else{
            console.log(`Email sent: ` + info.response)
        }
    })
  }

exports.verified = async (req, res) => {
    try {
        const token = req.params.token
        const decoded = jwt.verify(token, SECRET)
        const { is_Verified } = req.body;
        await Users_schema.update({ is_Verified: 1}, { where: { email: decoded.email } })
        res.status(200).json({ message: "Verified" })
    }
    catch (err) {
        res.status(500).json({ error: err.message })
    }
}

exports.register = async (req, res) => {
    const {role, email, userName, firstName, lastName, password } = req.body
    const emailRegex = /^(?=.*[a-zA-Z])(?=.*[0-9])[^\s@]+@[^\s@]+\.[^\s@]{2,}$/
    if (!emailRegex.test(email)) {
        return res.status(400).json({ error: "Invalid email format" })
    }
    console.log(Users_schema)
   await Users_schema.findOne({ where: { email: email } })
    .then((user) => {
        if (user) {
            return res.status(400).json({ error: "Email already exists" })
        }
        const hashed_password = CryptoJS.SHA256(password).toString()
        Users_schema.create({
            role, userName, firstName, lastName, email,
            password: hashed_password, is_Verified:0
        })
            .then((data) => {
                let token = generateAccessToken(email, 0)
                send_mail(email, token)
                res.status(201).json(data)
            }).catch((err) => {
                res.status(500).json({ error: err.message })
            })
    })
}

exports.login = async (req, res) => {
    const { email, password } = req.body
    const hashed_password = CryptoJS.SHA256(password).toString()
   await Users_schema.findOne({ where: { email, password: hashed_password } })
        .then((data) => {
            let token = generateAccessToken(data.role)
            if (data.email === email && data.password === hashed_password) {
                res.send(JSON.stringify({ status: "Logged in", jwt: token }))
            } else {
                res.send(JSON.stringify({ status: "Wrong credentials" }));
            }
        })
}



exports.getAllUsers = (req, res) => {
   Users_schema.findAll()
        .then(products => res.json(products))
        .catch(err => res.status(500).send({ err: err.message }))
}
exports.getUsersById = (req, res) => {
    try {
        const id = req.params;
        const data =  Users_schema.findOne({where: {id},})
        res.status(201).json(data)
    } catch (e) {
        res.send('ERROR')
    }
}

exports.addproduct = async (req, res) => {
    try {
        if (checkAdmin(req, res)) {
            const { name, price, img, quantity, categoryId } = req.body
            const data = await Users_schema.create({ name, price, img, quantity, categoryId })
            res.status(201).json(data)
           
        } else {
            res.send(JSON.stringify({ status: "Denied Access" }));
        }
    }
    catch (e) {
        res.send('ERROR')
    }
}


exports.update = async(req, res) => {
    try{
        const id = req.params;
        const {role} = req.body
        const data = await Users_schema.update({role},{where: id})
        res.status(201).json(data)
    }
    catch(err){
        res.status(500).json({error: err.message})
    } 
  };

exports.deleteUser = async(req, res) => {
    try{
        const id = req.params;
        const data = await Users_schema.destroy({where: id})
        res.status(201).json(data)
    }
    catch(err){
        res.status(500).json({error: err.message})
    } 
  };

