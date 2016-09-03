import React from 'react';
import Menu from './components/menu';

class App extends React.Component {
  constructor(){
    super()
  }
  
  render(){
    return (
      <div>
        <h1>Art Vs Art</h1>
        <Menu />
        {this.props.children}
      </div>
    )
  }
  
}

export default App