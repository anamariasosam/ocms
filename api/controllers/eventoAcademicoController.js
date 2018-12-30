const mongoose = require('mongoose'),
  EventoAcademico = mongoose.model('EventoAcademico'),
  Programacion = mongoose.model('Programacion'),
  Calendario = mongoose.model('Calendario'),
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
  } else {
    EventoAcademico.find({})
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
  }
}

exports.create = async (req, res) => {
  const { aforo, grupos, encargado, programacion, programacionNombre, fecha } = req.body
  const contadorEventos = await EventoAcademico.count({ programacion })
  const nombre = `${programacionNombre}-${contadorEventos + 1}`

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

  const { aforo, grupos, encargado, fecha } = req.body.data

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

exports.calendario = (req, res) => {
  const { semestre } = req.query

  Calendario.findOne({ semestre }).exec((err, calendario) => {
    const { fechaInicio, fechaFin } = calendario
    const agenda = {
      fechaInicio,
      fechaFin,
    }

    EventoAcademico.find({
      fecha: {
        $gt: fechaInicio,
        $lt: fechaFin,
      },
    })
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
        const evento = {
          nombre: 'Algebra y Trigonometría',
          lugar: '4-202',
          hora: '6:00 am',
          tipo: 'Supletorios Parciales',
        }

        const eventos = eventosAcademicos.map(evento => {
          console.log('====================================')
          console.log(evento.fecha.getDate())
          console.log('====================================')
          const fecha = evento.fecha.toString().split('T')
          console.log(fecha[0])
          console.log(evento.grupos.asignatura)
          console.log(evento.fecha.toTimeString())
          console.log(evento.programacion.tipo)
        })

        utils.show(res, err, eventosAcademicos)
      })
  })
}
