const dbPool = require('../config/db')

exports.historyService = function (resCallback) {
  const selectQuery = 'select * from history;'
  dbPool.query(selectQuery, (err, historys) => {
    resCallback(historys)
  })
}

exports.historyActionService = function (data, resCallback) {
  const createQuery = `insert into history (title) values('${data.title}');`
  dbPool.query(createQuery, (err, action) => {
    resCallback(action)
  })
}
