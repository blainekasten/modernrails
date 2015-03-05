var React = require('react');
var TodoView = require('./views/todo_view');


// must keep this here
var ReactRailsUJS = require('./react_ujs');

React.render(React.createElement(TodoView, {}), document.body);
