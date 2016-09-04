import React from 'react';
import {Link} from 'react-router';

const Menu = () => {
  return (
    <ul>
      <li><Link to="/">Home</Link></li>
      <li><Link to="/home">Competition</Link></li>
      <li><Link to="/about">About</Link></li>
      <li><Link to="/add_new_art">Add New Art</Link></li>
    </ul>
  )
};

export default Menu