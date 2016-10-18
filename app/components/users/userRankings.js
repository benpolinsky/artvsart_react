import React from 'react'
import {connect} from 'react-redux'
import {fetchRankedUsers} from '../../actions/rankedUsers.js'
import {List, ListItem} from 'material-ui/List';
import Subheader from 'material-ui/Subheader';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import UserGravatar from './userGravatar';

class UserRankings extends React.Component{
  componentWillMount(){
    this.props.getRankedUsers();
  }
  
  render(){
    return (
      <MuiThemeProvider>
        <div className="container">
          <List>
            <Subheader>User Rankings</Subheader>            
            {this.props.rankedUsers.map((user, index) => {
              return <div key={index} >{index+1}.<ListItem innerDivStyle={{paddingLeft: 16}} primaryText={user.email} leftIcon={<UserGravatar hash={user.gravatar_hash} />}/></div>
            })}
          </List>
        </div>
      </MuiThemeProvider>
    )
  }
}


const mapStateToProps = (state) => ({
  rankedUsers: state.rankedUsers.users
});

const mapDispatchToProps = (dispatch) => ({
  getRankedUsers(){
    dispatch(fetchRankedUsers())
  }
});


export default connect(mapStateToProps, mapDispatchToProps)(UserRankings)