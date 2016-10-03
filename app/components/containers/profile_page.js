import React from 'react'
import {connect} from 'react-redux'
import {fetchUserCompetitions} from '../../actions/user_competitions.js'



class ProfilePage extends React.Component{  
  
  componentDidMount(){
    this.props.fetchCompetitions();
  }

  render(){
    return(
      <div className='col-xs-12'>
        <div className='col-xs-12 panel'>
          <h2>Profile Page</h2>
          <p>Number of Competitions Judged: {this.props.competitions.length}</p>
        </div>
        
      </div>
    )
  }
}

const mapStateToProps = (store) => ({
  competitions: store.userCompetitionsState.userCompetitions
});

const mapDispatchToProps = (dispatch) => ({
  fetchCompetitions(){
    dispatch(fetchUserCompetitions());
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(ProfilePage)