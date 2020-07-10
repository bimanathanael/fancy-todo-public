require("dotenv").config();
const { Todo, User } = require('../models')
const doMail = require('../helper/mail')

class TodosController{
    static view (req, res, next){
        Todo.findAll()
        .then(data => {
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
            title: req.body.title,
            description: req.body.description,
            status: req.body.status,
            due_date: req.body.due_date,
            UserId: +req.userData.id
        }

        if(newOne.title == "" || newOne.description == "" || newOne.status == "" || newOne.due_date == ""){
            throw {
                name: "customErr",
                message: "Please Fill All Fields",
                status : 404,
            }
        }

        Todo.create(newOne)
        .then(data => {
            doMail(data)
            return res.status(201).json(data)
        })
        .catch(err => {
            next(err)
        })
    }


    static viewRequestedId(req, res, next){
        const id = req.params.id
        Todo.findByPk(id)
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

    static update(req, res, next){
        const updatedId = req.params.id

        Todo.findByPk(updatedId)
        .then(data => {
            if(data == null){
                throw {
                    name: "customErr",
                    message: "Id Todos not found",
                    status : 404
                }
            } else {

                let updatedOne = {
                    title: req.body.title,
                    description: req.body.description,
                    status: req.body.status,
                    due_date: req.body.due_date,
                    UserId: req.userData.id
                    // UserId: 10
                }
                if(updatedOne.title == "" || updatedOne.description == "" || updatedOne.status == "" || updatedOne.due_date == ""){
                    throw {
                        name: "customErr",
                        message: "Please Fill All Fields",
                        status : 404,
                    }
                }

                data.update(updatedOne, {
                    where : {
                        id : updatedId
                    }
                })

                .then(data => {
                    return res.status(200).json(data)
                })
                .catch(err => {
                    return res.status(500).json(err)
                })
            }
        })
        .catch(err=>{
            next(err)
        })
    }

    static delete(req, res, next){
        const deletedId = req.params.id
        Todo.findByPk(deletedId)
        .then(deletedData => {
            deletedData.destroy()
            .then(data => {
                if(!data){
                    throw {
                        name: "customErr",
                        message: "Id Todos not found",
                        status : 404
                    }
                } else {
                    return res.status(200).json(deletedData)
                }
            })
            .catch(err=>{
                next(err)
            })
        })
        .catch( err => {
            const errMsg = {
                name: "customErr",
                message: "Id Todos not found",
                status : 404
            }

            next(errMsg)
        })
    }

}


module.exports = TodosController