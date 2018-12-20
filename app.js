const express = require('express'),
  bodyParser = require('body-parser'),
  cors = require('cors'),
  routes = require('./api/routes/'),
  path = require('path')

const app = express()

app.use(cors({ origin: '*' }))
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use('/', routes)

if (process.env.NODE_ENV === 'production') {
  // Serve any static files
  app.use(express.static(path.join(__dirname, 'client/build')))
  // Handle React routing, return all requests to React app
  app.get('*', function(req, res) {
    res.sendFile(path.join(__dirname, 'client/build', 'index.html'))
  })
}

module.exports = app
