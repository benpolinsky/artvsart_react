import React from 'react';

import {Link} from 'react-router';
import {Router} from 'react-router';
import {connect} from 'react-redux';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';
import {signOutUser} from '../actions/userAuth.js'

class Menu extends React.Component{
  constructor(){
    super();
  }
  
  componentWillMount(){
    this.state = {
      menu: 'email'
    }
  }
  
  componentDidMount(){
    this.setState({
      menu: 'email'
    })
  }
  
  selectMenuItem = (event, index, value) => {
    switch (value) {
    case 'profile':
      this.context.router.push(`/profile`);
      break;
    case 'sign_out':
      this.setState({menu: "Signing Out..."})
      this.props.signOutUser(this.context.router)
      break;      
    }
  }

  render(){
    const totals = this.props.totals;
    const user_type = this.props.user.type;
    const user_email = this.props.user.email
    return (
      <nav className='navbar'>
        <Link className="navbar-brand" to="/">AVA</Link>
        <ul className='nav navbar-nav'>
          <li className="nav-item"><Link className="nav-link" to="/competition">Competition</Link></li>
          <li className="nav-item"><Link className="nav-link" to="/about">About</Link></li>
          <li className="nav-item"><Link className="nav-link" to="/add_new_art">Add New Art</Link></li>
          <li className="nav-item"><Link className="nav-link" to="/import_art">Import Art</Link></li>
          <li className="nav-item"><Link className="nav-link" to="/leader_board">Leader Board</Link></li>
          <li className="nav-item"><Link className="nav-link" to="/top_judges">Top Judges</Link></li>
          {user_type== "GuestUser" &&
           <ul className='nav navbar-nav'> 
            <li className="nav-item">
              <Link className="nav-link" to="/sign_up">Register</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/sign_in">Sign In</Link>
            </li>
           </ul>}

          {user_type != "GuestUser" &&
            <MuiThemeProvider>  
              <DropDownMenu onChange={this.selectMenuItem} value={this.state.menu}>
                <MenuItem value='email' primaryText={`${user_email}`} />
                <MenuItem value='profile' primaryText="Your Profile" />
                <MenuItem value='sign_out' primaryText="Sign Out" />
              </DropDownMenu>
            </MuiThemeProvider>}

        </ul>
  
        <ul className="pull-right nav navbar-nav">
          <li className="navbar-brand">{totals.total_art} Arts </li>
          <li className="navbar-brand">{totals.total_art_judged} Arts Judged </li>
          <li className="navbar-brand">{totals.finished_competitions} Battles</li>
        </ul>
          
       
      </nav>
    )
  }
  
};

Menu.contextTypes = {
  router: React.PropTypes.object
}

const mapDispatchToProps = (dispatch) => ({
  signOutUser(router){
    dispatch(signOutUser(router));
  }
})



export default connect(null, mapDispatchToProps)(Menu);