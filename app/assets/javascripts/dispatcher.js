var Flux = require('flux');

var Dispatcher = new Flux.Dispatcher;

Dispatcher.handleAction = function(action) {
  this.dispatch({
    source: 'VIEW_ACTION',
    action: action
  });
}

module.exports = Dispatcher;
