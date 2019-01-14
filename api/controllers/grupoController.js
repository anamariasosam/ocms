const mongoose = require('mongoose'),
  Grupo = mongoose.model('Grupo'),
  GrupoUsuario = mongoose.model('GrupoUsuario'),
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
  const { grupoId, semestre } = req.query
  if (grupoId) {
    Grupo.findById(grupoId).exec((err, grupo) => {
      utils.show(res, err, grupo)
    })
  } else {
    GrupoUsuario.find({ semestre, tipo: 'Profesor' })
      .populate('usuario', 'nombre')
      .populate({
        path: 'grupo',
        populate: {
          path: 'asignatura',
          options: {
            sort: '-nivel',
          },
        },
      })
      .exec((err, grupos) => {
        utils.show(res, err, grupos)
      })
  }
}

exports.eventos = (req, res) => {
  const { asignatura } = req.query

  Grupo.find({ asignatura }).exec((err, grupos) => {
    const grupoIds = grupos.map(grupo => grupo._id)

    EventoAcademico.find({ grupo: { $in: grupoIds } })
      .populate('encargado', 'nombre')
      .populate('docente', 'nombre')
      .populate(lugar)
      .populate(grupo)
      .exec((err, eventosAcademicos) => {
        utils.show(res, err, eventosAcademicos)
      })
  })
}

exports.updateEventos = (req, res) => {
  const { eventos } = req.body.data

  const eventsIds = Object.keys(eventos)

  eventsIds.map(id => {
    EventoAcademico.findByIdAndUpdate(id, eventos[id], { new: true }, (err, evento) => {})
  })

  res.status(200).json(eventsIds)
}
