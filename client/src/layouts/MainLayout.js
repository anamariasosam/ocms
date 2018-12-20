import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import ModulesList from '../components/ModulesList'

const MainLayout = ({ children }) => (
  <Fragment>
    <div className="main--content">{children}</div>
    <ModulesList />
  </Fragment>
)

MainLayout.propTypes = {
  children: PropTypes.object,
}

export default MainLayout
