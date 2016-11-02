import React from 'react'
import Radium from 'radium'
import Styles from '../../styles/forms.js'

const socialMediaIdentities = ({user}) => {
  return(
    <div style={Styles.centered}>
      <h2>Social Accounts Connected: </h2>
      <ul>
        {user.identities.map((identity, index) => {
          return <li key={index}>{identity}</li>
        })}
      </ul>

    </div>
  )
}

export default socialMediaIdentities