const dbPool = require('../config/db')

exports.historyService = function (resCallback) {
  const selectQuery = 'select * from history;'
  dbPool.query(selectQuery, (err, historys) => {
    resCallback(historys)
  })
}
