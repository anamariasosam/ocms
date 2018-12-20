import React from 'react'
import LoginForm from '../components/auth/LoginForm'
import MainLayout from '../layouts/MainLayout'

const Login = () => (
  <MainLayout>
    <div className="login--container">
      <div className="login--image">
        <img src={require('../images/userCard.png')} alt="user card" />
      </div>
      <LoginForm />
    </div>
  </MainLayout>
)

export default Login
