import React from 'react'

export default function Profile() {

const profileName = sessionStorage.getItem('name')



  return (
    <div>
        <h1>Welcome, {profileName}</h1>

    </div>
  )
}
