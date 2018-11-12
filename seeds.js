const db = require('./db/db')
const ObjectId = require('mongoose').Types.ObjectId

const Calendario = require('./api/models/calendario')

var data = [
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

db.then(async () => {
  await Calendario.insertMany(data)

  process.exit(1)
})
