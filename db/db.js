const mongoose = require('mongoose'),
  keys = require('../config/keys')

mongoose.Promise = global.Promise

require('../api/models/calendario')
require('../api/models/programacion')
require('../api/models/grupo')
require('../api/models/asignatura')
require('../api/models/usuario')
require('../api/models/eventoAcademico')
require('../api/models/tipoProgramacion')

const db = mongoose.connect(
  keys.mongoURI,
  {
    useNewUrlParser: true,
  },
)

module.exports = db
