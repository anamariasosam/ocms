const db = require('./db/db')
const app = require('./app')

db.then(() => {
  console.log('Se ha conectado a la base de datos')
})

app.set('port', process.env.PORT || 3001)

const server = app.listen(app.get('port'), () => {
  console.log('El servidor está en:')
  console.log('http://localhost:' + server.address().port)
})
