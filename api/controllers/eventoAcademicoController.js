const mongoose = require('mongoose')
const EventoAcademico = mongoose.model('EventoAcademico')
const Programacion = mongoose.model('Programacion')
const utils = require('../handlers/utils')

exports.show = (req, res) => {
  const { eventoAcademicoId, programacionId } = req.query
  if (eventoAcademicoId) {
    EventoAcademico.findById(eventoAcademicoId).exec((err, eventoAcademico) => {
      utils.show(res, err, eventoAcademico)
    })
  } else if (programacionId) {
    EventoAcademico.find({ programacion: programacionId }).exec((err, eventosAcademicos) => {
      utils.show(res, err, eventosAcademicos)
    })
  }
}

exports.create = (req, res) => {
  const { nombre, fecha, aforo, asignatura, grupos, encargado, programacionId } = req.body

  const programacion = new Programacion({ _id: programacionId })

  const eventoAcademico = new EventoAcademico({
    nombre,
    fecha,
    aforo,
    asignatura,
    grupos,
    encargado,
    programacion,
  })

  eventoAcademico.save((err, eventoAcademico) => {
    utils.show(res, err, eventoAcademico)
  })
}

exports.update = (req, res) => {
  EventoAcademico.findByIdAndUpdate(
    { _id: req.query.eventoAcademicoId },
    req.body,
    { new: true },
    (err, programacion) => {
      utils.show(res, err, programacion)
    },
  )
}

exports.delete = (req, res) => {
  EventoAcademico.findOneAndDelete({ _id: req.query.eventoAcademicoId }, (err, programacion) => {
    console.log(programacion)
    utils.show(res, err, programacion)
  })
}
