const { Jwtdecode } = require('../helper/jwt')
const { Todo } = require('../models')


const authentication = (req, res, next) => {
    const token = req.headers.access_token
    try {
        if (token) {
            try {
                const userData = Jwtdecode(token)
                req.userData = userData
                next()
            } 
            catch{
                const errMsg= {
                    name: "customErr",
                    message: "Wrong Access Key",
                    status : 401,
                }
                next(errMsg)
            }
        } else {
            throw {
                name: "customErr",
                message: "Please login first",
                status : 401,
            }
        }
    }
    catch(err){
        next(err)
    }
}

const authorization = (req, res, next) => {
    const todosId = req.params.id

    Todo.findByPk(todosId)
    .then( data => {
        if(data){
            if(data.UserId == req.userData.id) {
                console.log(req.userData)
                next();
            }else{
                throw { 
                    name: "customErr",
                    message: "Forbiden Access",
                    status: 404
                }
            }
        }else{
            throw { 
                name: "customErr",
                message: "Data not Found",
                status: 404
            }
        }
    })
    .catch( err => {
        next(err)
        // return res.status(500).json({ message: "Internal Server Error"})
    })
}

module.exports = { authentication , authorization }