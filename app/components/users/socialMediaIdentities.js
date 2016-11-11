import React from 'react'
import Radium from 'radium'
import Styles from '../../styles/socialMediaIdentities.js'
import baseStyles from '../../styles/base.js';
import capitalize from '../../utils/capitalize.js'

const socialMediaIdentities = ({user}) => {
  return(
    <div style={[baseStyles.centeredPage, {marginBottom: 20, paddingBottom: 10}]}>
      {(user.identities.length > 0) && 
        <div>
          <h2>Social Accounts Connected: </h2>
          <ul style={Styles.list}>
            {user.identities.map((identity, index) => {
              return <li style={Styles.listItem} key={index}>{capitalize(identity)}</li>
            })}
          </ul>
        </div>
      }
    </div>
  )
}

export default Radium(socialMediaIdentities)