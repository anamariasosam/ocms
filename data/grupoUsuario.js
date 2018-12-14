const ObjectId = require('mongoose').Types.ObjectId

module.exports = [
  {
    _id: ObjectId('5c0fdd4b6999213f889ac1a7'),
    semestre: '2018-2',
    tipo: 'Estudiante',
    usuario: ObjectId('5c0fd732c0102b38448ad477'),
    grupo: ObjectId('5c0fdaee5e88a6307c4edba3'),
  },
  {
    semestre: '2018-2',
    tipo: 'Estudiante',
    usuario: ObjectId('5c0fd732c0102b38448ad477'),
    grupo: ObjectId('5c0fdaee5e88a6307c4edba4'),
  },
  {
    semestre: '2018-2',
    tipo: 'Estudiante',
    usuario: ObjectId('5c0fd732c0102b38448ad477'),
    grupo: ObjectId('5c0fdaee5e88a6307c4edba2'),
  },
  {
    _id: ObjectId('5c0fd731c0102b38448ad46f'),
    semestre: '2018-2',
    tipo: 'Profesor',
    usuario: ObjectId('5c0fd731c0102b38448ad46f'),
    grupo: ObjectId('5c0fdaee5e88a6307c4edba0'),
  },
]
