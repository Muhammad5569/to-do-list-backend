const express = require('express')
const router = express.Router();
const auth = require('../middleware/auth')
const userController = require('../controller/userController');

// console.log(getAllUsers)
router.get('/', userController.getAllUsers)
router.get('/:id', userController.getUserById);
router.get('/some/:username', userController.getUserByUsername)
router.post('/', userController.createUser);
router.post('/login', auth, userController.login)
router.delete('/', userController.deleteUserById)
router.patch('/:id', userController.update)

module.exports = router;