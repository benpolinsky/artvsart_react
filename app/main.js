import 'babel-polyfill';
import injectTapEventPlugin from 'react-tap-event-plugin';
import React from 'react';
import ReactDOM from 'react-dom';
import {Router, IndexRoute, Route, browserHistory} from 'react-router';
import { Provider } from 'react-redux';
import store from './store.js';
import App from './app.js';
import HomeContainer from './components/containers/home_container.js'
import CompetitionContainer from './components/containers/competition_container.js'
import AboutContainer from './components/containers/about_container.js'
import NewArtFormContainer from './components/containers/new_art_form_container.js'
import ArtContainer from './components/containers/art_container.js'
import ImportArtFormContainer from './components/containers/import_art_form_container.js'
import ResultsContainer from './components/containers/results_container.js'
import SignUpForm from './components/forms/sign_up_form'
import SignInForm from './components/forms/sign_in_form'
import ProfilePage from './components/containers/profile_page'
import TopJudges from './components/containers/top_judges'
require('../style.css');

// Needed for onTouchTap
// http://stackoverflow.com/a/34015469/988941
injectTapEventPlugin();


ReactDOM.render(
<Provider store={store}>
 
  <Router history={browserHistory}>
    <Route path='/' component={App}>
      <IndexRoute component={HomeContainer} />
      <Route path='competition' component={CompetitionContainer} />
      <Route path='add_new_art' component={NewArtFormContainer} />
      <Route path='import_art' component={ImportArtFormContainer} />
      <Route path='about' component={AboutContainer} />
      <Route path='art/:id' component={ArtContainer} />
      <Route path='results' component={ResultsContainer} />
      <Route path='sign_up' component={SignUpForm} />
      <Route path='sign_in' component={SignInForm} />
      <Route path='profile' component={ProfilePage} />
      <Route path='top_judges' component={TopJudges} />
    </Route>
  </Router>

</Provider>,
  document.getElementById('app')
);
