const TodoService = require('../services/todo')

const todoService = new TodoService()

const getTodos = (req, res) => {
  todoService.getTodos((todos) => {
    res.status(200).send(todos)
  })
}

module.exports = { getTodos }
