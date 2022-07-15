const { historyService, historyActionService } = require('../services/history')

exports.getHistorys = function (req, res) {
  historyService((historys) => {
    res.status(200).send(historys)
  })
}

exports.postHistory = function (req, res) {
  const data = req.body

  historyActionService(data, (action) => {
    res.status(200).send(action)
  })
}
