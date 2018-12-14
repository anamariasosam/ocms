const mongoose = require('mongoose'),
  EventoAcademico = mongoose.model('EventoAcademico'),
  Programacion = mongoose.model('Programacion'),
  Calendario = mongoose.model('Calendario'),
  Usuario = mongoose.model('Usuario'),
  utils = require('../handlers/utils')

exports.show = (req, res) => {
  const { nombre, programacionNombre, semestre } = req.query
  if (nombre) {
    EventoAcademico.findOne({ nombre: nombre })
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
      .sort('fecha')
      .exec((err, eventoAcademico) => {
        utils.show(res, err, eventoAcademico)
      })
  } else if (programacionNombre) {
    Programacion.findOne({ nombre: programacionNombre }).exec((err, programacion) => {
      const programacionId = programacion._id
      EventoAcademico.find({ programacion: programacionId })
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
        .sort('fecha')
        .exec((err, eventosAcademicos) => {
          utils.show(res, err, eventosAcademicos)
        })
    })
  } else if (semestre) {
    Calendario.findOne({ semestre }).exec((err, calendario) => {
      if (calendario) {
        const calendarioId = calendario._id
        Programacion.find({ calendario: calendarioId })
          .select('_id')
          .exec((err, programaciones) => {
            const ids = programaciones.map(programacion => programacion._id)

            EventoAcademico.find({ programacion: { $in: ids } })
              .populate('encargado', 'nombre')
              .populate('programacion', 'tipo nombre')
              .populate({
                path: 'grupos',
                select: 'nombre',
                populate: {
                  path: 'asignatura',
                  select: 'nombre',
                },
              })
              .sort('fecha')
              .exec((err, eventosAcademicos) => {
                utils.show(res, err, eventosAcademicos)
              })
          })
      }
    })
  }
}

exports.create = (req, res) => {
  const { nombre, aforo, grupos, encargado, programacion } = req.body
  let { fecha } = req.body
  fecha = new Date(fecha)

  const eventoAcademico = new EventoAcademico({
    nombre,
    fecha,
    aforo,
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

  const { aforo, grupos, encargado } = req.body.data
  let { fecha } = req.body.data
  fecha = new Date(fecha)

  EventoAcademico.findOneAndUpdate(
    { nombre },
    {
      aforo,
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
    EventoAcademico.find({ programacion: programacionId })
      .populate('encargado', 'nombre')
      .populate({
        path: 'grupos',
        select: 'nombre',
        populate: {
          path: 'asignatura',
          select: 'nombre',
        },
      })
      .sort('fecha')
      .exec((err, eventos) => {
        utils.show(res, err, eventos)
      })
  })
}
