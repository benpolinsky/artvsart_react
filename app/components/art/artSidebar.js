import React from 'react';
import Radium, {StyleRoot} from 'radium';
import {connect} from 'react-redux';
import ArtListStyles from '../../styles/artList.js';
import Pagination from '../pagination.js';
import ArtCounts from './artCounts.js';
import ArtButton from '../elements/button.js';
import {updateToggledArt} from '../../actions/art.js';
import DropdownList from 'react-widgets/lib/DropdownList';

class ArtSidebar extends React.Component {

  constructor(){
    super();
    this.setPage = this.setPage.bind(this);
    this.submitQuery = this.submitQuery.bind(this);
    this.clearAll = this.clearAll.bind(this);
  }
  
  componentWillMount(){
    this.setState({
      search: this.props.search
    })
  }
  
  
  submitQuery(){
    if (this.state.search.length > 0) {
      this.context.router.push(`/art?search=${this.state.search}`);      
    }
  }
  
  setPage(page){
    if (this.state.search) {
      this.context.router.push(`/art?page=${page}&search=${this.state.search}`);
    } else {
      this.context.router.push(`/art?page=${page}`);
    }
    
  }
  
 
  clearAll(){
    this.context.router.push(`/art`);
  }
  
  
  render(){
    return(
      <StyleRoot>
      <div style={ArtListStyles.aux}>
        <Pagination action={this.setPage} pages={this.props.pages}/>
        <input placeholder="Search" style={{width: 256, margin: '10px auto', display: 'block'}} type='search' value={this.state.search} onChange={(e) => this.setState({search: e.target.value})}/>
        <ArtButton label="Search" action={this.submitQuery} />
        <ArtButton label="Clear" action={this.clearAll} />
        <DropdownList
         style={{width: 256, margin: '0 auto'}}
         placeholder="Change Checked Status"
         data={['pending_review', 'published', 'declined']} 
         name="toggled_art_status"
         disabled={!this.props.allChecked && !this.props.art.some(e => e.checked)}
         onSelect={(status) => this.props.toggleSelectedStatus(this.props.art.filter(a => a.checked).map(a => a.id), status)} />
         <ArtCounts totalCount={this.props.pages.total_count} categories={this.props.categoryCounts}/>
      </div>
       </StyleRoot>
       )
  }
}


ArtSidebar.contextTypes = {
  router: React.PropTypes.object
}

const mapStateToProps = (state) => ({
  art: state.artState.allArt,
  pages: state.artState.pages,
  search: state.artState.search,
  categoryCounts: state.artState.categoryCounts, 
  allChecked: state.artState.allChecked
});


const mapDispatchToProps = (dispatch) => ({
  toggleSelectedStatus(art_ids, status){
    dispatch(updateToggledArt(art_ids, status));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(Radium(ArtSidebar));