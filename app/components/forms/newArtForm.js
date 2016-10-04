import React from 'react';
import ReactDOM from 'react-dom';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';

const textFieldStyles = {
  float: 'left',
  clear: 'both'
}

class NewArtForm extends React.Component{
  constructor(){
    super()
    this.update = this.update.bind(this);
  }
  
  getChildContext(){
    return { muiTheme: getMuiTheme() }
  }
  
  update(e){    
    this.props.update({
     name: ReactDOM.findDOMNode(this.refs.name).value,
     creator: ReactDOM.findDOMNode(this.refs.creator).value,
     description: ReactDOM.findDOMNode(this.refs.description).value
    });
  }

  render(){
    return(
      <form ref='form' onSubmit={this.props.submit} className='createArtForm col-xs-12'>
        <h2>Add New Art</h2>
        <TextField style={textFieldStyles} ref='name' type='text' floatingLabelText="Name" onChange={this.update} defaultValue=""/>
        <TextField style={textFieldStyles} ref='creator' type='text' floatingLabelText="Creator" onChange={this.update} defaultValue="" />
        <TextField style={textFieldStyles} ref='description' floatingLabelText="Description" multiLine={true} onChange={this.update} defaultValue="" />
        <div className="uploadToS3">
          {this.props.children}
        </div>
        <RaisedButton primary={true} style={textFieldStyles} type="submit">Create!</RaisedButton>
      </form>
    )
  }
}

NewArtForm.childContextTypes = {
  muiTheme: React.PropTypes.object.isRequired
}

export default NewArtForm