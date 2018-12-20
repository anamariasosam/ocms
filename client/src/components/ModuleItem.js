import React from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'

const ModuleItem = ({ module }) => {
  const { name, image, slug } = module
  return (
    <Link to={`${slug}`} className="reset--link">
      <figure className="module--item">
        <img src={image} alt={name} className="module--image" />
        <figcaption className="module--name">
          <p>{name}</p>
        </figcaption>
      </figure>
    </Link>
  )
}

ModuleItem.propTypes = {
  module: PropTypes.object.isRequired,
}

export default ModuleItem
