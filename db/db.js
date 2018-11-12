const mongoose = require('mongoose')
const keys = require('../config/keys')

mongoose.Promise = global.Promise

require('../api/models/calendario')
require('../api/models/programacion')

const db = mongoose.connect(
  keys.mongoURI,
  {
    useNewUrlParser: true,
  },
)

module.exports = db
