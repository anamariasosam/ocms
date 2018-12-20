import React from 'react'
import PropTypes from 'prop-types'
import { NavLink } from 'react-router-dom'

const SideBarElement = ({ name, path }) => {
  const active = path.split('/')[2] === window.location.pathname.split('/')[2] ? 'active' : ''
  return (
    <li>
      <NavLink to={path} className={`reset--link ${active}`}>
        {name}
      </NavLink>
    </li>
  )
}

SideBarElement.propTypes = {
  name: PropTypes.string.isRequired,
  path: PropTypes.string.isRequired,
}

export default SideBarElement
