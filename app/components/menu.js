import React from 'react';
import {Link} from 'react-router';

class Menu extends React.Component {
  render(){
    return (
      <ul>
        <li><Link to="/competition">Competition</Link></li>
        <li><Link to="/about">About</Link></li>
      </ul>
    )
  }
}

export default Menu