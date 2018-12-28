const mongoose = require('mongoose'),
  keys = require('../config/keys')

mongoose.Promise = global.Promise

require('../api/models/asignatura')
require('../api/models/calendario')
require('../api/models/eventoAcademico')
require('../api/models/grupo')
require('../api/models/grupoUsuario')
require('../api/models/lugar')
require('../api/models/programacion')
require('../api/models/tipoProgramacion')
require('../api/models/uoc')
require('../api/models/usuario')

const db = mongoose.connect(
  keys.mongoURI,
  {
    useNewUrlParser: true,
  },
)

module.exports = db
