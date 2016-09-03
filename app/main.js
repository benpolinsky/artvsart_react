import React from 'react';
import ReactDOM from 'react-dom';
import {Router, IndexRoute, Route, browserHistory} from 'react-router';
import App from './app.js';
import Home from './components/home.js'
import About from './components/about.js'
import Competition from './components/competition.js'
import AddNewArt from './components/add_new_art.js'

ReactDOM.render(
  <Router history={browserHistory}>
    <Route path='/' component={App}>
      <IndexRoute component={Home} />
      <Route path='home' component={Home} />
      <Route path='add_new_art' component={AddNewArt} />
      <Route path='about' component={About} />
    </Route>
  </Router>,
  document.getElementById('app')
);