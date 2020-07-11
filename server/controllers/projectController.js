require("dotenv").config();
const { ProjectUser , Project , User } = require('../models')
const doMail = require('../helper/mail')

class ProjectController{
    static view (req, res, next){
        console.log(req.userData.id, "INI BACA")
        ProjectUser.findAll({include : [Project,User] , where : { UserId :  req.userData.id}})
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


    static add (req, res, next){
        let newOne = {
            name: req.body.name,
            deadline: req.body.deadline,
        }

        if(newOne.name == "" || newOne.deadline == "" ){
            throw {
                name: "customErr",
                message: "Please Fill All Fields",
                status : 404,
            }
        }

        Project.create(newOne)
        .then(data => {
            console.log("MASUK BOSS")
            doMail(data)

            const newData={
                ProjectId : data.id,
                UserId : req.userData.id,
            }
            ProjectUser.create(newData)
            .then(dataPU => {
                return res.status(201).json(data)
            })
            .catch(err=>{
                return res.status(404).json(err)
            })
        })
        .catch(err => {
            console.log("ERRO BOOOss")
            console.log(err)

            next(err)
        })
    }


    static viewRequestedId(req, res, next){
        const requestedId = req.params.id
        Project.findOne({ where: {id : requestedId}})
        .then(data => {
            if(data == null){
                return res.status(404).json({ 
                    message: "data not found"
                })
            } else {
                return res.status(200).json(data)
            }
        })
        .catch(err=>{
            return res.status(404).json(err)
        })
    }

    static memberList(req, res, next){
        const selectedId = req.params.projectId
        console.log(selectedId,"selectedId")
        ProjectUser.findAll({where : {ProjectId : selectedId}, include: [Project, User]})
        .then(data => {
            if(data == null){
                return res.status(404).json({ 
                    message: "no data"
                })
            } else {
                console.log("MASUK PAK EKU in" ,data)
                return res.status(200).json(data)
            }
        })
        .catch(err=>{
            return res.status(404).json(err)
        })
    }

    static invite(req, res, next){
        const newData={
            ProjectId : req.params.projectId,
            UserId : req.params.idUser,
        }
        console.log(newData,"newDatanewDatanewData")

        ProjectUser.create(newData)
        .then(data => {
            console.log("MASUK GA TUIHJ")
            return res.status(201).json(data)
        })
        .catch(err=>{
            console.log("ENG MASUK GA TUIHJ")
            return res.status(404).json(err)
        })
    }
}


module.exports = ProjectController