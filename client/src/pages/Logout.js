import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import * as actions from '../actions/auth'

class Logout extends Component {
  componentWillMount() {
    const { logoutUser } = this.props
    logoutUser()
  }

  render() {
    return <div>Cerrando Sesión...</div>
  }
}

Logout.propTypes = {
  logoutUser: PropTypes.func.isRequired,
}

export default connect(
  null,
  actions,
)(Logout)
