import React from 'react';
import Radium from 'radium';
import {StyleRoot} from 'radium';
import UserGravatar from './userGravatar.js';
import UserDropDown from './userDropDown.js';
import TetherComponent from 'react-tether';

class UserMenu extends React.Component {
  
  componentWillMount(){
    this.state = {
      menuOpen: false
    }
  }

  componentDidMount(){
    this.state = {
      menuOpen: false
    }
  }
  
  toggleMenu(){
    this.setState({
      menuOpen: !this.state.menuOpen
    })
  }

  render(){
    return (
        <StyleRoot>
          <div style={this.props.wrapperStyles}>
            <TetherComponent attachment='bottom left' targetOffset='7px 50px' constraints={[{
              to: 'scrollParent',
              attachment: 'together'
            }]}>
              <UserGravatar 
                hash={this.props.user.gravatar_hash} 
                size='50' 
                styles={{margin: 0}} 
                onClick={this.toggleMenu.bind(this)} 
              />
              {this.state.menuOpen && <UserDropDown user={this.props.user} closeMenu={this.toggleMenu.bind(this)} />}
            </TetherComponent>
          </div>
        </StyleRoot>

    )
  }
  
}

export default Radium(UserMenu)