import React from 'react';
import Radium from 'radium';
import {StyleRoot} from 'radium';
import UserGravatar from './userGravatar.js';
import UserDropDown from './userDropDown.js';
import TetherComponent from 'react-tether';
import onClickOutside from 'react-onclickoutside'

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
    !this.state.menuOpen ? this.props.enableOnClickOutside() : this.props.disableOnClickOutside()
    this.setState({
      menuOpen: !this.state.menuOpen
    })

  }
  
  handleClickOutside(evt){
    
    const clickOnMenu = evt.path.some((e) => {
      return e.classList && [...e.classList].includes('tether-element');
    });
    
    if (this.state.menuOpen && !clickOnMenu){
      this.toggleMenu()
    }
  }
  
  render(){
    return (
        <StyleRoot>
          <div style={this.props.wrapperStyles}>
            <TetherComponent attachment='bottom right' targetOffset='7px 50px' constraints={[{
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

export default Radium(onClickOutside(UserMenu))