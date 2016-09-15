import React from 'react';
import ReactDOM from 'react-dom';
import {Router, IndexRoute, Route, browserHistory} from 'react-router';
import App from './app.js';
import Home from './components/pages/home.js'
import CompetitionPage from './components/pages/competition_page.js'
import About from './components/pages/about.js'
import Competition from './components/competition.js'
import AddNewArt from './components/pages/add_new_art.js'
import ShowArt from './components/pages/show_art.js'
import ImportArtForm from './components/forms/import_art_form.js'
import Results from './components/pages/results.js'
require('../style.css');

ReactDOM.render(
  <Router history={browserHistory}>
    <Route path='/' component={App}>
      <IndexRoute component={Home} />
      <Route path='competition' component={CompetitionPage} />
      <Route path='add_new_art' component={AddNewArt} />
      <Route path='import_art' component={ImportArtForm} />
      <Route path='about' component={About} />
      <Route path='art/:id' component={ShowArt} />
      <Route path='results' component={Results} />
    </Route>
  </Router>,
  document.getElementById('app')
);