import React from 'react'

const year = () => new Date().getFullYear()

const FooterCredits = () => (
  <div className="footer--copyright">
    <p>
      Copyright ©{year()}
      OCMS Project - Universidad de Medellín
    </p>
  </div>
)

export default FooterCredits
