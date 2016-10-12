import React from 'react'

const ArtInfo = ({art}) => {
  return(
    <div>
      <h1>{art.name}</h1>
      <h2>{art.creator}</h2>
      <p>{art.creation_date}</p>
      <div><img src={art.image}/></div>

      <div>{art.category_name}</div>

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