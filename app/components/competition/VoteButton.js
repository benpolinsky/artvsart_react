import React from 'react'
import {connect} from 'react-redux'
import {selectCompetitionWinner} from '../../actions/competitions.js';
import ArtButton from '../elements/button.js';

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
  return <ArtButton 
            action={onClick} 
            label="Vote" 
            size='vote'
          />
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