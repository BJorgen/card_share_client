// Application entrypoint.

// Load up the application styles

// require('../styles/application.scss');
// import '../styles/application.css';

// Render the top-level React component
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App.jsx';
import { Router } from 'react-router-dom';
import { createBrowserHistory } from 'history'

const history = createBrowserHistory();
ReactDOM.render((
  <Router history={history}>
    <App />
  </Router>
), document.getElementById('root'));

