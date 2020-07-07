const { User } = require('../models')
const { checkPassword } = require('../helper/bcrypt')
const { JwtSign , Jwtdecode } = require('../helper/jwt')
const Jwt = require('jsonwebtoken')

class MainController {
    static login(req, res, next) {
        let loginData = {
            email : req.body.email,
            password : req.body.password
        }
        if(!loginData.email || !loginData.password){
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
                    message: "Login data found",
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
        User.create(newOne, {returning : true})
        .then( data  => {
            return res.status(201).json(data)
        })
        .catch( err => {
            next(err)
        })
    }

}

module.exports = MainController