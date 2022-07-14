const dbPool = require('../config/db')

class TodoService {
  getTodos(resCallback) {
    const sql = 'select * from todo;'
    dbPool.query(sql, (err, todos) => {
      resCallback(todos)
    })
  }
}

module.exports = TodoService
