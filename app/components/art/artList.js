import React from 'react';
import {connect} from 'react-redux';
import {fetchAllArt, fetchArt} from '../../actions/art.js';
import DefaultLoader from '../defaultLoader.js';
import QuickTable from '../quickTable.js';
import Pagination from '../pagination.js';


class ArtList extends React.Component {
  constructor(){
    super();
    this.setPage = this.setPage.bind(this);
  }

  componentWillMount(){
    this.props.getAllArt(this.props.location.query.page);
  }
  
  setPage(page){
    this.context.router.push(`/art?page=${page}`)
    page != this.props.location.query.page && this.props.getAllArt(page)
  }
  
  render(){ 
    return (
      <DefaultLoader showing={this.props.showLoader}>
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
  pages: state.artState.pages
});


const mapDispatchToProps = (dispatch) => ({
  getAllArt(page=null){
    dispatch(fetchAllArt(page));
  },
  showArt(router, id){
    router.push(`art/${id}`)
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(ArtList);
