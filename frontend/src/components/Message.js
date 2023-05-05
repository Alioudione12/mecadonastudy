import React from 'react'
import { Alert } from 'react-bootstrap'

// message pour les utilisateurs quand api rencontre des problems renvoi les données
function Message({variant, children}) {
  return (
    <Alert variant={variant}>
        {children}
    </Alert>
  )
}

export default Message
