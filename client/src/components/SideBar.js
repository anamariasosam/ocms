import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import SideBarElement from './SideBarElement'

const renderElements = menu =>
  menu.map(element => <SideBarElement key={element.name} path={element.path} name={element.name} />)

const SideBar = ({ menu }) => {
  const url = window.location.pathname
  const active = url.split('/')[1] === 'calendarioAcademico' ? 'active' : ''

  return (
    <div className="sidebar--container">
      <h2 className="sidebar--title">
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
