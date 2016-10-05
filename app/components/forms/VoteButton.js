import React from 'react'
import {connect} from 'react-redux'
import {selectCompetitionWinner} from '../../actions/index.js'
import RaisedButton from 'material-ui/RaisedButton';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

const VoteButton = ({onClick}) => {
  return <MuiThemeProvider><RaisedButton primary={true} onClick={onClick} label="Vote" /></MuiThemeProvider>
}


const mapDispatchToProps = (dispatch, ownProps) => ({
  onClick(e){
    e.preventDefault();
    dispatch(selectCompetitionWinner(ownProps.art_id));
  }
})

VoteButton.propTypes = {
  onClick: React.PropTypes.func.isRequired
}

export default connect(null, mapDispatchToProps)(VoteButton)