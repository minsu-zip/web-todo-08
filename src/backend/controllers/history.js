const { historyService } = require('../services/history')

exports.getHistorys = function (req, res) {
  historyService((historys) => {
    res.status(200).send(historys)
  })
}
