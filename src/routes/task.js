const express = require('express')
const router = express.Router();
const auth = require('../middleware/auth')
const taskController = require('../controller/taskController')

router.get('/',  taskController.getAllTasks)
router.post('/',  taskController.createTask)
router.get('/:userId', taskController.getTaskByUserId)
router.patch('/:_id', taskController.editTask)
router.delete('/:_id', taskController.deleteTaskById)
router.post('/populate', taskController.populate)
router.get('/populate', taskController.populateGet)
router.get('/', taskController.getTaskByCategory)

module.exports = router;