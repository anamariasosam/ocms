import React from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import cookie from 'react-cookies'
import PropTypes from 'prop-types'

const setAuthenticationLink = authenticated => {
  if (authenticated) {
    return {
      name: '/logout',
      title: 'Cerrar Sesión',
    }
  }

  return {
    name: '/login',
    title: 'Iniciar Sesión',
  }
}

const welcomeText = authenticated => {
  const { nombre } = cookie.load('user') || ''
  if (authenticated) {
    return (
      <Link to="/perfil" className="profile--link">
        {nombre}
      </Link>
    )
  } else {
    return 'Bienvenido'
  }
}

const LoginHeader = ({ authenticated }) => {
  const authentication = setAuthenticationLink(authenticated)
  return (
    <div className="login--header">
      <span className="login--welcome">{welcomeText(authenticated)}</span>
      <span className="login--pipe">|</span>
      <Link to={authentication.name} className="log--link reset--link">
        {authentication.title}
      </Link>
    </div>
  )
}

function mapStateToProps(state) {
  return {
    authenticated: state.auth.authenticated,
  }
}

LoginHeader.propTypes = {
  authenticated: PropTypes.bool.isRequired,
}

export default connect(mapStateToProps)(LoginHeader)
