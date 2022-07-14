const express = require('express')
const { getHistorys } = require('../controllers/history')

const router = express.Router()
router.get('/', getHistorys)

module.exports = router
