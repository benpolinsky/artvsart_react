import React from 'react';

class Art extends React.Component {
  constructor(props){
    super(props);
    this.name = this.props.name;
    this.id = this.props.id;
    this.selected = this.selected.bind(this);

  }
  
  selected(props){
    this.props.selectWinner(this.id);
  } 
   
  render(){
    return (
      <div className='art'>
        <img src='http://placehold.it/250x250' />
        <h2>{this.props.name}</h2>
        <div className="art-description">{this.props.description}</div>
        <VoteButton selected={this.selected}/>
      </div>
    )
  }
}

Art.propTypes = {
  name: React.PropTypes.string.isRequired,
  description: React.PropTypes.string.isRequired
}


class VoteButton extends React.Component {
  render() {
    return (
      <a className="btn btn-primary vote-btn" href='#' onClick={this.props.selected}>Vote</a>
    )
  }
}
export default Art