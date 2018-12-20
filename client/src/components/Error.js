import React from 'react'
import PropTypes from 'prop-types'

const Error = ({ description }) => (
  <div className="alert--container alert--danger">
    <div>
      <img src={require('../images/error.png')} alt="error icon" className="alert--icon" />
    </div>
    <p>{description}</p>
  </div>
)

Error.propTypes = {
  description: PropTypes.string.isRequired,
}

export default Error
