import React from 'react'
import {connect} from 'react-redux'
import {fetchRankedUsers} from '../../actions/rankedUsers.js'
import {List, ListItem} from 'material-ui/List';
import Subheader from 'material-ui/Subheader';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import UserGravatar from './userGravatar';
import baseStyles from '../../styles/base.js';

class UserRankings extends React.Component{
  componentWillMount(){
    this.props.getRankedUsers();
  }
  
  render(){
    return (
      <MuiThemeProvider>
        <div style={baseStyles.container}>
          <List>
            <Subheader>Top Judges</Subheader>            
            {this.props.rankedUsers.map((user, index) => {
              return (
                <div key={index}>
                  <ListItem 
                    innerDivStyle={{paddingLeft: 16}} 
                    primaryText={`${index+1}: ${user.email}`} 
                    leftIcon={<UserGravatar hash={user.gravatar_hash} />}
                  />
                </div>
              )
            })}
          </List>
        </div>
      </MuiThemeProvider>
    )
  }
}

UserRankings.propTypes = {
  rankedUsers: React.PropTypes.array.isRequired,
  getRankedUsers: React.PropTypes.func.isRequired
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