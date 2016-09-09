import React from 'react';
import ReactDOM from 'react-dom';
import {Router, IndexRoute, Route, browserHistory} from 'react-router';
import App from './app.js';
import Home from './components/pages/home.js'
import About from './components/pages/about.js'
import Competition from './components/pages/competition.js'
import AddNewArt from './components/pages/add_new_art.js'
import ShowArt from './components/pages/show_art.js'
import ImportArtForm from './components/forms/import_art_form.js'
require('../style.css');

ReactDOM.render(
  <Router history={browserHistory}>
    <Route path='/' component={App}>
      <IndexRoute component={ImportArtForm} />
      <Route path='home' component={Home} />
      <Route path='add_new_art' component={AddNewArt} />
      <Route path='import_art' component={ImportArtForm} />
      <Route path='about' component={About} />
      <Route path='art/:id' component={ShowArt} />
    </Route>
  </Router>,
  document.getElementById('app')
);