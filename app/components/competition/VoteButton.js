import React from 'react'
import {connect} from 'react-redux'
import {selectCompetitionWinner} from '../../actions/index.js'
import RaisedButton from 'material-ui/RaisedButton';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';




const labelStyle = {
  fontSize: 21,
  fontWeight: 400,
  textTransform: 'lowercase'
}

const mainStyles = {
  margin: '40px auto 80px auto',
  display: 'block',
  boxShadow: 'none',
  border: '2px solid black',
  width: 256,
  borderRadius: 0
}

const VoteButton = ({onClick, styles}) => {
  return <MuiThemeProvider>
            <RaisedButton 
              backgroundColor="white" 
              labelStyle={labelStyle}
              labelColor="black" 
              onTouchTap={onClick} 
              label="Vote" 
              style={mainStyles}
              className="voteButton"
            />
         </MuiThemeProvider>
}


const mapDispatchToProps = (dispatch, ownProps) => ({
  onClick(e){
    e.preventDefault();
    dispatch(selectCompetitionWinner(ownProps.art_id));
  }
})

VoteButton.propTypes = {
  onClick: React.PropTypes.func.isRequired,
  styles: React.PropTypes.object
}

export default connect(null, mapDispatchToProps)(VoteButton)