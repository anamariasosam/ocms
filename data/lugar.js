const ObjectId = require('mongoose').Types.ObjectId

module.exports = [
  {
    id: ObjectId('5c1940efbfe2bf4774a2186a'),
    nombre: 'CDC',
    numero: 404,
    bloque: 15,
    capacidad: 100,
    recursos: [ObjectId('5c18faaa5b8a0f51ace9f1c6')],
  },
  {
    id: ObjectId('5c1940efbfe2bf4774a2186b'),
    nombre: 'CDC',
    numero: 209,
    bloque: 15,
    capacidad: 20,
    recursos: [ObjectId('5c18faaa5b8a0f51ace9f1c6'), ObjectId('5c18faaa5b8a0f51ace9f1c7')],
  },
]
