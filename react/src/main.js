import 'babel-polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, hashHistory, IndexRoute } from 'react-router'
import App from './components/App'

$(function() {
  if(document.getElementById('app') != null){


    ReactDOM.render(
      <Router history={hashHistory}>
        <Route path='/' component={App}/>
      </Router>,
      document.getElementById('app')
    );
  }
});
