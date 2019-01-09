const ObjectId = require('mongoose').Types.ObjectId

module.exports = [
  {
    _id: ObjectId('5c0fcfbbcadb7644e88940bd'),
    nombre: '2019-2-1',
    fechaInicio: '2018-09-08T05:00:00.000Z',
    fechaFin: '2018-09-15T05:00:00.000Z',
    tipo: 'Examenes Parciales',
    calendario: ObjectId('5c0fcc048514a23060175254'),
  },
  {
    _id: ObjectId('5c0fcfbbcadb7644e88940be'),
    nombre: '2019-2-2',
    fechaInicio: '2018-11-17T05:00:00.000Z',
    fechaFin: '2018-11-24T05:00:00.000Z',
    tipo: 'Examenes Finales',
    calendario: ObjectId('5c0fcc048514a23060175254'),
  },
]
