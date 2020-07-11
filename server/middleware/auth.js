const { Jwtdecode } = require('../helper/jwt')
const { Todo, Project, ProjectUser } = require('../models')


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
    const projectId = req.params.projectId
    console.log("MASOEEEK")
    Todo.findByPk(todosId)
    .then( data => {
        ProjectUser.findAll({ where : { ProjectId : projectId }})
        .then( dataProjectUser => {
            const users = []
            dataProjectUser.forEach(item => {
                users.push(item.dataValues.UserId)
            });
            if(users.indexOf(req.userData.id) >= 0){
                console.log("SUKES SIH")
                next();
            }else{
                throw{ 
                    name: "customErr",
                    message: "You not allowed to see",
                    status: 404
                } 
            }
        })
        .catch( err => {
            next(err)
            // return res.status(500).json({ message: "Internal Server Error"})
        })
    })
    .catch( err => {
        next(err)
        // return res.status(500).json({ message: "Internal Server Error"})
    })
}

module.exports = { authentication , authorization }