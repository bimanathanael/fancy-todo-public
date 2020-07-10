const bcrypt = require('bcrypt')
const saltRound = 8 

function hashPassword (password){
    const salt = bcrypt.genSaltSync(saltRound)
    const hash = bcrypt.hashSync(password, salt)
    return hash
}

function checkPassword (password, hashPassword){
    return bcrypt.compareSync(password, hashPassword)
}

module.exports = {
    hashPassword , 
    checkPassword 
}