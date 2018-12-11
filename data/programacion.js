const ObjectId = require('mongoose').Types.ObjectId

module.exports = [
  {
    nombre: '2018-2-1',
    fechaInicio: '2018-09-08T05:00:00.000Z',
    fechaFin: '2018-09-15T05:00:00.000Z',
    tipo: 'Examenes Parciales',
    calendario: ObjectId('5c0fcc048514a23060175254'),
  },
  {
    nombre: '2018-2-2',
    fechaInicio: '2018-11-17T05:00:00.000Z',
    fechaFin: '2018-11-24T05:00:00.000Z',
    tipo: 'Examenes Finales',
    calendario: ObjectId('5c0fcc048514a23060175254'),
  },
]
