var TestComponent = require('./components/test_component');
var React = require('react');



// must keep this here
var ReactRailsUJS = require('./react_ujs');

console.log('rendering')
React.render(React.createElement(TestComponent, {}), document.body);
