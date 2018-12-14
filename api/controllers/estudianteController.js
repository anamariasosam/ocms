const mongoose = require('mongoose'),
  GrupoUsuario = mongoose.model('GrupoUsuario'),
  EventoAcademico = mongoose.model('EventoAcademico'),
  utils = require('../handlers/utils'),
  ROL_ESTUDIANTE = require('../../constants').ROL_ESTUDIANTE

const asignaturas = {
  path: 'grupo',
  select: 'nombre',
  populate: {
    path: 'asignatura',
    select: 'nombre',
  },
}

exports.asignaturas = (req, res) => {
  const { usuario, semestre } = req.query
  if (semestre) {
    GrupoUsuario.find({ usuario, tipo: ROL_ESTUDIANTE, semestre })
      .populate(asignaturas)
      .exec((err, usuario) => {
        utils.show(res, err, usuario)
      })
  } else {
    GrupoUsuario.find({ usuario, tipo: ROL_ESTUDIANTE })
      .populate(asignaturas)
      .exec((err, usuario) => {
        utils.show(res, err, usuario)
      })
  }
}

exports.eventos = (req, res) => {
  const { usuario, semestre } = req.query
  if (semestre) {
    GrupoUsuario.find({ usuario, tipo: ROL_ESTUDIANTE, semestre })
      .populate(asignaturas)
      .exec((err, usuarios) => {
        const ids = usuarios.map(usuario => usuario.grupo._id)

        EventoAcademico.find({ grupos: { $in: ids } })
          .populate('encargado', 'nombre')
          .populate('programacion', 'tipo')
          .populate({
            path: 'grupos',
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
  } else {
    GrupoUsuario.find({ usuario, tipo: ROL_ESTUDIANTE })
      .populate(asignaturas)
      .exec((err, usuarios) => {
        const ids = usuarios.map(usuario => usuario.grupo._id)

        EventoAcademico.find({ grupos: { $in: ids } })
          .populate('encargado', 'nombre')
          .populate('programacion', 'tipo')
          .populate({
            path: 'grupos',
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
  }
}
