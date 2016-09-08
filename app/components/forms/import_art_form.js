import React from 'react';

class ImportArtForm extends React.Component{
  selected(e){
    
  }
  
  render(){
    return (
    <form className='importArt'>
      <div className="form-group">
        <select name="import-source" onChange={this.selected}>
          <option value="Discogs">Discogs</option>
          <option value="Artsy">Artsy</option>
          <option value="Gracenote">Gracenote</option>
        </select>
      </div>
    
      <div id="discogs" className='form-group'>
        Discogs
      </div>
    
      <div id="artsy" className='form-group'>
        Artsy
      </div>
    
      <div id="gracenote" className='form-group'>
        Gracenote
      </div>
      
    </form>
    )
  }
}

export default ImportArtForm