import React from 'react';
import ReactDOM from 'react-dom';
import ReactS3Uploader from 'react-s3-uploader';
import AjaxHelpers from '../../utils/ajax_helpers.js';

class NewArtForm extends React.Component{
  constructor(props){
    super(props)
    this.submit = this.submit.bind(this);
    this.update = this.update.bind(this);
    this.onUploadFinish = this.onUploadFinish.bind(this);
    this.onUploadStart = this.onUploadStart.bind(this);
    this.componentWillMount = this.componentWillMount.bind(this);
  }
  
  
  componentWillMount(){
    console.log('about to mount');
    this.setState({
      art: this.props.art
    })
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
    // need proper validation of the things.
    if (this.state.art.name.length > 0 && this.state.art.creator.length > 0) {
      this.props.submit(this.state.art);      
    }
  }

  onUploadStart(file, next){
    this.props.triggerLoader(true);
    next(file);
  }


  onUploadFinish(file){
    this.props.triggerLoader(false, () => {
      const signed_url = file.signedUrl.split('?X-Amz-Expires')[0];

      var art = this.state.art;

      art['image'] = signed_url;
      
      this.setState({
        art: art
      });
    });
    
    
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
    
        <ReactS3Uploader
            signingUrl="/api/v1/s3/sign"
            accept="image/*"
            preprocess={this.onUploadStart}
            onProgress={this.onUploadProgress}
            onError={this.onUploadError}
            onFinish={this.onUploadFinish}
            server="http://localhost:3000" />
        <input type="submit" value="Create!" className='btn btn-primary' />
      </form>
    )
  }
}

export default NewArtForm
