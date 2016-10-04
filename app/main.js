import 'babel-polyfill';
import injectTapEventPlugin from 'react-tap-event-plugin';
import React from 'react';
import ReactDOM from 'react-dom';
import {Router, IndexRoute, Route, browserHistory} from 'react-router';
import { Provider } from 'react-redux';
import store from './store.js';
import App from './app.js';
import requireAuthentication from './authWrapper.js'
import HomeContainer from './components/containers/homeContainer.js'
import CompetitionContainer from './components/containers/competitionContainer.js'
import AboutContainer from './components/containers/aboutContainer.js'
import NewArtFormContainer from './components/containers/newArtFormContainer.js'
import ArtContainer from './components/containers/artContainer.js'
import ImportArtFormContainer from './components/containers/importArtFormContainer.js'
import LeaderBoard from './components/leaderBoard.js'
import SignUpForm from './components/forms/signUpForm.js'
import SignInForm from './components/forms/signInForm.js'
import ProfilePage from './components/containers/profilePage.js'
import TopJudges from './components/containers/topJudges.js'
require('../style.css');

// Needed for onTouchTap
// http://stackoverflow.com/a/34015469/988941
injectTapEventPlugin();

ReactDOM.render(
<Provider store={store}>
 
  <Router history={browserHistory}>
    <Route path='/' component={requireAuthentication(App)}>
      <IndexRoute component={HomeContainer} />
      <Route path='competition' component={CompetitionContainer} />
      <Route path='add_new_art' component={NewArtFormContainer} />
      <Route path='import_art' component={ImportArtFormContainer} />
      <Route path='about' component={AboutContainer} />
      <Route path='art/:id' component={ArtContainer} />
      <Route path='leader_board' component={LeaderBoard} />
      <Route path='sign_up' component={SignUpForm} />
      <Route path='sign_in' component={SignInForm} />
      <Route path='profile' component={ProfilePage} />
      <Route path='top_judges' component={TopJudges} />
    </Route>
  </Router>

</Provider>,
  document.getElementById('app')
);
