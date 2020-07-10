const Jwt = require('jsonwebtoken')

function JwtSign(obj) {
    return Jwt.sign(obj, process.env.SECRET)
}

function Jwtdecode(token) {
    return Jwt.verify(token, process.env.SECRET)
}

module.exports = { JwtSign, Jwtdecode }