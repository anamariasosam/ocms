import cookie from 'react-cookies'

const setPath = () => {
  const { rol } = cookie.load('user') || ''

  switch (rol) {
    case 'Jefe de Programa':
    case 'Estudiante':
    case 'Profesor':
      return '/calendarioAcademico'
    default:
      return '/login'
  }
}

export default setPath
