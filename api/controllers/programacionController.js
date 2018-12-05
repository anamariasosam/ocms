const mongoose = require('mongoose'),
  Programacion = mongoose.model('Programacion'),
  Calendario = mongoose.model('Calendario'),
  utils = require('../handlers/utils')

exports.show = (req, res) => {
  const { nombre, semestre } = req.query
  if (nombre) {
    Programacion.findOne({ nombre }).exec((err, programacion) => {
      utils.show(res, err, programacion)
    })
  } else if (semestre) {
    Calendario.findOne({ semestre }).exec((err, calendario) => {
      if (calendario) {
        const calendarioId = calendario._id
        Programacion.find({ calendario: calendarioId })
          .sort('nombre')
          .exec((err, programaciones) => {
            utils.show(res, err, programaciones)
          })
      }
    })
  }
}

exports.create = async (req, res) => {
  const { calendarioId, tipo, calendarioSemestre } = req.body
  let { fechaInicio, fechaFin } = req.body

  fechaInicio = new Date(fechaInicio)
  fechaFin = new Date(fechaFin)

  const contadorProgramaciones = await Programacion.count({ calendario: calendarioId })
  const nombre = `${calendarioSemestre}-${contadorProgramaciones + 1}`

  const calendario = new Calendario({ _id: calendarioId })

  const programacion = new Programacion({
    nombre,
    fechaInicio,
    fechaFin,
    tipo,
    calendario,
  })

  programacion.save((err, programacion) => {
    utils.show(res, err, programacion)
  })
}

exports.update = (req, res) => {
  const { nombre } = req.body.params
  const { tipo } = req.body
  let { fechaInicio, fechaFin } = req.body.data
  fechaInicio = new Date(fechaInicio)
  fechaFin = new Date(fechaFin)

  Programacion.findOneAndUpdate(
    { nombre },
    {
      fechaInicio,
      fechaFin,
      tipo,
    },
    { new: true },
    (err, programacion) => {
      utils.show(res, err, programacion)
    },
  )
}

exports.delete = (req, res) => {
  const { calendarioId, programacionId } = req.query
  Programacion.findOneAndDelete({ _id: programacionId }, (err, calendario) => {
    Programacion.find({ calendario: calendarioId }).exec((err, programaciones) => {
      utils.show(res, err, programaciones)
    })
  })
}
