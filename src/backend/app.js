var express = require('express')
var path = require('path')
var cookieParser = require('cookie-parser')
var logger = require('morgan')
const webpack = require('webpack')
const middleware = require('webpack-dev-middleware')
const compiler = webpack(require('../../webpack.config'))
require('./config/db')

const todoRouter = require('./routes/todo')
const historyRouter = require('./routes/history')

var app = express()

process.env.NODE_ENV = process.env.NODE_ENV || 'development'

if (process.env.NODE_ENV === 'development') {
  // 웹팩 설정
  app.use(
    '/dist',
    middleware(compiler, {
      // webpack-dev-middleware options
    })
  )
}

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.resolve(__dirname, '../../public')))
}

app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'public')))

app.use('/api/todos', todoRouter)
app.use('/api/history', historyRouter)

app.get('/', (req, res) => {
  res.sendFile(path.resolve(__dirname, `../../public/index.html`))
})

module.exports = app
