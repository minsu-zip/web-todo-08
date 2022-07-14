const dbPool = require('../config/db')

const todoStatus = ['todo', 'inprogress', 'done']

class TodoService {
  getTodos(resCallback) {
    const sql = 'select * from todo;'
    dbPool.query(sql, (err, todos) => {
      const todosByStatus = todos.reduce(
        (acc, todo) => {
          {
            acc[todoStatus.indexOf(todo.status)].push(todo)
            return acc
          }
        },
        [[], [], []]
      )
      todosByStatus.forEach((todos) => todos.sort())
      resCallback(todosByStatus)
    })
  }
}

module.exports = TodoService
