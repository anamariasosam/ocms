const mongoose = require('mongoose'),
  moment = require('moment'),
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

const getEventosAcademicos = eventosAcademicos => {
  const eventos = {}
  eventosAcademicos.forEach(evento => {
    const fecha = moment(evento.fecha)
      .utc()
      .format('YYYY-MM-DD')
    const hora = moment(evento.fecha)
      .utc()
      .format('h:mm a')
    const nombre = evento.grupo.asignatura.nombre
    const lugar = evento.lugar.nombre
    const tipo = evento.programacion.tipo

    const agenda = {
      nombre,
      lugar,
      hora,
      tipo,
    }

    if (Boolean(eventos[fecha])) {
      eventos[fecha].push(agenda)
    } else {
      eventos[fecha] = [agenda]
    }
  })
  return eventos
}

const crearCalendario = (inicio, fin) => {
  var dateArray = []
  var currentDate = moment(inicio).utc()
  var stopDate = moment(fin).utc()
  while (currentDate <= stopDate) {
    dateArray.push(moment(currentDate).format('YYYY-MM-DD'))
    currentDate = moment(currentDate).add(1, 'days')
  }

  const calendario = {}

  dateArray.forEach(fecha => (calendario[fecha] = []))

  return calendario
}

exports.calendario = (req, res) => {
  const { semestre } = req.query

  Calendario.findOne({ semestre }).exec((err, calendario) => {
    const { fechaInicio, fechaFin } = calendario

    const agenda = {
      minDate: moment(fechaInicio).format('YYYY-MM-DD'),
      maxDate: moment(fechaFin).format('YYYY-MM-DD'),
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
        path: 'lugar',
        select: 'bloque numero nombre',
      })
      .populate({
        path: 'grupo',
        select: 'nombre',
        populate: {
          path: 'asignatura',
          select: 'nombre',
        },
      })
      .sort('fecha')
      .exec((err, eventosAcademicos) => {
        const fechasCalendario = crearCalendario(fechaInicio, fechaFin)
        const eventosAgenda = getEventosAcademicos(eventosAcademicos)

        const eventos = Object.assign(fechasCalendario, eventosAgenda)

        res.status(200).json({
          agenda,
          eventos,
        })
      })
  })
}
