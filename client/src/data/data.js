import setPath from '../utils/role'

export const modules = [
  {
    name: 'Gestión Curricular',
    image: require('../images/Book.png'),
    slug: '/gestionCurricular',
  },
  {
    name: 'Banco de proyectos',
    image: require('../images/Bank.png'),
    slug: '/bancoDeProyectos',
  },
  {
    name: 'Calendario Académico',
    image: require('../images/Calendar.png'),
    slug: setPath(),
  },
  {
    name: 'Orientación Académica',
    image: require('../images/Dashboard.png'),
    slug: '/orientacionAcademica',
  },
  {
    name: 'Redes Sociales',
    image: require('../images/Message.png'),
    slug: '/redesSociales',
  },
]

export const attendants = ['Bell Manrique', 'Juan Bernardo', 'Grissa']
