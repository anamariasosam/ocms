import React, { Fragment } from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'

const Options = ({ handleDelete, urls, state, showTitle }) => {
  const editUrl = {
    pathname: urls[1],
    state,
  }

  const showUrl = {
    pathname: urls[0],
    state,
  }

  return (
    <Fragment>
      <Link className="reset--link" to={showUrl} title={showTitle}>
        <img src={require('../images/show.png')} alt="show" className="action--image" />
      </Link>
      <Link className="reset--link" to={editUrl} title="Editar">
        <img src={require('../images/edit.png')} alt="edit" className="action--image" />
      </Link>
      <button className="reset--button" onClick={handleDelete} type="button" title="Eliminar">
        <img src={require('../images/delete.png')} alt="remove" className="action--image" />
      </button>
    </Fragment>
  )
}

Options.propTypes = {
  state: PropTypes.object.isRequired,
  handleDelete: PropTypes.func.isRequired,
  urls: PropTypes.array.isRequired,
  showTitle: PropTypes.string.isRequired,
}

export default Options
