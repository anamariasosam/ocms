import React from 'react'
import PropTypes from 'prop-types'
import { modules } from '../../data/data'

const moduleData = moduleName => modules.filter(modulo => modulo.slug === moduleName)[0]

const Module = ({ match }) => {
  const moduleName = match.url.split('/').pop()
  const { name } = moduleData(moduleName)
  return (
    <div className="main--content">
      <h1>{name}</h1>
      <p>Módulo en proceso...</p>
    </div>
  )
}

Module.propTypes = {
  match: PropTypes.object.isRequired,
}

export default Module
