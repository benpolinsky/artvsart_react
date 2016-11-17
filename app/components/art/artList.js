import React from 'react';
import {connect} from 'react-redux';
import {fetchArtCollection, fetchArt} from '../../actions/art.js';
import DefaultLoader from '../defaultLoader.js';
import ArtButton from '../elements/button.js';
import QuickTable from '../quickTable.js';
import Pagination from '../pagination.js';


class ArtList extends React.Component {
  constructor(){
    super();
    this.setPage = this.setPage.bind(this);
    this.submitQuery = this.submitQuery.bind(this);
    this.clearAll = this.clearAll.bind(this);
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
    
    console.log(this.props, nextProps)
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
    
    // this.setState({updating: false})
    // page != this.props.location.query.page && this.props.getAllArt(page)
  }
  
  submitQuery(){
    if (this.state.search.length > 0) {
      this.context.router.push(`/art?search=${this.state.search}`);      
    }
  }
  
  clearAll(){
    this.context.router.push(`/art`);
  }
  
  render(){ 
    return (
      <DefaultLoader showing={this.props.showLoader}>
     
        <div style={{float: 'none', clear: 'both', width: 300}}>
          <input placeholder="Search" style={{width: 256, margin: '10px auto', display: 'block'}} type='search' value={this.state.search} onChange={(e) => this.setState({search: e.target.value})}/>
          <ArtButton label="Search" action={this.submitQuery} />
          <ArtButton label="Clear" action={this.clearAll} />
        </div>
        <Pagination action={this.setPage} pages={this.props.pages}/>
    
          <div style={{float: 'none', clear: 'both'}}>
            <QuickTable 
              data={this.props.art}
              title="All Art"
              fields={['id', 'name', 'creator', 'status', 'date']}
              rowAction={this.props.showArt.bind(this, this.context.router)}
            />
        </div>
        <Pagination action={this.setPage} pages={this.props.pages}/>
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
  search: state.artState.search
});


const mapDispatchToProps = (dispatch) => ({
  getAllArt(page=null, query=null){
    dispatch(fetchArtCollection(page, query));
  },
  showArt(router, id){
    router.push(`art/${id}`)
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(ArtList);
