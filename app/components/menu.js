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
      menu: 'email',
      admin: "addNewArt"
    }
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
    case 'addNewArt':
      this.context.router.push(`/add_new_art`);
      break;
    case 'importArt':
      this.context.router.push(`/import_art`);
      break;      
    }
  }
  
  selectAdminItem = (event, index, value) => {
    switch (value) {
    
    }
  }

  render(){
    const totals = this.props.totals;
    const user_type = this.props.user.type;
    const user_email = this.props.user.email
    return (
      <nav className="mainMenu">
        <ul>
          <Link to="/">AVA</Link>
    
          <li><Link to="/competition">Competition</Link></li>
          <li><Link to="/about">About</Link></li>
          <li><Link to="/leader_board">Leader Board</Link></li>
          <li><Link to="/top_judges">Top Judges</Link></li>
    
          {user_type == "GuestUser" &&
           <ul className='nav navbar-nav'> 
            <li className="nav-item">
              <Link className="nav-link" to="/sign_up">Register</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/sign_in">Sign In</Link>
            </li>
           </ul>}
           
           {user_type == "admin" &&
             <MuiThemeProvider>  
               <DropDownMenu onChange={this.selectMenuItem} value={this.state.menu}>
                  <MenuItem value='email' primaryText={`${user_email}`} />
                  <MenuItem value='profile' primaryText="Your Profile" />
                  <MenuItem value='sign_out' primaryText="Sign Out" />
                 <MenuItem value='addNewArt' primaryText='Add New Art' />
                 <MenuItem value='importArt' primaryText="Import Art" />
               </DropDownMenu>
             </MuiThemeProvider>
         }

          {user_type == null &&
            <MuiThemeProvider>  
              <DropDownMenu onChange={this.selectMenuItem} value={this.state.menu} labelStyle={{color: 'white'}} >
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