import React from 'react'
import QuickRow from '../quickRow.js'
import dateFormat from '../../utils/dateFormats.js'


const ArtInfo = ({art}) => {
 
  
  return(
    <div>
      <QuickRow label='Title' content={art.name} />
      <QuickRow label='Creator' content={art.creator} />
      <QuickRow label='Created' content={dateFormat(art.creation_date)} />
      <QuickRow label='Category' content={art.category.name} />
  
      <hr style={{borderRadius: 0, borderLeftWidth: 0, borderRightWidth: 0}}/>
        

      <div><img style={{maxWidth: '100%'}} src={art.image}/></div>
    
      <div style={{position: 'relative', margin: '6px 0', paddingBottom: 20, fontSize: 12, lineHeight: 1.3, wordBreak: 'break-all'}} >
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