const { User } = require('../models')
const { checkPassword } = require('../helper/bcrypt')
const { JwtSign , Jwtdecode } = require('../helper/jwt')
const Jwt = require('jsonwebtoken')
const {OAuth2Client} = require('google-auth-library')


class MainController {
    static login(req, res, next) {
        let loginData = {
            email : req.body.email,
            password : req.body.password
        }
        if(!loginData.email || !loginData.password || loginData.email == "" || loginData.password == ""){
            throw {
                name: "customErr",
                message: "Please Fill Email and Password",
                status : 404,
            }
        }
        User.findOne({
            where : {
                email : loginData.email
            }
        })
        .then(data => {
            if (!data) {
                throw {
                    name: "customErr",
                    message: "Login data not found",
                    status : 404,
                }
            } else if (checkPassword(loginData.password, data.password)){
                const token = JwtSign({
                    id : data.id,
                    email: data.email
                })
                return res.status(200).json(({
                    access_token : token
                }))
            } else {
                throw { 
                    name: "customErr",
                    message: "Login data not found",
                    status : 404,
                }
            }
        })
        .catch( err => {
            next(err)
        })
    }

    static register(req, res, next) {
        let newOne = {
            email : req.body.email,
            password : req.body.password
        }

        if(!newOne.email || !newOne.password || newOne.email == "" || newOne.password == ""){
            throw {
                name: "customErr",
                message: "Please Fill Email and Password",
                status : 404,
            }
        }

        User.create(newOne, {returning : true})
        .then( data  => {
            return res.status(201).json(data)
        })
        .catch( err => {
            next(err)
        })
    }


    static googleSignin (req, res, next) {
        console.log("masuklbro")
        const id_token = req.body.id_token
        const client = new OAuth2Client(process.env.CLIENT_ID)
        let payload = null;
        client.verifyIdToken({
            idToken: id_token,
            audience: process.env.CLIENT_ID
        })
        .then( ticket => {
            payload = ticket.getPayload();
            const userid = payload['sub']
            console.log(payload, ">>>> DATA DARI GOOGLE")
            return User.findOne({ where : { email : payload["email"]}})
        })
        .then( user => {
            if(user){
                return user;
            } else {
                let dataUser = {
                    email: payload['email'],
                    password: 'admin',
                }
                return User.create(dataUser)
            }
        })
        .then(data => {
            const access_token = JwtSign({
                id : data.id,
                email: data.email
            })

            return res.status(200).json({access_token})
        })
        .catch( err => {
            next(err)
        })
    }

    static viewAllUsers (req,res,next){
        User.findAll()
        .then(data => {
            console.log(data)
            return res.status(200).json(data)
        })
        .catch(err=>{
            const errMsg = {
                name: "customValidation",
                message: "Server Internal Error",
                status : 500,
            }
            next(errMsg)
        })
    }

}

module.exports = MainController