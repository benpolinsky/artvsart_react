import React from 'react';

class App extends React.Component{
  constructor(){
    super();
    
    this.state = {
      txt: "this is the txt state",
      cat: 0
    }
    
    this.update = this.update.bind(this);
  }
  
  update(e){
    this.setState({txt: e.target.value})
  }
  
  render(){
    let text = this.state.txt;
    let category_id = "category_" + this.state.category_id;
    
    return (
      <div>
        <Widget txt={this.state.txt} category_id={this.state.category_id} update={this.update} />
        <Widget txt={this.state.txt} category_id={this.state.category_id} update={this.update} />
        <Widget txt={this.state.txt} category_id={this.state.category_id} update={this.update} />
        <Widget txt={this.state.txt} category_id={this.state.category_id} update={this.update} />
      </div>
    )
  }
}

// App.propTypes = {
//   txt: React.PropTypes.string,
//   category_id: React.PropTypes.number.isRequired
// }
//
// App.defaultProps = {
//   txt: "This is the default!"
// }

const Widget = (props) => {
  return (
    <div>
      <input type='text' onChange={props.update} />
      <h1 id={props.category_id}>{props.txt}</h1> 
    </div>
  ) 
}


export default App