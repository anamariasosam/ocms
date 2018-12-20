import React from 'react'
import PropTypes from 'prop-types'
import { Route, Switch } from 'react-router-dom'

import ModuleLayout from './ModuleLayout'
import NotFound from '../pages/modules/NotFound'
import RequireAuth from '../components/auth/RequireAuth'

const AcademicScheduleLayout = ({ menu, routes }) => (
  <ModuleLayout menu={menu}>
    <Switch>
      {routes.map(element => (
        <Route
          exact
          key={element.path}
          path={element.path}
          component={RequireAuth(element.component)}
        />
      ))}
      <Route component={NotFound} />
    </Switch>
  </ModuleLayout>
)

AcademicScheduleLayout.propTypes = {
  menu: PropTypes.array.isRequired,
  routes: PropTypes.array.isRequired,
}

export default AcademicScheduleLayout
