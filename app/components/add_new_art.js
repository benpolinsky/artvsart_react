import React from 'react';

class AddNewArt extends React.Component {
  
  transition(){
    console.log('time to transition');
  }
  
  render(){
    return (
      <div className='AddNewArt'>
        Here's where you'll enter new art.
        <br/>
        <button className='btn-primary btn' onClick={this.transition}>Transition</button>
      </div>
    )
  }
}

export default AddNewArt