const router = require('express').Router()
const todosController = require('../controllers/todosController')
const { authorization } = require('../middleware/auth')


router.get('/', todosController.view)
router.get('/:id' , todosController.viewRequestedId)

router.post('/', todosController.add)
router.put('/:id', authorization , todosController.update)

router.delete('/:id',authorization, todosController.delete)



module.exports = router