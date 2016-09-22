import React from 'react';
import SearchFields from './search_fields.js';

class ImportArtForm extends React.Component{
  constructor(){
    super();
    this.update = this.update.bind(this);
  }
  
  update(data){
   this.props.update(data);
  }
    
  render(){
    
    return (
      <form onSubmit={this.props.submitForm} className='import-art col-xs-12'>

        <div className="form-group">
          <label id="import-source">Select Source</label>
          <select name="import-source" ref="importSource" defaultValue={this.props.selected_source} onChange={this.props.selected} className='form-control'>
            <option value=''>Please Select</option>
            {this.props.sources.map(source => <option key={source} value={source}>{source}</option>)}
          </select>
        </div>
      
        {this.props.sources.map(source => {
          return <SearchFields active={this.props.selected_source == source} 
                               ref={source} 
                               key={source}
                               update={this.update}
                               source={source} />
        })}
      
        <div className="form-group">
          <input className="btn btn-primary" type="submit" value='Search'/>
        </div>
      
      </form>

    )
  }
}

export default ImportArtForm

