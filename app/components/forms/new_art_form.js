import React from 'react';
import ReactDOM from 'react-dom';

class NewArtForm extends React.Component{
  constructor(props){
    super(props)
    this.submit = this.submit.bind(this);
    this.update = this.update.bind(this);

    this.state = {
      art: props.art
    }
  }
  
  update(e){
    this.setState({
      art: {
       name: ReactDOM.findDOMNode(this.refs.name).value,
       creator: ReactDOM.findDOMNode(this.refs.creator).value,
       description: ReactDOM.findDOMNode(this.refs.description).value
      }
    })
  }

  submit(e){
    e.preventDefault();
    if (this.state.art.name.length > 0 && this.state.art.creator.length > 0) {
      this.props.submit(this.state.art);      
    }

  }
  
  render(){
    return(
      <form ref='form' onSubmit={this.submit} className='col-xs-12'>
        <div className='form-group'>
          <label>Art Name</label>
          <input ref='name' type='text' name="art[name]" onChange={this.update} defaultValue="" className="form-control" />
        </div>
    
        <div className='form-group'>
          <label>Art Creator</label>
          <input ref='creator' type='text' name="art[creator]" onChange={this.update} defaultValue="" className="form-control" />
        </div>
    
        <div className='form-group'>
          <label>Art Description</label>
          <textarea ref='description' name="art[description]" onChange={this.update} defaultValue="" className="form-control" rows='10' />
        </div>
    
        <input type="submit" value="Create!" className='btn btn-primary' />
      </form>
    )
  }
}

export default NewArtForm
