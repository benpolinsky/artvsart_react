import React from 'react';
import {connect} from 'react-redux';
import {fetchArtCollection, fetchArt, updateArtStatus, toggleCheckedArt, toggleAllArt, updateToggledArt} from '../../actions/art.js';
import DefaultLoader from '../defaultLoader.js';
import ArtButton from '../elements/button.js';
import QuickTable from '../quickTable.js';
import Pagination from '../pagination.js';
import DropdownList from 'react-widgets/lib/DropdownList';

class ArtList extends React.Component {
  constructor(){
    super();
    this.setPage = this.setPage.bind(this);
    this.submitQuery = this.submitQuery.bind(this);
    this.clearAll = this.clearAll.bind(this);
    this.updateCheckedRecords = this.updateCheckedRecords.bind(this);
  }

  componentWillMount(){
    this.props.getAllArt(this.props.location.query.page, this.props.location.query.search);
    this.setState({
      search: this.props.search,
      updating: false
    })
  }
  
  componentWillReceiveProps(nextProps){
   
    if (nextProps == this.props) {
      return false
    }
    
    const locationQuery = nextProps.location.query;
    if ( locationQuery != this.props.location.query ) {
      this.props.getAllArt(locationQuery.page, locationQuery.search)
    }
  }
  
  setPage(page){
    if (this.state.search) {
      this.context.router.push(`/art?page=${page}&search=${this.state.search}`);
    } else {
      this.context.router.push(`/art?page=${page}`);
    }
    
  }
  
  submitQuery(){
    if (this.state.search.length > 0) {
      this.context.router.push(`/art?search=${this.state.search}`);      
    }
  }
  
  clearAll(){
    this.context.router.push(`/art`);
  }
  
  updateCheckedRecords(checked, value){
    this.props.toggleArt(value);
  }
 
  render(){ 
    return (
      <DefaultLoader showing={this.props.showLoader}>
     <div style={{display: 'flex', flexDirection: 'row-reverse'}}>
         <div style={{float: 'none', clear: 'both', width: 300, margin: '50px 20px 0 50px'}}>
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
           
         </div>
       
     
           <div style={{float: 'none', clear: 'both'}}>
             <QuickTable 
               data={this.props.art}
               title="All Art"
               fields={['checkbox', 'edit', 'id', 'name', 'creator', 'status', 'creation_date']}
               rowAction={this.props.showArt.bind(this, this.context.router)}
               checkAction={(e) =>this.props.toggleArt(e.target)}
               selectStatus={(id, status) => this.props.updateArtStatus(id, status)}
               toggleAll={() => this.props.toggleAll(this.props.allChecked)}
             />
           </div>
        </div>
      </DefaultLoader>
    )
  
  }
}

ArtList.contextTypes = {
  router: React.PropTypes.object
}

const mapStateToProps = (state) => ({
  art: state.artState.allArt,
  showLoader: state.artState.fetching,
  pages: state.artState.pages,
  search: state.artState.search,
  allChecked: state.artState.allChecked
});


const mapDispatchToProps = (dispatch) => ({
  getAllArt(page=null, query=null){
    dispatch(fetchArtCollection(page, query));
  },
  showArt(router, id){
    router.push(`art/${id}`)
  },
  updateArtStatus(id, status){
    dispatch(updateArtStatus(id, status));
  },
  toggleArt(target){
    dispatch(toggleCheckedArt(target.value, target.dataset.index))
  },
  toggleAll(checked){
    dispatch(toggleAllArt(checked));
  },
  toggleSelectedStatus(art_ids, status){
    dispatch(updateToggledArt(art_ids, status));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(ArtList);
