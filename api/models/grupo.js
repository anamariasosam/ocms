const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Grupo = new Schema(
  {
    nombre: String,
  },
)


module.exports = mongoose.model('Grupo', Grupo)
