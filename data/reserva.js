const ObjectId = require('mongoose').Types.ObjectId

module.exports = [
  {
    fechaInicio: Date,
    fechaFin: Date,
    fechaReserva: Date,
    estado: {
      default: 'Pendiente',
      type: String,
    },
    observaciones: {
      default: 'Ninguna',
      type: String,
    },
    lugar: { type: ObjectId, ref: 'Lugar' },
    evento: { type: ObjectId, ref: 'EventoAcademico' },
  },
]
