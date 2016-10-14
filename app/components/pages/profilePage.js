import React from 'react'
import {connect} from 'react-redux'
import {fetchUserCompetitions} from '../../actions/userCompetitions.js'



class ProfilePage extends React.Component{  
  
  componentDidMount(){
    this.props.fetchCompetitions();
  }

  render(){
    return(
      <div className='centered-page'>
        <h1 className='mainTitle'>Profile Page</h1>
        <p>Number of Competitions Judged: {this.props.competitions.userCompetitions}</p>  
      </div>
    )
  }
}

const mapStateToProps = (store) => ({
  competitions: store.userCompetitionsState
});

const mapDispatchToProps = (dispatch) => ({
  fetchCompetitions(){
    dispatch(fetchUserCompetitions());
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(ProfilePage)