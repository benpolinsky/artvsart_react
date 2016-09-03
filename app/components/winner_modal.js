import React from 'react';

const WinnerModal = (props) => {
  return(
    <div className={`winnerModal ${props.openState}`}>
      Winner is {props.winnerName}
    </div>
  )
}

WinnerModal.propTypes = {
  openState: React.PropTypes.string.isRequired
}

export default WinnerModal