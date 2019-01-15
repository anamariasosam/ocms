const mongoose = require('mongoose'),
  moment = require('moment'),
  EventoAcademico = mongoose.model('EventoAcademico'),
  Programacion = mongoose.model('Programacion'),
  Calendario = mongoose.model('Calendario'),
  GrupoUsuario = mongoose.model('GrupoUsuario'),
  Grupo = mongoose.model('Grupo'),
  utils = require('../handlers/utils'),
  PROGRAMACION_ACADEMICA = require('../../constants').PROGRAMACION_ACADEMICA

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
  const { nombre, programacionNombre, semestre } = req.query
  if (nombre) {
    EventoAcademico.findOne({ nombre: nombre })
      .populate('encargado', 'nombre')
      .populate('programacion', 'tipo')
      .populate(lugar)
      .populate(grupo)
      .sort('fechaInicio')
      .exec((err, eventoAcademico) => {
        utils.show(res, err, eventoAcademico)
      })
  } else if (programacionNombre) {
    Programacion.findOne({ nombre: programacionNombre }).exec((err, programacion) => {
      const programacionId = programacion._id
      EventoAcademico.find({ programacion: programacionId })
        .populate('encargado', 'nombre')
        .populate(lugar)
        .populate('programacion', 'tipo')
        .populate(grupo)
        .sort('fechaInicio')
        .exec((err, eventosAcademicos) => {
          utils.show(res, err, eventosAcademicos)
        })
    })
  } else {
    EventoAcademico.find({})
      .populate('encargado', 'nombre')
      .populate(lugar)
      .populate('programacion', 'tipo nombre')
      .populate(grupo)
      .sort('fechaInicio')
      .exec((err, eventosAcademicos) => {
        utils.show(res, err, eventosAcademicos)
      })
  }
}

exports.create = async (req, res) => {
  const {
    aforo,
    grupo,
    encargado,
    nombre,
    programacion,
    programacionNombre,
    fechaInicio,
    fechaFin,
    lugar,
  } = req.body
  const contadorEventos = await EventoAcademico.countDocuments({ programacion })
  const nombreEvento = nombre || `${programacionNombre}-${contadorEventos + 1}`
  const semestre = programacionNombre.slice(0, 6)

  GrupoUsuario.findOne({ grupo, tipo: 'Profesor', semestre }).exec((err, grupoUsuario) => {
    const eventoAcademico = new EventoAcademico({
      nombre: nombreEvento,
      fechaInicio,
      fechaFin,
      aforo,
      grupo,
      encargado,
      programacion,
      lugar,
    })

    eventoAcademico.save((err, eventoAcademico) => {
      utils.show(res, err, eventoAcademico)
    })
  })
}

exports.createMultipleEvents = async (req, res) => {
  const { grupos, programacion, programacionNombre } = req.body
  let contadorEventos = await EventoAcademico.countDocuments({ programacion })

  Object.keys(grupos).map(grupo => {
    EventoAcademico.findOne({ programacion, grupo }).exec((err, evento) => {
      if (evento) {
        const { nombre } = evento

        EventoAcademico.findOneAndUpdate(
          { nombre },
          grupos[grupo],
          { new: true },
          (err, evento) => {},
        )
      } else {
        const semestre = programacionNombre.slice(0, 6)
        GrupoUsuario.findOne({ grupo, tipo: 'Profesor', semestre }).exec((err, grupoUsuario) => {
          contadorEventos++
          const nombre = `${programacionNombre}-${contadorEventos}`
          const { fechaInicio, aforo, encargado, fechaFin } = grupos[grupo]

          const evento = {
            nombre,
            grupo,
            programacion,
            fechaInicio,
            fechaFin,
            aforo: aforo || 0,
            encargado: encargado || grupoUsuario.usuario,
          }

          const eventoAcademico = new EventoAcademico(evento)

          eventoAcademico.save()
        })
      }
    })
  })

  res.status(200).json({})
}

exports.update = (req, res) => {
  const { nombre } = req.body.params

  const {
    aforo,
    grupo,
    encargado,
    fechaInicio,
    fechaFin,
    lugar,
    nombre: nombreEvento,
  } = req.body.data

  const nombreNuevo = nombreEvento || nombre
  EventoAcademico.findOneAndUpdate(
    { nombre },
    {
      aforo,
      grupo,
      encargado,
      fechaInicio,
      fechaFin,
      lugar,
      nombre: nombreNuevo,
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
      .populate(lugar)
      .populate(grupo)
      .sort('fechaInicio')
      .exec((err, eventos) => {
        utils.show(res, err, eventos)
      })
  })
}

const getEventosAcademicos = eventosAcademicos => {
  const eventos = {}
  eventosAcademicos.forEach(evento => {
    const fecha = moment(evento.fechaInicio)
      .utc()
      .format('YYYY-MM-DD')
    const hora = moment(evento.fechaInicio)
      .utc()
      .format('h:mm a')
    const nombre = (evento.grupo && evento.grupo.asignatura.nombre) || evento.nombre
    const lugar = (event.lugar && evento.lugar.nombre) || 'Pendiente'
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
  const { semestre, usuario, tipo } = req.query

  Calendario.findOne({ semestre }).exec((err, calendario) => {
    const { fechaInicio, fechaFin } = calendario

    const agenda = {
      minDate: moment(fechaInicio).format('YYYY-MM-DD'),
      maxDate: moment(fechaFin).format('YYYY-MM-DD'),
    }

    GrupoUsuario.find({ usuario, tipo }).exec((err, usuarios) => {
      const grupoIds = usuarios.map(usuario => usuario.grupo._id)

      Programacion.find({ tipo: PROGRAMACION_ACADEMICA }).exec((err, programacion) => {
        const programacionIds = programacion.map(p => p._id)

        EventoAcademico.find({
          fechaInicio: {
            $gt: fechaInicio,
            $lt: fechaFin,
          },
        })
          .or([
            { grupo: { $in: grupoIds } },
            { programacion: { $in: programacionIds } },
            { encargado: usuario },
          ])
          .populate('encargado', 'nombre')
          .populate('programacion', 'tipo')
          .populate(lugar)
          .populate(grupo)
          .sort('fechaInicio')
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
    })
  })
}
