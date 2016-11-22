import React from 'react';
import {Link} from 'react-router';
import Styles from '../../styles/base.js';

class PendingConfirmation extends React.Component{
  render(){
    return(
      <div style={{...Styles.centeredPage, textAlign: 'center'}}>
        <h1 style={Styles.subheader}>Thanks!</h1>
        <p>We've sent an email to the address specified.  You'll find a link to confirm your account there.</p>
        <br/>
        <Link to={'/competition'}>Or judge a few more competitions right now...</Link>
      </div>
    )
  }
}

export default PendingConfirmation