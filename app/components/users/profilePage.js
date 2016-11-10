import React from 'react'
import {connect} from 'react-redux'
import {fetchUserCompetitions} from '../../actions/userCompetitions.js'
import {updateUserEmail, updateUserPassword, deleteCurrentUser} from '../../actions/userProfile.js'

import ProfileForm from './profileForm.js'
import PasswordForm from './passwordForm.js'
import SocialMediaIdentities from './socialMediaIdentities.js'
import UserGravatar from '../users/userGravatar.js'
import baseStyles from '../../styles/base.js';

import {userGreeting} from  '../../utils/users.js'

import Dialog from 'material-ui/Dialog';
import Divider from 'material-ui/Divider';
import FlatButton from 'material-ui/FlatButton';
import {List, ListItem} from 'material-ui/List';
import {Tabs, Tab} from 'material-ui/Tabs';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';



class ProfilePage extends React.Component{  
  constructor(){
    super();
    this.triggerDeleteModal = this.triggerDeleteModal.bind(this);
  }
  
  componentWillMount(){
    this.state = {
      showModal: false
    }
  }
  
  componentDidMount(){
    // this has to move to a HOC wrapper component
    if (this.props.user.type == "GuestUser" || this.props.user.type == "BotUser") {
      const router = this.context.router;
      router.push('/competition')
    }
    this.props.fetchCompetitions();
  }
  
  triggerDeleteModal(e, show=true){
    this.setState({
      showModal: show
    })
  }

  render(){
    const profileStyles = {
      h1: {
        fontSize: 20,
        marginBottom: 10,     
      }
    }
    
    const deleteUserActions = [
      <FlatButton label="Yes, really delete me." 
        onTouchTap={this.props.deleteUser.bind(this, this.context.router)} />,
      <FlatButton label="No, No, No, No! I want to livvveee." 
        onTouchTap={this.triggerDeleteModal.bind(this, 'e', false)}
        />
    ]
    
    return(
        <MuiThemeProvider>
          <div style={baseStyles.container}>

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
                <FlatButton backgroundColor='lightgrey' hoverColor='#fc8181' style={{margin: "10px auto", display: "block"}} label="Delete Art Vs Art Account" onTouchTap={this.triggerDeleteModal} />
              </Tab>
           </Tabs>
    
            <Dialog title="Are you sure??" actions={deleteUserActions} modal open={this.state.showModal}>
              Really delete you from this the Art Vs. Art world?  <br/>
              You can never come back.  (that's a lie...)
            </Dialog>
    
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
  deleteUser(router){
    dispatch(deleteCurrentUser(router));
  },
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