const mongoose = require('mongoose'),
  moment = require('moment'),
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
          .sort('fechaInicio')
          .exec((err, programaciones) => {
            utils.show(res, err, programaciones)
          })
      }
    })
  }
}

exports.create = async (req, res) => {
  const {
    calendarioId,
    tipo,
    calendarioSemestre,
    fechaInicio,
    fechaFin,
    discriminadaPorNivel,
  } = req.body

  const nombre = `${calendarioSemestre}-${tipo}`

  const calendario = new Calendario({ _id: calendarioId })
  const programacion = new Programacion({
    nombre,
    fechaInicio,
    fechaFin: fechaFin.concat('T23:59:00'),
    tipo,
    calendario,
    discriminadaPorNivel,
  })

  programacion.save((err, programacion) => {
    utils.show(res, err, programacion)
  })
}

exports.update = (req, res) => {
  const { nombre } = req.body.params
  const { fechaInicio, fechaFin, tipo, discriminadaPorNivel } = req.body.data

  Programacion.findOneAndUpdate(
    { nombre },
    {
      fechaInicio,
      fechaFin: fechaFin.concat('T23:59:00'),
      tipo,
      discriminadaPorNivel,
    },
    { new: true },
    (err, programacion) => {
      utils.show(res, err, programacion)
    },
  )
}

exports.delete = (req, res) => {
  const { calendarioId, programacionId } = req.query
  Programacion.findById(programacionId, (err, programacion) => {
    programacion.remove(err => {
      Programacion.find({ calendario: calendarioId }).exec((err, programaciones) => {
        utils.show(res, err, programaciones)
      })
    })
  })
}
