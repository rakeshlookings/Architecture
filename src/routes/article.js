const express = require('express')
const articleRouter = express.Router()
const articleController = require('../controllers/articleController')

articleRouter.post('/add', articleController.create)
articleRouter.get('/list-all', articleController.list)
articleRouter.get('/get-one/:id', articleController.getOne)
articleRouter.patch('/update/:id', articleController.update)
articleRouter.patch('/like/:id', articleController.markLiked)
articleRouter.delete('/remove/:id', articleController.remove)
module.exports = articleRouter