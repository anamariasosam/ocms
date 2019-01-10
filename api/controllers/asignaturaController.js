const mongoose = require('mongoose'),
  Asignatura = mongoose.model('Asignatura'),
  Grupo = mongoose.model('Grupo'),
  Programacion = mongoose.model('Programacion'),
  EventoAcademico = mongoose.model('EventoAcademico'),
  utils = require('../handlers/utils')

const lugar = {
  path: 'lugar',
  select: 'bloque numero nombre',
}

const grupo = {
  path: 'grupo',
  select: 'nombre',
  populate: {
    path: 'asignatura',
    select: 'nombre',
  },
}

exports.show = (req, res) => {
  const { asignaturaId } = req.query
  if (asignaturaId) {
    Asignatura.findById(asignaturaId).exec((err, asignatura) => {
      utils.show(res, err, asignatura)
    })
  } else {
    Asignatura.find({ troncoComun: false })
      .sort('nivel')
      .exec((err, asignaturas) => {
        utils.show(res, err, asignaturas)
      })
  }
}

exports.grupos = (req, res) => {
  const { asignaturaId } = req.query
  Grupo.find({ asignatura: asignaturaId }).exec((err, grupos) => {
    utils.show(res, err, grupos)
  })
}

exports.eventos = (req, res) => {
  const { programacionNombre } = req.query

  Programacion.findOne({ nombre: programacionNombre }).exec((err, programacion) => {
    const programacionId = programacion._id
    EventoAcademico.find({ programacion: programacionId })
      .populate('encargado', 'nombre')
      .populate('docente', 'nombre')
      .populate(lugar)
      .populate('programacion', 'tipo')
      .populate(grupo)
      .sort('fechaInicio')
      .exec((err, eventosAcademicos) => {
        const eventos = {}
        eventosAcademicos.map(evento => {
          eventos[evento.grupo.asignatura.nombre] = evento.fechaInicio
        })
        utils.show(res, err, eventos)
      })
  })
}
