/* eslint-disable */
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { Route, Link, BrowserRouter as Router, Switch, IndexRoute } from 'react-router-dom'
import './index.css';

const routing = (
  <Router>
    <div>
      <App />
    </div>
  </Router>
)

ReactDOM.render(
  routing,
  document.getElementById('root')
);
