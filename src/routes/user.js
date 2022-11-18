const express = require('express')
const userRouter = express.Router()
const userController = require('../controllers/userController')

userRouter.post('/register', userController.create)
userRouter.post('/login', userController.login)
userRouter.get('/list-all', userController.list)
userRouter.get('/profile/:id', userController.profile)
userRouter.patch('/update/:id', userController.update)
userRouter.delete('/remove/:id', userController.remove)
module.exports = userRouter