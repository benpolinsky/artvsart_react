import React from 'react';
import ReactDOM from 'react-dom';

class NewArtForm extends React.Component{
  constructor(){
    super()
    this.update = this.update.bind(this);
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
      <form ref='form' onSubmit={this.props.submit} className='col-xs-12'>
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
        {this.props.children}
        <input type="submit" value="Create!" className='btn btn-primary' />
      </form>
    )
  }
}

export default NewArtForm
