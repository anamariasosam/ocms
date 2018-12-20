import React from 'react'
import { Link } from 'react-router-dom'

const FooterMenu = () => (
  <div className="footer--container">
    <div>
      <img src={require('../images/partner.png')} alt="logo" />
    </div>
    <div>
      <ul className="footer--menu">
        <li>OCMS</li>
        <li>
          <Link to="/" className="footer--link reset--link">
            Ir a inicio
          </Link>
        </li>
        <li>
          <Link to="/login" className="footer--link reset--link">
            Acceso a mi cuenta
          </Link>
        </li>
        <li>
          <Link to="/about" className="footer--link reset--link">
            Acerca del proyecto
          </Link>
        </li>
      </ul>
    </div>
    <div>
      <ul className="footer--menu">
        <li>Actas</li>
        <li>Lista de actas</li>
      </ul>
    </div>
    <div>
      <ul className="footer--menu">
        <li>Contacto</li>
        <li>
          <img src={require('../images/icon_mail.png')} alt="email" className="footer--icon" />
          <a
            href="ocms@udem.edu.co"
            target="_blank"
            className="footer--link reset--link"
            rel="noopener noreferrer"
          >
            ocms@udem.edu.co
          </a>
        </li>
        <li>
          <img src={require('../images/icon_home.png')} alt="home" className="footer--icon" />
          <a
            href="https://www.udem.edu.co"
            target="_blank"
            className="footer--link reset--link"
            rel="noopener noreferrer"
          >
            www.udem.edu.co
          </a>
        </li>
      </ul>
    </div>
  </div>
)

export default FooterMenu
