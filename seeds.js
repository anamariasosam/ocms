const db = require('./db/db')

const calendario = require('./api/models/calendario')
const asignatura = require('./api/models/asignatura')
const usuario = require('./api/models/usuario')
const programacion = require('./api/models/programacion')
const eventoAcademico = require('./api/models/eventoAcademico')
const tipoProgramacion = require('./api/models/tipoProgramacion')
const uoc = require('./api/models/uoc')
const grupo = require('./api/models/grupo')
const grupoUsuario = require('./api/models/grupoUsuario')

const tipoProgramacionData = require('./data/tipoProgramacion')
const calendarioData = require('./data/calendario')
const programacionData = require('./data/programacion')
const usuarioData = require('./data/usuario')
const uocData = require('./data/uoc')
const asignaturaData = require('./data/asignatura')
const grupoData = require('./data/grupo')
const grupoUsuarioData = require('./data/grupoUsuario')
const eventoAcademicoData = require('./data/eventoAcademico')

db.then(async () => {
  await tipoProgramacion.insertMany(tipoProgramacionData)
  await calendario.insertMany(calendarioData)
  await programacion.insertMany(programacionData)

  for (let i = 0; i < usuarioData.length; i++) {
    await new usuario(usuarioData[i]).save()
  }

  await uoc.insertMany(uocData)
  await asignatura.insertMany(asignaturaData)
  await grupo.insertMany(grupoData)
  await grupoUsuario.insertMany(grupoUsuarioData)
  await eventoAcademico.insertMany(eventoAcademicoData)

  process.exit(1)
})
