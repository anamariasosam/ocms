import React from 'react'
import ModuleItem from './ModuleItem'
import { modules } from '../data/data'

const ModulesList = () => (
  <nav className="modules--menu">
    {modules.map(module => (
      <ModuleItem key={module.name} module={module} />
    ))}
  </nav>
)

export default ModulesList
