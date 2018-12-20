import React, { Fragment } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Header from './components/Header'
import Footer from './components/Footer'
import Home from './pages/Home'
import NotFound from './pages/NotFound'
import Login from './pages/Login'
import Logout from './pages/Logout'
import Team from './pages/Team'
import About from './pages/About'
import Contact from './pages/Contact'
import EditProfile from './pages/EditProfile'
import Module from './pages/modules/Module'
import AcademicSchedule from './pages/AcademicSchedule/AcademicSchedule'
import RequireAuth from './components/auth/RequireAuth'
import './styles/App.css'
import 'moment/locale/es'

const App = () => (
  <Router>
    <Fragment>
      <Header />
      <Switch>
        <Route path="/" component={Home} exact />
        <Route path="/login" component={Login} />
        <Route path="/logout" component={Logout} />
        <Route path="/equipo" component={Team} />
        <Route path="/about" component={About} />
        <Route path="/contactenos" component={Contact} />
        <Route path="/perfil" component={RequireAuth(EditProfile)} />

        <Route path="/calendarioAcademico" component={AcademicSchedule} />
        <Route path="/gestionCurricular" component={Module} />
        <Route path="/bancoDeProyectos" component={Module} />
        <Route path="/orientacionAcademica" component={Module} />
        <Route path="/redesSociales" component={Module} />
        <Route component={NotFound} />
      </Switch>

      <Footer />
    </Fragment>
  </Router>
)

export default App
