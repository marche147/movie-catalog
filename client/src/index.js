import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import Home from './screens/home';
import Info from './screens/info';
import List from './screens/list';
import NotFound from './screens/notfound';
import { Route, Link, BrowserRouter as Router, Switch } from 'react-router-dom'
import './index.css';


const routing = (
  <Router>
    <div>
      <Switch>
      	<Route exact path="/" component={App} />
      	<Route path="/home" component={Home} />
      	<Route path="/info/:id" component={Info} />
      	<Route exact path="/list" component={List} />
      	<Route component={NotFound} />
      </Switch>

    </div>
  </Router>
)

ReactDOM.render(
  routing,
  document.getElementById('root')
);
