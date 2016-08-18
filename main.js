import React from 'react';
import ReactDOM from 'react-dom';
import App from './app.js';

ReactDOM.render(
  <App txt="Hello World, I'm a prop value" category_id={12} />, 
  document.getElementById('app')
);