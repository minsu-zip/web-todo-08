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
      todosByStatus.forEach((todos) =>
        todos.sort((a, b) => {
          if (a.created_at > b.created_at) return -1
          else if (b.created_at > a.created_at) return 1
          else return 0
        })
      )
      resCallback(todosByStatus)
    })
  }

  postTodo(data, resCallback) {
    const { status, title, description } = data
    const createQuery = `insert into todo (status, title, description) 
values('${status}', '${title}', '${description}');`

    dbPool.query(createQuery, (err, todo) => {
      const selectQuery = `select * from todo where id = ${todo.insertId};`
      dbPool.query(selectQuery, (err, todo) => {
        resCallback(todo)
      })
    })
  }

  deleteTodo(id, resCallback) {
    const deleteQuery = `delete from todo where id = ${id};`
    dbPool.query(deleteQuery, (err) => {
      resCallback()
    })
  }

  updateTodo(data, resCallback) {
    const { id, ...rest } = data
    const updateQuery =
      [...Object.entries(rest)].reduce((acc, [key, value], index) => {
        if (!value) return acc
        return `${acc}${index ? ',' : ''} ${key}='${value}'`
      }, `update todo set`) + ` where id = ${id};`
    dbPool.query(updateQuery, (err) => {
      const selectQuery = `select * from todo where id = ${id};`
      dbPool.query(selectQuery, (err, todo) => {
        resCallback(todo)
      })
    })
  }
}

module.exports = TodoService
