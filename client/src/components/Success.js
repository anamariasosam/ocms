import React from 'react'
import PropTypes from 'prop-types'

const Success = ({ description }) => (
  <div className="alert--container alert--success">
    <div>
      <img src={require('../images/success.png')} alt="success icon" className="alert--icon" />
    </div>
    <p>{description}</p>
  </div>
)

Success.propTypes = {
  description: PropTypes.string.isRequired,
}

export default Success
