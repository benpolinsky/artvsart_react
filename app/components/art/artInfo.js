import React from 'react'
import Datejs from 'datejs'
import QuickRow from '../quickRow.js'

const ArtInfo = ({art}) => {
  var date = ""
  
  if (typeof art.creation_date == 'string') {
    var date = Date.parse(art.creation_date).toString("M/d/yyyy");
  } 
  
  return(
    <div>
      <QuickRow label='Title' content={art.name} />
      <QuickRow label='Creator' content={art.creator} />
      <QuickRow label='Created' content={date} />
      <QuickRow label='Category' content={art.category.name} />
  
      <hr style={{borderRadius: 0, borderLeftWidth: 0, borderRightWidth: 0}}/>
        

      <div><img style={{maxWidth: '100%'}} src={art.image}/></div>
    
      <div style={{position: 'relative', margin: '6px 0', paddingBottom: 20, fontSize: 12, lineHeight: 1.3}} >
        {art.description}
        <a style={{position: 'absolute', right: 2, bottom: 2}} href={art.source_link} target='new'>{art.source}</a>
      </div>
        

    </div>
  )
}

ArtInfo.propTypes = {
  art: React.PropTypes.object.isRequired
}

export default ArtInfo