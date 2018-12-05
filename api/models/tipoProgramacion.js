const mongoose = require('mongoose'),
  Schema = mongoose.Schema

const TipoProgramacion = new Schema(
  {
    nombre: String,
  },
  {
    collection: 'tiposProgramacion',
  },
)

module.exports = mongoose.model('TipoProgramacion', TipoProgramacion)
