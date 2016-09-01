import React from 'react';
import ReactDOM from 'react-dom';
import {Router, IndexRoute, Route, browserHistory} from 'react-router';
import App from './app.js';
import About from './about.js'
import Competition from './components/competition.js'
// import routes from './config/routes';

ReactDOM.render(
  <Router history={browserHistory}>
    <Route path='/' component={App}>
      <IndexRoute component={Competition} />
      <Route path='about' component={About} />
      <Route path='competition' component={Competition} />
    </Route>
  </Router>,
  document.getElementById('app')
);