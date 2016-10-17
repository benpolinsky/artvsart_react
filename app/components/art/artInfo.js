import React from 'react'
import Category from '../categories/category.js'
import Datejs from 'datejs'

const ArtInfo = ({art}) => {
  const date = Date.parse(art.creation_date).toString("M/d/yyyy");
  const labelStyles = {
    fontWeight: 700,
    width: 120,
    display: 'inline-block'
  }
  
  const lineStyles = {
    margin: '6px 0'
  }
  
  return(
    <div>
  
      <Category category={art.category} />
      <h2 style={lineStyles}><span style={labelStyles}>Title: </span> {art.name}</h2>
      <h2 style={lineStyles}><span style={labelStyles}>Creator: </span> {art.creator}</h2>
      <hr/>

      <div><img src={art.image}/></div>

     
      <div style={lineStyles}><span style={labelStyles}>Creation Date: </span> {date}</div>
    
      <div style={lineStyles} >
        {art.description}
      </div>

      <div style={lineStyles}>
        {art.additional_images && art.additional_images.forEach((image) => {
          <p>image</p>
        })}
      </div>
      
      <div style={lineStyles}>
        <p>{art.source}</p>
      </div>
    </div>
  )
}

export default ArtInfo