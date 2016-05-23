var React = require('react');
var ReactDOM = require('react-dom');
var {Route, Router, IndexRoute, hashHistory} = require('react-router');
var TodoApp = require('TodoApp');

// Load foundation
$(document).foundation();

// Load App scss
require('style!css!sass!applicationStyles')

ReactDOM.render(
  <div>
    <p>Test</p>
    <TodoApp/>
  </div>,
  document.getElementById('app')
);
