import React from 'react'
import MainLayout from '../layouts/MainLayout'

const About = () => (
  <MainLayout>
    <div className="page--container">
      <h1>Contexto del proyecto</h1>
      <p>
        OCMS es un sistema en línea de gestión curricular asistida por tecnologías de información,
        teniendo en cuenta elementos de diseño curricular, estrategias de trabajo activo, innovación
        abierta y recursos de apoyo.
      </p>
      <p>
        En este contexto los profesores, jefes de las diferentes UOC y los jefes de programas pueden
        hacer uso de OCMS para definir el currículo de una asignatura, los horarios y profesores que
        dictarán las mismas, además de gestionar los proyectos que se llevan a cabo en cada una de
        las asignaturas, posibilitando de esta manera el desarrollo de estos proyectos de una manera
        secuencial al integrarlos en varias asignaturas, permitiendo que los estudiantes tengan la
        posibilidad de desarrollar software más completo y utilizando todos los conocimientos que
        adquieren en cada una de las asignaturas por las que cursan. Igualmente mediante OCMS, los
        estudiantes y profesores podrán crear sus respectivos equipos de trabajo del proyecto que
        estén desarrollando en determinada asignatura. Así mismo, los estudiantes pueden visualizar
        sus notas de seguimiento y evaluaciones, también como hacer uso de las asesorías para cada
        asignatura.
      </p>
    </div>
  </MainLayout>
)

export default About
