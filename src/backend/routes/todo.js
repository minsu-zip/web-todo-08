const express = require('express')
const todoController = require('../controllers/todo')

const router = express.Router()

router.get('/', todoController.getTodos)
router.post('/', todoController.postTodo)
router.patch('/:id', todoController.updateTodo)

module.exports = router
