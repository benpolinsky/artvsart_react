import React from 'react';
import {Link} from 'react-router';

const Menu = (props) => {
  return (
    <nav className='navbar'>
      <Link className="navbar-brand" to="/">AVA</Link>
      <ul className='nav navbar-nav'>
        <li className="nav-item"><Link className="nav-link" to="/competition">Competition</Link></li>
        <li className="nav-item"><Link className="nav-link" to="/about">About</Link></li>
        <li className="nav-item"><Link className="nav-link" to="/add_new_art">Add New Art</Link></li>
        <li className="nav-item"><Link className="nav-link" to="/import_art">Import Art</Link></li>
        <li className="nav-item"><Link className="nav-link" to="/results">Results</Link></li>
      </ul>
      
      <ul className="pull-right nav navbar-nav">
        <li className="navbar-brand">{props.total_art} Arts </li>
        <li className="navbar-brand">{props.total_art_judged} Arts Judged </li>
        <li className="navbar-brand">{props.finished_competitions} Battles</li>
      </ul>
    </nav>
  )
};

export default Menu