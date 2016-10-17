import React from 'react'
import Category from '../categories/category.js'
import Datejs from 'datejs'

const ArtInfo = ({art}) => {
  const date = Date.parse(art.creation_date).toString("M/d/yyyy");
  
  return(
    <div>
      <Category category={art.category} />
      <h1>{art.name}</h1>
      <h2>{art.creator}</h2>
      <p>{date}</p>
      <div><img src={art.image}/></div>

     

      <div className="artDescription">
        {art.description}
      </div>

      <div>
        {art.additional_images && art.additional_images.forEach((image) => {
          <p>image</p>
        })}
      </div>
      
      <div>
        <p>{art.source}</p>
      </div>
    </div>
  )
}

export default ArtInfo