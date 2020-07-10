const router = require('express').Router()
const todos = require('./todos')
const mainController = require('../controllers/mainController')
const { authentication , authorization } = require('../middleware/auth')

router.post('/register', mainController.register)
router.post('/login', mainController.login)
router.post('/googleSignin', mainController.googleSignin)

router.use(authentication)
router.use('/todos', todos)

module.exports = router