const express = require('express')
const router = express.Router()
const UserController = require('../controllers/userController')
const {validatorRegister, validatorLogin, validatorResult} = require('../validation/validator')
const auth = require('../middleware/auth')
const checkAdmin = require('../middleware/checkAdmin')

router.post('/register',validatorRegister, validatorResult, UserController.register)

router.post('/login',validatorLogin, validatorResult, UserController.login)

router.get('/users',auth , checkAdmin, UserController.getUsers)

router.route('/users/:id')
        .delete(UserController.deleteUser)
        .put(UserController.updateUser)
        .get(UserController.getUser)


module.exports = router