const ObjectId = require('mongoose').Types.ObjectId

module.exports = [
  {
    id: ObjectId('5c0fded732a82506ac2396d7'),
    nombre: 1,
    fecha: '2018-11-22T05:00:00.000Z',
    aforo: 50,
    grupos: ObjectId('5c0fdaee5e88a6307c4edba0'),
    encargado: ObjectId('5c0fd731c0102b38448ad46f'),
    medios: 'Video Beam',
    programacion: ObjectId('5c0fcfbbcadb7644e88940bd'),
  },
]
