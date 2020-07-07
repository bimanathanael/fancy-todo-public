require("dotenv").config();

const express = require('express')
const routes = require('./routes')
const app = express()
const PORT = process.env.PORT || 3333
const errorHandler = require('./middleware/errorHandler')

app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use('/', routes)

app.use('/', errorHandler)

app.listen(PORT , () => {
    console.log(` ok siap buka di port ${PORT} bro `)
})