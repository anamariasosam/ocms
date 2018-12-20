import React from 'react'
import PropTypes from 'prop-types'
import SideBarElement from './SideBarElement'
import { Link } from 'react-router-dom'

const renderElements = menu =>
  menu.map(element => <SideBarElement key={element.name} path={element.path} name={element.name} />)

const SideBar = ({ menu }) => {
  const active = window.location.pathname === '/calendarioAcademico' ? 'active' : ''

  return (
    <div className="sidebar--container">
      <h2>
        <Link to="/calendarioAcademico" className={`reset--link ${active}`}>
          Calendario Académico
        </Link>
      </h2>
      <nav>
        <ul className="sidebar--list">{renderElements(menu)}</ul>
      </nav>
    </div>
  )
}

SideBar.propTypes = {
  menu: PropTypes.array.isRequired,
}

export default SideBar
