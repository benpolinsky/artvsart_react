import React from 'react';
import Radium, {StyleRoot} from 'radium';
import MyOverlay from '../myOverlay.js';
import Styles from './slideInViewStyles.js';
import fixedBody from '../../utils/fixedBody.js';


class SlideInView extends React.Component{
  static defaultProps = {
    show: false
  }
  
  static propTypes = {
    show: React.PropTypes.bool.isRequired,
  }
  
  componentWillReceiveProps(nextProps){
    if (nextProps == this.props) {
      return false
    }
    
    if (nextProps.show) {
      fixedBody.fix();
    } else {
      fixedBody.unFix();
    }
  }
  
  showStyles(){ 
    return {
      display: this.props.show ? 'block' : 'none'
    } 
  }
  
  render(){
    return (
      <StyleRoot>
        <div>
          <MyOverlay show={this.props.show ? 'show' : ''} close={() => {return false}}/>
          <div style={{...Styles.container, ...this.showStyles()}}>
            {this.props.children}
          </div>
        </div>
        
      </StyleRoot>
    )
  }
}



export default Radium(SlideInView)