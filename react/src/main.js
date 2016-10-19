import 'babel-polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, hashHistory, IndexRoute } from 'react-router'
import App from './components/App'
import Home from './components/Home'
import Request from './components/Request'
import Volunteer from './components/Volunteer'
import Site from './components/Site'

$(function() {
  if(document.getElementById('app') != null){


    ReactDOM.render(
      <Router history={hashHistory}>
        <Route path='/' component={App}>
          <IndexRoute component={Home}/>
          <Route path='/request' component={Request}/>
          <Route path='/volunteer' component={Volunteer}/>
          <Route path='/sites/:id' component={Site}/>
        </Route>
      </Router>,
      document.getElementById('app')
    );
  }
});
