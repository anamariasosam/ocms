import Calendar from '../JefeDePrograma/Calendar/Calendar'
import Agenda from '../JefeDePrograma/Agenda/Agenda'
import Event from '../JefeDePrograma/Event/Event'
import Reserva from '../JefeDePrograma/Reserva/Reserva'
import JefeDeProgramaCalendar from '../JefeDePrograma/Calendar'

import CalendarCreateForm from '../JefeDePrograma/Calendar/CalendarCreateForm'
import AgendaCreateForm from '../JefeDePrograma/Agenda/AgendaCreateForm'
import EventCreateForm from '../JefeDePrograma/Event/EventCreateForm'
import ReservaCreateForm from '../JefeDePrograma/Reserva/ReservaCreateForm'

import CalendarEditForm from '../JefeDePrograma/Calendar/CalendarEditForm'
import AgendaEditForm from '../JefeDePrograma/Agenda/AgendaEditForm'
import EventEditForm from '../JefeDePrograma/Event/EventEditForm'
import ReservaEditForm from '../JefeDePrograma/Reserva/ReservaEditForm'

const currentYear = new Date().getFullYear()

export const jefeDeProgramaMenu = [
  {
    path: '/calendarioAcademico/calendario',
    name: 'Calendarios',
  },
  {
    path: `/calendarioAcademico/programacion/show/${currentYear}-2`,
    name: 'Programaciones',
  },
  {
    path: `/calendarioAcademico/evento/show/${currentYear}-2-1`,
    name: 'Eventos',
  },
  {
    path: `/calendarioAcademico/reserva/show/${currentYear}-2-1-1`,
    name: 'Reservas',
  },
]

export const jefeDeProgramaRoutes = [
  {
    path: '/calendarioAcademico/calendario',
    component: Calendar,
  },
  {
    path: '/calendarioAcademico/calendario/create',
    component: CalendarCreateForm,
  },
  {
    path: '/calendarioAcademico/calendario/edit/:semestre',
    component: CalendarEditForm,
  },
  {
    path: '/calendarioAcademico/programacion/show/:semestre',
    component: Agenda,
  },
  {
    path: '/calendarioAcademico/programacion/create',
    component: AgendaCreateForm,
  },
  {
    path: '/calendarioAcademico/programacion/edit/:nombre',
    component: AgendaEditForm,
  },
  {
    path: '/calendarioAcademico/evento/show/:nombre',
    component: Event,
  },
  {
    path: '/calendarioAcademico/evento/create',
    component: EventCreateForm,
  },
  {
    path: '/calendarioAcademico/evento/edit/:nombre/',
    component: EventEditForm,
  },
  {
    path: '/calendarioAcademico/reserva/show/:nombre',
    component: Reserva,
  },
  {
    path: '/calendarioAcademico/reserva/create',
    component: ReservaCreateForm,
  },
  {
    path: '/calendarioAcademico/reserva/edit/:nombre',
    component: ReservaEditForm,
  },
  {
    path: '/calendarioAcademico',
    component: JefeDeProgramaCalendar,
  },
]
