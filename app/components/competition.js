import React from 'react';
import Loader from 'react-loader-advanced';
import Art from './art.js';
import ArtShareButtons from './art_share_buttons.js';


const spinner = <span className="fa-spinner fa"></span>;

export const Competition = ({loading, competition, selectWinner, share_title}) => {
  return (
    <div className='competition'>
      <Loader foregroundStyle={{foregroundColor: 'black'}} backgroundStyle={{backgroundColor: 'transparent'}} show={loading} message={spinner}  >
        <Art key={competition.art.id} art={competition.art} selectWinner={selectWinner}/>
        <Art key={competition.challenger.id} art={competition.challenger} selectWinner={selectWinner}/>

        <div className='share-buttons'>
          <p>Share This Battle!</p>
          <ArtShareButtons className="competition-share" share_title={share_title}/>
        </div>
      </Loader>
    </div>
  )
}
