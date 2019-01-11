const mongoose = require('mongoose'),
  GrupoUsuario = mongoose.model('GrupoUsuario'),
  EventoAcademico = mongoose.model('EventoAcademico'),
  Programacion = mongoose.model('Programacion'),
  utils = require('../handlers/utils'),
  ROL_PROFESOR = require('../../constants').ROL_PROFESOR
PROGRAMACION_ACADEMICA = require('../../constants').PROGRAMACION_ACADEMICA

const asignaturas = {
  path: 'grupo',
  select: 'nombre',
  populate: {
    path: 'asignatura',
    select: 'nombre',
  },
}

const lugar = {
  path: 'lugar',
  select: 'bloque numero nombre',
}

exports.asignaturas = (req, res) => {
  const { usuario, semestre } = req.query
  if (semestre) {
    GrupoUsuario.find({ usuario, tipo: ROL_PROFESOR, semestre })
      .populate(asignaturas)
      .exec((err, usuario) => {
        utils.show(res, err, usuario)
      })
  } else {
    GrupoUsuario.find({ usuario, tipo: ROL_PROFESOR })
      .populate(asignaturas)
      .exec((err, usuario) => {
        utils.show(res, err, usuario)
      })
  }
}

exports.eventos = (req, res) => {
  const { usuario } = req.query

  GrupoUsuario.find({ usuario, tipo: ROL_PROFESOR })
    .populate(asignaturas)
    .exec((err, usuarios) => {
      const grupoIds = usuarios.map(usuario => usuario.grupo._id)

      Programacion.find({ tipo: PROGRAMACION_ACADEMICA }).exec((err, programacion) => {
        const programacionIds = programacion.map(p => p._id)

        EventoAcademico.find()
          .or([
            { grupo: { $in: grupoIds } },
            { programacion: { $in: programacionIds } },
            { encargado: usuario },
          ])
          .populate('encargado', 'nombre')
          .populate('programacion', 'tipo')
          .populate(lugar)
          .populate({
            path: 'grupo',
            select: 'nombre',
            populate: {
              path: 'asignatura',
              select: 'nombre',
            },
          })
          .exec((err, eventos) => {
            utils.show(res, err, eventos)
          })
      })
    })
}
