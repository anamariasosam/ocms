const mongoose = require('mongoose'),
  EventoAcademico = mongoose.model('EventoAcademico'),
  Programacion = mongoose.model('Programacion'),
  utils = require('../handlers/utils')

exports.show = (req, res) => {
  const { nombre, programacionId } = req.query
  if (nombre) {
    EventoAcademico.findOne({ nombre: nombre }).exec((err, eventoAcademico) => {
      utils.show(res, err, eventoAcademico)
    })
  } else if (programacionId) {
    EventoAcademico.find({ programacion: programacionId })
      .sort('fecha')
      .exec((err, eventosAcademicos) => {
        utils.show(res, err, eventosAcademicos)
      })
  }
}

exports.create = (req, res) => {
  const { nombre, aforo, asignatura, grupos, encargado, programacionId } = req.body.data
  let { fecha } = req.body.data
  fecha = new Date(fecha)
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
  const { nombre } = req.body.params

  const { aforo, asignatura, grupos, encargado } = req.body.data
  let { fecha } = req.body.data
  fecha = new Date(fecha)

  EventoAcademico.findOneAndUpdate(
    { nombre },
    {
      aforo,
      asignatura,
      grupos,
      encargado,
      fecha,
    },
    { new: true },
    (err, evento) => {
      utils.show(res, err, evento)
    },
  )
}

exports.delete = (req, res) => {
  const { eventoAcademicoId, programacionId } = req.query
  EventoAcademico.findOneAndDelete({ _id: eventoAcademicoId }, (err, evento) => {
    EventoAcademico.find({ programacion: programacionId }).exec((err, eventos) => {
      utils.show(res, err, eventos)
    })
  })
}
