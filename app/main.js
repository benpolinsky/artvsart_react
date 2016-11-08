import 'babel-polyfill';

import injectTapEventPlugin from 'react-tap-event-plugin';
import React from 'react';
import ReactDOM from 'react-dom';
import {Router, IndexRoute, Route, browserHistory} from 'react-router';
import { Provider } from 'react-redux';
import store from './store.js';
import App from './components/app.js';
import authWrapper from './components/authWrapper.js'
import AdminAuthWrapper from './components/adminAuthWrapper.js'
import appLoader from './components/appLoader.js'

import HomePage from './components/pages/homePage.js'
import AboutPage from './components/pages/aboutPage.js'
import ProfilePage from './components/users/profilePage.js'
import ConfirmAccount from './components/users/confirmAccount.js'
import PendingConfirmation from './components/users/pendingConfirmation.js'
import ForgotPasswordForm from './components/forms/forgotPasswordForm.js'
import NewPasswordForm from './components/users/newPasswordForm.js'
import RestoreUser from './components/users/restoreUser.js'

import CompetitionContainer from './components/competition/competitionContainer.js'
import CompetitionResultContainer from './components/competition/competitionResultContainer.js'

import ArtFormContainer from './components/art/artFormContainer.js'
import ArtContainer from './components/art/artContainer.js'
import ArtList from './components/art/artList.js'
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
ReactDOM.render(
<Provider store={store}>
 
  <Router history={browserHistory}>
  <Route path='/' component={appLoader(authWrapper(App))}>

      <IndexRoute component={HomePage} />

      <Route path='competition' component={CompetitionContainer} />
      <Route path='competition_result/:id' component={CompetitionResultContainer} />

      <Route path='import_art' component={AdminAuthWrapper(ImportArtFormContainer)} />
      <Route path='art/new' component={AdminAuthWrapper(ArtFormContainer)} />
      <Route path='art/:id' component={AdminAuthWrapper(ArtContainer)} />
      <Route path='art/:id/edit' component={AdminAuthWrapper(ArtFormContainer)} />
      <Route path='art' component={AdminAuthWrapper(ArtList)} />

      <Route path='categories' component={AdminAuthWrapper(CategoriesList)} />
      <Route path='categories/new' component={AdminAuthWrapper(CategoryFormContainer)} />
      <Route path='categories/:id/edit' component={AdminAuthWrapper(EditCategoryFormContainer)} />
      <Route path='categories/:id' component={AdminAuthWrapper(ShowCategory)} />   

      <Route path='about' component={AboutPage} />

      <Route path='leaderboard' component={LeaderBoard} />

      <Route path='profile' component={ProfilePage} />
      <Route path='user/forgot_password' component={ForgotPasswordForm} />
      <Route path='user/new_password/:token' component={NewPasswordForm} />
      <Route path='user/confirm_account/:token' component={ConfirmAccount} />
      <Route path='user/pending_confirmation' component={PendingConfirmation} />
      <Route path='user/restore' component={RestoreUser} />
      <Route path='top_judges' component={UserRankings} />
    </Route>
  </Router>

</Provider>,
  document.getElementById('app')
);
