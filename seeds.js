const db = require('./db/db')
const ObjectId = require('mongoose').Types.ObjectId

const calendario = require('./api/models/calendario')
const asignatura = require('./api/models/asignatura')
const usuario = require('./api/models/usuario')
const programacion = require('./api/models/programacion')
const grupo = require('./api/models/grupo')
const evento = require('./api/models/eventoAcademico')

var calendarios = [
  {
    nombre: "2017-1",
    fechaInicio: "2017-01-23",
    fechaFin: "2017-06-23"
  },
  {
    nombre: "2017-2",
    fechaInicio: "2017-06-23",
    fechaFin: "2017-11-23"
  },
  {
    nombre: "2018-1",
    fechaInicio: "2018-01-23",
    fechaFin: "2018-06-23"
  },
  {
    nombre: "2018-2",
    fechaInicio: "2018-06-23",
    fechaFin: "2018-11-23"
  }
]

const asignaturas = [
  {
    nombre: 'Ingeniería de Software I',
    creditos: 2
  },
  {
    nombre: 'Ingeniería de Software II',
    creditos: 2
  },
  {
    nombre: 'Ingeniería de Software III',
    creditos: 2
  },
  {
    nombre: 'Ingeniería de Software VI',
    creditos: 2
  }
]

const usuarios = [
  {
    nombre: 'Bell', 
    apellido: 'Manrique',
    email: 'bm@udem.edu.co'
  },
  {
    nombre: 'Juan Bernardo', 
    apellido: 'Quintero',
    email: 'jq@udem.edu.co'
  },
  {
    nombre: 'Gloria Piedad',
    apellido: 'Gasca',
    email: 'gg@udem.edu.co'
  }
]

const progamaciones = [
  {
    nombre: '2017-1-1',
    fechaInicio: '2017-09-11',
    fechaFin: '2017-09-21',
    tipo: 'Parciales',
    calendario: ObjectId('5be9a32d93638328b927d678')
  },
  {
    nombre: '2017-1-2',
    fechaInicio: '2017-11-14',
    fechaFin: '2017-11-25',
    tipo: 'Finales',
    calendario: ObjectId('5be9a32d93638328b927d678')
  },
  {
    nombre: '2017-1-3',
    fechaInicio: '2017-08-11',
    fechaFin: '2017-11-25',
    tipo: 'Foros',
    calendario: ObjectId('5be9a32d93638328b927d678')
  } 
]

const grupos = [
  {
    nombre: '061'
  },
  {
    nombre: '062'
  },
  {
    nombre: '063'
  },
  {
    nombre: '065'
  }
]

const eventos = [
  {
    nombre: '1.ISW1',
    asignatura: 'Ingeniería de Software I',
    encargado: 'Bell Manrique',
    date: '2018-10-05T10:02',
    aforo: '111',
    grupos: ['061', '063', '062'],
    programacion: ObjectId("5be9a631bee4282a4e329463")
  },
  {
    nombre: '2.ISW2',
    asignatura: 'Ingeniería de Software II',
    encargado: 'Juan Bernardo Quintero',
    date: '2018-11-06T18:02',
    aforo: '50',
    grupos: ['061', '062'],
    programacion: ObjectId("5be9a631bee4282a4e329463")
  },
  {
    nombre: '3.ISW3',
    asignatura: 'Ingeniería de Software III',
    encargado: 'Gloria Gasca',
    date: '2018-11-08T06:02',
    aforo: '30',
    grupos: ['062'],
    programacion: ObjectId("5be9a631bee4282a4e329464"),
  }
]

db.then(async () => {

  await evento.insertMany(eventos)
  // await grupo.insertMany(grupos)
  // await programacion.insertMany(programaciones)
  // await usuario.insertMany(usuarios)
  // await calendario.insertMany(calendarios)
  // await asignatura.insertMany(asignaturas)

  process.exit(1)
})
