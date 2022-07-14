const express = require('express')
const todoController = require('../controllers/todo')

const router = express.Router()

router.get('/', todoController.getTodos)
router.patch('/:id', todoController.updateTodo)

module.exports = router
