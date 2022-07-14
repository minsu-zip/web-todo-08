const express = require('express')
const { getHistorys, postHistory } = require('../controllers/history')

const router = express.Router()
router.get('/', getHistorys)
router.post('/', postHistory)

module.exports = router
