import React from 'react'
import PropTypes from 'prop-types'
import SideBar from '../components/SideBar'

const ModuleLayout = ({ children, menu }) => (
  <div className="module--content">
    <SideBar menu={menu} />
    <div className="module--children">{children}</div>
  </div>
)

ModuleLayout.propTypes = {
  children: PropTypes.object.isRequired,
  menu: PropTypes.array.isRequired,
}

export default ModuleLayout
