import React from 'react'
import Category from '../categories/category.js'
import Datejs from 'datejs'
import QuickRow from '../quickRow.js'

const ArtInfo = ({art}) => {
  const date = Date.parse(art.creation_date).toString("M/d/yyyy");
  
  return(
    <div>
  
      <Category category={art.category} />
      <QuickRow label='Title' content={art.name} />
      <QuickRow label='Creator' content={art.creator} />
      {art.source && <QuickRow label='Source' content={art.creator}/>}
      {art.source_link && <a href={art.source_link} target='new'>Find Out More</a>}
      <hr/>
        

      <div><img style={{maxWidth: '100%'}} src={art.image}/></div>
      
      <QuickRow label='Creation Date' content={date} />
      
      <div style={{margin: '6px 0'}} >
        {art.description}
      </div>

      <div style={{margin: '6px 0'}}>
        {art.additional_images && art.additional_images.forEach((image) => {
          <p>image</p>
        })}
      </div>
    </div>
  )
}

export default ArtInfo