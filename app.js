const express = require('express'),
  bodyParser = require('body-parser'),
  cors = require('cors'),
  routes = require('./api/routes/')

const app = express()

app.use(cors({ origin: '*' }))
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use('/', routes)

module.exports = app
