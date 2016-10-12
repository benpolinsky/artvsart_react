import React from 'react'
import {connect} from 'react-redux'
import {fetchTopJudges} from '../../actions/judges.js'



class TopJudges extends React.Component{
  componentWillMount(){
    this.props = {
      ...this.props,
      judges: []
    }
  }
  
  componentDidMount(){
    this.props.fetchJudges();
  }
  
  render(){
    return(
      <div >
        <h2>Profile Page</h2>
        <p>Number of Top Judges: {this.props.judges.length}</p>
      </div>
    )
  }
}

const mapStateToProps = (store) => ({
  judges: store.judgesState.topJudges
});

const mapDispatchToProps = (dispatch) => ({
  fetchJudges(){
    dispatch(fetchTopJudges());
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(TopJudges)