import React from 'react'
import PropTypes from 'prop-types'
import SideBar from '../components/SideBar'

const ModuleLayout = ({ children, menu }) => {
  const manyItems = menu.length > 1
  const moduleClass = manyItems ? 'module--children-sidebar' : 'module--children-fullWidth'
  return (
    <div className="module--content">
      {manyItems && <SideBar menu={menu} />}
      <div className={moduleClass}>{children}</div>
    </div>
  )
}

ModuleLayout.propTypes = {
  children: PropTypes.object.isRequired,
  menu: PropTypes.array.isRequired,
}

export default ModuleLayout
