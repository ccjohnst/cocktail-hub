import React from 'react'
import { getUser } from '../services/auth'

const Profile = () => {
  return (
    <div>
      <h1>Your Profile</h1>
      <ul>
        <li>Name: {getUser().name}</li>
        <li>Email: {getUser().email}</li>
      </ul>
    </div>
  )
}

export default Profile
