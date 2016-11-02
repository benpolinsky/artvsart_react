import React from 'react'

const socialMediaIdentities = ({user}) => {
  return(
    <div>
      {user.identities.map((identity, index) => {
        return <p key={index}>{identity}</p>
      })}
    </div>
  )
}

export default socialMediaIdentities