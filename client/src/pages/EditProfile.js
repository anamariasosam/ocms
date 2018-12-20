import React from 'react'
import ProfileForm from '../components/ProfileForm'
import MainLayout from '../layouts/MainLayout'

const EditProfile = () => (
  <MainLayout>
    <div className="password--container">
      <div className="password--image">
        <img src={require('../images/userCard.png')} alt="user card" />
      </div>
      <ProfileForm />
    </div>
  </MainLayout>
)

export default EditProfile
