import React from 'react'
import {connect} from 'react-redux'
import {fetchUserCompetitions} from '../../actions/userCompetitions.js'



class ProfilePage extends React.Component{  
  
  componentDidMount(){
    this.props.fetchCompetitions();
  }

  render(){
    return(
      <div>
        <h2>Profile Page</h2>
        <p>Number of Competitions Judged: {this.props.competitions.length}</p>
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