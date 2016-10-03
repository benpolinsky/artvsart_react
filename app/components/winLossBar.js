import React from 'react'

export const WinLossBar = ({results}) => {
  return(
    <div className='winLossBar'>
      <span className='winLossMeter'>
        <span className='winMeter'></span>
        <span className='lossMeter'></span>
      </span>
    </div>
  )
  
}