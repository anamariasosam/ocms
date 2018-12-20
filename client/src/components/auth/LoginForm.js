import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { loginUser } from '../../actions/auth'
import Error from '../Error'

class LoginForm extends Component {
  constructor(props) {
    super(props)

    this.correo = React.createRef()
    this.password = React.createRef()

    this.handleFormSubmit = this.handleFormSubmit.bind(this)
  }

  handleFormSubmit(e) {
    e.preventDefault()
    const { loginUser } = this.props
    const correo = this.correo.current.value
    const password = this.password.current.value

    const data = {
      correo,
      password,
    }

    loginUser(data)
  }

  render() {
    const { errorMessage } = this.props
    return (
      <div className="form--container">
        <h2 className="form--title">Iniciar Sesión</h2>
        <form onSubmit={this.handleFormSubmit}>
          <label htmlFor="correo" className="required label">
            Correo Electrónico:
          </label>
          <input type="email" id="correo" className="input" ref={this.correo} required />

          <label htmlFor="password" className="required label">
            Clave:
          </label>
          <input type="password" id="password" className="input" ref={this.password} required />

          <div className="form--controls">
            <input type="submit" value="Continuar" className="button" />
          </div>
        </form>

        {errorMessage && <Error description={errorMessage} />}
      </div>
    )
  }
}

LoginForm.propTypes = {
  loginUser: PropTypes.func.isRequired,
  errorMessage: PropTypes.string.isRequired,
}

function mapStateToProps(state) {
  return {
    errorMessage: state.auth.error,
  }
}

export default connect(
  mapStateToProps,
  { loginUser },
)(LoginForm)
