import React from 'react';
import ReactDOM from 'react-dom';
import {Router, IndexRoute, Route, browserHistory} from 'react-router';
import App from './app.js';
import Home from './components/home.js'
import About from './components/about.js'
import Competition from './components/competition.js'
import AddNewArt from './components/add_new_art.js'
import ShowArt from './components/show_art.js'
require('../style.css');

ReactDOM.render(
  <Router history={browserHistory}>
    <Route path='/' component={App}>
      <IndexRoute component={AddNewArt} />
      <Route path='home' component={Home} />
      <Route path='add_new_art' component={AddNewArt} />
      <Route path='about' component={About} />
      <Route path='art/:id' component={ShowArt} />

    </Route>
  </Router>,
  document.getElementById('app')
);