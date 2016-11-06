import React from 'react'
import {connect} from 'react-redux'
import {fetchUserCompetitions} from '../../actions/userCompetitions.js'
import {updateUserEmail, updateUserPassword} from '../../actions/userProfile.js'

import ProfileForm from './profileForm.js'
import PasswordForm from './passwordForm.js'
import SocialMediaIdentities from './socialMediaIdentities.js'
import UserGravatar from '../users/userGravatar.js'
import baseStyles from '../../styles/base.js';

import {userGreeting} from  '../../utils/users.js'

import Divider from 'material-ui/Divider';
import {List, ListItem} from 'material-ui/List';
import {Tabs, Tab} from 'material-ui/Tabs';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';



class ProfilePage extends React.Component{  
  
  componentDidMount(){
    if (this.props.user.type == "GuestUser" || this.props.user.type == "BotUser") {
      const router = this.context.router;
      router.push('/competition')
    }
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
           <Tabs tabItemContainerStyle={{backgroundColor: '#d6d5d5'}} inkBarStyle={{backgroundColor: 'black'}} >
              <Tab style={{color: 'black'}} label="Stats">
                <List>
                  <ListItem innerDivStyle={{paddingLeft: 16}} primaryText={userGreeting(this.props.user)} leftIcon={<UserGravatar hash={this.props.user.gravatar_hash} />} />
                  <Divider / >
                  <ListItem primaryText={`You've judged ${this.props.competitions.userCompetitions} competitions.`} />
                </List>
              </Tab>
    
              <Tab style={{color: 'black'}} label="Account Info">
                <ProfileForm initialValues={this.props.user} formAction={this.props.updateProfileForm} user={this.props.user} />
                <PasswordForm formAction={this.props.updatePassword} user={this.props.user}/>
                <SocialMediaIdentities user={this.props.user} />
              </Tab>
           </Tabs>
            
        
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

ProfilePage.contextTypes = {
  router: React.PropTypes.object
}

const mapStateToProps = (store) => ({
  competitions: store.userCompetitionsState,
  user: store.userState.user
});

const mapDispatchToProps = (dispatch) => ({
  fetchCompetitions(){
    dispatch(fetchUserCompetitions());
  },
  updateProfileForm(data){
    dispatch(updateUserEmail(data));
  },
  updatePassword(data){
    dispatch(updateUserPassword(data));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(ProfilePage)