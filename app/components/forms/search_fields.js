import React from 'react';
import ReactDOM from 'react-dom';

//  bad name...
class SearchFields extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      query: '',
      listing_id: '',
      source: this.props.source
    }
    
    this.update = this.update.bind(this);
    this.source = this.props.source;
    this.source_label = `search_${this.source.toLowerCase()}`;
    this.id_label = `enter_${this.source.toLowerCase()}_id`;
    
  }
  
  update(e){
    this.setState({
      query: ReactDOM.findDOMNode(this.refs[this.source_label]).value,
      listing_id: ReactDOM.findDOMNode(this.refs[this.id_label]).value
    }, () => {
      this.props.update(this.state);
    }) 
  }
  
  render(){
    return (
      <div id={this.props.source.toLowerCase()} className={`${this.props.active ? 'active' : 'hidden' + ' import-group form-group'}`}>
        <h3>{`Search ${this.source}`}</h3>
        <div className="form-group">
          <label name={this.source_label}>Search</label>
          <input ref={this.source_label} type='search' onKeyDown={this.update} name={this.source_label} className='form-control' />
        </div>

        <div className="form-group">
          <label name={this.id_label}>Enter Record/Listing ID</label>
          <input ref={this.id_label} type='text' onKeyDown={this.update} name={this.id_label} className='form-control' />
        </div>
      </div>
    )
  }
  
}

SearchFields.propTypes = {
  source: React.PropTypes.string.isRequired
}

export default SearchFields