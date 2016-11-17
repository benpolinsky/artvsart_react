import React from 'react';
import ArtButton from './elements/button.js';
import _ from 'lodash';

class BPPagination extends React.Component{  
  pagesComponents(){
    const currentStyle = {background: 'black', color: 'white'};
    return _.range(2, this.props.pages.total_pages).map((page, index) => {
      var styles;
      styles = {float: 'left', clear: 'none'};
      if (this.props.pages.current_page == page) {

        styles = {...styles, ...currentStyle } 
      }
      return <ArtButton styles={styles} key={index} label={page} kind="small" action={this.props.action.bind(this, page)} />;
    })    
  }
  
  render(){
    const {first_page, last_page, current_page, total_pages} = this.props.pages;
    const baseStyle = {float: 'left', clear: 'none'};
    const currentStyle = {background: 'black', color: 'white'};
    const firstStyle =  first_page ? {...baseStyle, ...currentStyle} : baseStyle;
    const lastStyle = last_page ? {...baseStyle, ...currentStyle} : baseStyle;
    
    return(
      total_pages > 1 && 
      <div style={{width: 'auto', clear: 'both', float: 'none', display: 'block', width: (20*(total_pages+2)), margin: 10}}>
        {!first_page && <ArtButton styles={{...baseStyle}} label='<' action={this.props.action.bind(this, current_page - 1)} kind="small" />}
        {<ArtButton styles={firstStyle} label='1' action={this.props.action.bind(this, 1)} kind="small" />}
        {this.pagesComponents()}
        <ArtButton styles={lastStyle} label={total_pages} action={this.props.action.bind(this, total_pages)}  kind="small" />
        {!last_page &&  <ArtButton styles={{...baseStyle}} label='>' action={this.props.action.bind(this, current_page + 1)} kind="small" />}
      </div>
    )
  }
}


export default BPPagination