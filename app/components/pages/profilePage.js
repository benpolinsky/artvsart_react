import React from 'react'
import {connect} from 'react-redux'
import {fetchUserCompetitions} from '../../actions/userCompetitions.js'
import UserGravatar from '../users/userGravatar.js'
import {userGreeting} from  '../../utils/users.js'
import Divider from 'material-ui/Divider';
import {List, ListItem} from 'material-ui/List';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import baseStyles from '../../styles/base.js';

class ProfilePage extends React.Component{  
  
  componentDidMount(){
    // should probably be fetching user data, huh...
    this.props.fetchCompetitions();
  }

  render(){
    const profileStyles = {
      h1: {
        fontSize: 20,
        marginBottom: 10,
        
      }
    }
    return(
        <MuiThemeProvider>
          <div className={baseStyles.container}>
           <h1 style={baseStyles.mainTitle}>Profile</h1>
            <List>
              <ListItem innerDivStyle={{paddingLeft: 16}} primaryText={userGreeting(this.props.user)} leftIcon={<UserGravatar hash={this.props.user.gravatar_hash} />} />
              <Divider / >
              <ListItem primaryText={`You've judged ${this.props.competitions.userCompetitions} competitions.`} />
            </List>
        
          </div>
       </MuiThemeProvider>
    )
  }
}

ProfilePage.propTypes = {
  user: React.PropTypes.object.isRequired,
  fetchCompetitions: React.PropTypes.func.isRequired,
  competitions: React.PropTypes.object.isRequired
}

const mapStateToProps = (store) => ({
  competitions: store.userCompetitionsState,
  user: store.userState.user
});

const mapDispatchToProps = (dispatch) => ({
  fetchCompetitions(){
    dispatch(fetchUserCompetitions());
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(ProfilePage)