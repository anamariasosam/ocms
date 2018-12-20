import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import { fetchAgenda } from '../actions/agenda'

class SelectInput extends Component {
  constructor(props) {
    super(props)

    this.state = {
      value: props.defaultValue,
    }

    this.change = this.change.bind(this)
  }

  change(e) {
    this.setState({ value: e.target.value })

    this.props.handleSelectOption(e.target.value)
  }

  render() {
    const { value } = this.state
    return (
      <select className="input select--input semestre--input" onChange={this.change} value={value}>
        {this.renderOptions()}
      </select>
    )
  }

  renderOptions() {
    if (this.props.type === 'semestre') {
      return (
        <Fragment>
          <option value="2018-2">2018-2</option>
          <option value="2019-1">2019-1</option>
        </Fragment>
      )
    }

    return (
      <Fragment>
        <option value="Ceremonia de Grados">Ceremonia de Grados</option>
        <option value="Supletorios Parciales">Supletorios Parciales</option>
        <option value="Examenes Finales">Examenes Finales</option>
        <option value="Programacion Académica">Programacion Académica</option>
        <option value="Examenes Parciales">Examenes Parciales</option>
        <option value="Supletorios Finales">Supletorios Finales</option>
      </Fragment>
    )
  }
}

function mapStateToProps(state) {
  const { errorMessage, schedules } = state.agenda

  return {
    errorMessage,
    schedules,
  }
}

export default connect(
  mapStateToProps,
  { fetchAgenda },
)(SelectInput)
