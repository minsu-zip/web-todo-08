const TodoService = require('../services/todo')

const todoService = new TodoService()

const getTodos = (req, res) => {
  todoService.getTodos((todos) => {
    res.status(200).send(todos)
  })
}

const postTodo = (req, res) => {
  const { status, title, description } = req.body

  const data = { status, title, description }

  todoService.postTodo(data, ([createdTodo]) => {
    res.status(200).send(createdTodo)
  })
}

const updateTodo = (req, res) => {
  const { id } = req.params
  const { status, title, description } = req.body

  const data = { id, status, title, description }
  todoService.updateTodo(data, ([updatedTodo]) => {
    res.status(200).send(updatedTodo)
  })
}

module.exports = { getTodos, postTodo, updateTodo }
