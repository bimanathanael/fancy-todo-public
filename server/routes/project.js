const router = require('express').Router()
const projectController = require('../controllers/projectController')
const { authorization } = require('../middleware/auth')


router.get('/', projectController.view)
router.get('/:id' , projectController.viewRequestedId)

router.post('/', projectController.add)
router.get('/member/:projectId' , projectController.memberList)
router.post('/invite/:projectId/:idUser' , authorization, projectController.invite)

module.exports = router