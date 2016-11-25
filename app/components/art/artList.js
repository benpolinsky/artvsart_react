import React from 'react';
import Radium, {StyleRoot} from 'radium';
import {connect} from 'react-redux';
import {fetchArtCollection, fetchArt, updateArtStatus, toggleCheckedArt, toggleAllArt, updateToggledArt} from '../../actions/art.js';
import DefaultLoader from '../defaultLoader.js';
import ArtButton from '../elements/button.js';
import QuickTable from '../quickTable.js';
import ArtListStyles from '../../styles/artList.js';
import ArtSidebar from './artSidebar.js';

class ArtList extends React.Component {
  constructor(){
    super();
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
  

  updateCheckedRecords(checked, value){
    this.props.toggleArt(value);
  }
 
  render(){ 
    const disabled = !this.props.allChecked && !this.props.art.some(e => e.checked)
   
    return (
      <DefaultLoader showing={this.props.showLoader} >
        <StyleRoot>
          <div style={ArtListStyles.container}>
            <ArtSidebar />
          
            <div style={{float: 'none', clear: 'both', width: '100%'}}>
              <QuickTable 
               data={this.props.art}
               title="All Art"
               fields={['id', 'checkbox', 'edit', 'name', 'creator', 'status']}
               rowAction={this.props.showArt.bind(this, this.context.router)}
               checkAction={(e) =>this.props.toggleArt(e.target)}
               selectStatus={(id, status) => this.props.updateArtStatus(id, status)}
               toggleAll={() => this.props.toggleAll(this.props.allChecked)}
              />
            </div>
               
          </div>
        </StyleRoot>
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
  categoryCounts: state.artState.categoryCounts, 
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
