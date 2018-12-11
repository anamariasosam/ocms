const mongoose = require('mongoose'),
  Schema = mongoose.Schema,
  CEREMONIA_DE_GRADOS = require('../../constants').CEREMONIA_DE_GRADOS,
  SUPLETORIOS_PARCIALES = require('../../constants').SUPLETORIOS_PARCIALES,
  EXAMENES_FINALES = require('../../constants').EXAMENES_FINALES,
  PROGRAMACION_ACADEMICA = require('../../constants').PROGRAMACION_ACADEMICA,
  EXAMENES_PARCIALES = require('../../constants').EXAMENES_PARCIALES,
  SUPLETORIOS_FINALES = require('../../constants').SUPLETORIOS_FINALES

const TipoProgramacion = new Schema(
  {
    nombre: {
      type: String,
      enum: [
        CEREMONIA_DE_GRADOS,
        SUPLETORIOS_PARCIALES,
        EXAMENES_FINALES,
        PROGRAMACION_ACADEMICA,
        EXAMENES_PARCIALES,
        SUPLETORIOS_FINALES,
      ],
      default: EXAMENES_FINALES,
    },
  },
  {
    collection: 'tiposProgramacion',
  },
)

module.exports = mongoose.model('TipoProgramacion', TipoProgramacion)
