import 'babel-polyfill';
import injectTapEventPlugin from 'react-tap-event-plugin';
import React from 'react';
import ReactDOM from 'react-dom';
import {Router, IndexRoute, Route, browserHistory} from 'react-router';
import { Provider } from 'react-redux';
import store from './store.js';
import App from './components/app.js';
import requireAuthentication from './components/authWrapper.js'

import HomePage from './components/pages/homePage.js'
import AboutPage from './components/pages/aboutPage.js'
import ProfilePage from './components/pages/profilePage.js'

import CompetitionContainer from './components/competition/competitionContainer.js'
import CompetitionResultContainer from './components/competition/competitionResultContainer.js'

import ArtFormContainer from './components/art/artFormContainer.js'
import ArtContainer from './components/art/artContainer.js'
import ImportArtFormContainer from './components/art/importArtFormContainer.js'
import LeaderBoard from './components/leaderBoard.js'

import CategoriesList from './components/categories/categoriesList.js'
import CategoryFormContainer from './components/categories/categoryFormContainer.js'
import EditCategoryFormContainer from './components/categories/editCategoryFormContainer.js'
import ShowCategory from './components/categories/showCategory.js'

import UserRankings from './components/users/userRankings.js'

const styles = [
  'reset', 
  'base'
];

for (let style in styles) {
  require(`../styles/${styles[style]}.css`);
}



// Needed for onTouchTap
// http://stackoverflow.com/a/34015469/988941
injectTapEventPlugin();
console.log('getting here');
ReactDOM.render(
<Provider store={store}>
 
  <Router history={browserHistory}>
    <Route path='/' component={App}>

      <IndexRoute component={HomePage} />

      <Route path='competition' component={CompetitionContainer} />
      <Route path='competition_result/:id' component={CompetitionResultContainer} />

      <Route path='import_art' component={ImportArtFormContainer} />
      <Route path='art/new' component={ArtFormContainer} />
      <Route path='art/:id' component={ArtContainer} />
      <Route path='art/:id/edit' component={ArtFormContainer} />

      <Route path='categories' component={CategoriesList} />
      <Route path='categories/new' component={CategoryFormContainer} />
      <Route path='categories/:id/edit' component={EditCategoryFormContainer} />
      <Route path='categories/:id' component={ShowCategory} />   

      <Route path='about' component={AboutPage} />
      <Route path='leaderboard' component={LeaderBoard} />
      <Route path='profile' component={ProfilePage} />
      <Route path='top_judges' component={UserRankings} />
    </Route>
  </Router>

</Provider>,
  document.getElementById('app')
);
