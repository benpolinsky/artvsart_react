import React from 'react';
import ReactDOM from 'react-dom';

class SearchFields extends React.Component{
  constructor(){
    super();  
    this.update = this.update.bind(this);
    
  }
  
  componentWillMount(){
    const source = this.props.source
    this.source_label = `search_${source.toLowerCase()}`;
    this.id_label = `enter_${source.toLowerCase()}_id`;
  }
  
  
  update(e){
    this.props.update(ReactDOM.findDOMNode(this.refs[this.source_label]).value);
  }
  
  render(){
    return (
      <div id={this.props.source.toLowerCase()} className={`${this.props.active ? 'active' : 'hidden' + ' import-group form-group'}`}>
        <h3>{`Search ${this.source}`}</h3>
        <div className="form-group">
          <label name={this.source_label}>Query: </label>
          <input ref={this.source_label} type='search' onKeyUp={this.update} name={this.source_label} className='form-control' />
        </div>
      </div>
    )
  }
  
}

SearchFields.propTypes = {
  source: React.PropTypes.string.isRequired
}

export default SearchFields