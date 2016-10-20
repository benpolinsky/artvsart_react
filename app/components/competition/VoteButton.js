import React from 'react'
import {connect} from 'react-redux'
import {selectCompetitionWinner} from '../../actions/index.js'
import RaisedButton from 'material-ui/RaisedButton';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';




const labelStyle = {
  fontSize: 21,
  fontWeight: 700
}

const mainStyles = {
  margin: '0 auto',
  display: 'block'
}

const VoteButton = ({onClick, styles}) => {
  return <MuiThemeProvider>
            <RaisedButton 
              backgroundColor="black" 
              labelStyle={labelStyle}
              labelColor="white" 
              onClick={onClick} 
              label="Vote" 
              style={mainStyles}
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