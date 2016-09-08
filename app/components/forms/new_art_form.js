import React from 'react';

class NewArtForm extends React.Component{
  constructor(props){
    super(props)
    this.submit = this.submit.bind(this);
    this.nameChanged = this.nameChanged.bind(this);
    this.creatorChanged = this.creatorChanged.bind(this);
    this.descriptionChanged = this.descriptionChanged.bind(this);

    this.state = {
      art: props.art
    }
  }

  nameChanged(e){
    this.state.art.name = e.target.value;
  }
  
  creatorChanged(e){
    this.state.art.creator = e.target.value;
  }
  
  descriptionChanged(e){
    this.state.art.description = e.target.value;
  }
  
  submit(e){
    e.preventDefault();
    if (this.state.art.name.length > 0 && this.state.art.creator.length > 0) {
      this.props.submit(this.state.art);      
    }

  }
  
  render(){
    return(
      <form onSubmit={this.submit} className='col-xs-12'>
        <div className='form-group'>
          <label>Art Name</label>
          <input type='text' name="art[name]" onChange={this.nameChanged} defaultValue="" className="form-control" />
        </div>
    
        <div className='form-group'>
          <label>Art Creator</label>
          <input type='text' name="art[creator]" onChange={this.creatorChanged} defaultValue="" className="form-control" />
        </div>
    
        <div className='form-group'>
          <label>Art Description</label>
          <textarea name="art[description]" onChange={this.descriptionChanged} defaultValue="" className="form-control" rows='10' />
        </div>
    
        <input type="submit" value="Create!" className='btn btn-primary' />
      </form>
    )
  }
}

export default NewArtForm
