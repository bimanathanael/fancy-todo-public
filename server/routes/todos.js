const router = require('express').Router()
const todosController = require('../controllers/todosController')
const { authorization } = require('../middleware/auth')


router.get('/:projectId/', authorization, todosController.view)
router.get('/:projectId/:id' , authorization , todosController.viewRequestedId)

router.post('/:projectId/',authorization, todosController.add)
router.put('/:projectId/:id', authorization , todosController.update)

router.delete('/:projectId/:id',authorization, todosController.delete)



module.exports = router