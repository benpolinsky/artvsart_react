import React from 'react';
import ReactDOM from 'react-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import TextField from 'material-ui/TextField';

class SearchFields extends React.Component{
  constructor(){
    super();  
  }
  
  componentWillMount(){
    const source = this.props.source
    this.source_label = `search_${source.toLowerCase()}`;
    this.id_label = `enter_${source.toLowerCase()}_id`;
  }

  
  render(){
    return (
      <div>
        <MuiThemeProvider>
          <TextField ref={this.source_label} type='search' floatingLabelText="Query" onChange={this.props.update} defaultValue="" name={this.source_label} />
        </MuiThemeProvider>
      </div>
    )
  }
  
}

SearchFields.propTypes = {
  source: React.PropTypes.string.isRequired
}

export default SearchFields