import React, { useEffect } from 'react'
import AuthHeader from '../services/authHeader'

function Logout() {
  useEffect(() => {
    AuthHeader.deleteHeaders()
    document.location.href = "/"
  })

  return (<>Logging out...</>)
}

export default Logout