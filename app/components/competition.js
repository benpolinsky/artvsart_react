import React from 'react';
import Loader from 'react-loader-advanced';
import Art from './art.js';
import ArtShareButtons from './art_share_buttons.js';
const spinner = <span className="fa-spinner fa"></span>;


export const Competition = ({loading, share_title}, {store}) => {
  const competition = store.getState().competitionState.competition;
  return (
    <div className='competition'>
      <Loader foregroundStyle={{foregroundColor: 'black'}} backgroundStyle={{backgroundColor: 'transparent'}} show={loading} message={spinner}  >
        <Art key={competition.art.id} art={competition.art} />
        <Art key={competition.challenger.id} art={competition.challenger} />

        <div className='share-buttons'>
          <p>Share This Battle!</p>
          <ArtShareButtons className="competition-share" share_title={share_title}/>
        </div>
      </Loader>
    </div>
  )
}

Competition.contextTypes = {
  store: React.PropTypes.object
}
