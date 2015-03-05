var Dispatcher = require('../dispatcher');
var EventEmitter = require('event_emitter');
var TodoConstants = require('../constants/todo_constants');


var TodoStore = (function(){
  var _storeData = {
    todos: [],
  }


  /*
   * Public Interface for requesting data from the store
   *
   * @type {Object}
   */

  var publicAPI = {

    getData: function(){
      return _storeData.todos;
    }


  }



  /*
   * watch for actions and respond to them
   */

  publicAPI.token = Dispatcher.register(function(payload) {
    var action = payload.action;

    switch(action.actionType) {
      case TodoConstants.ADD_TODO:
        _storeData.todos.push(action.value);
        break;

      default:
        return true;
    }

    TodoStore.emitChange();

    return true
  });


  return _.extend({}, EventEmitter.prototype, publicAPI);
})()


module.exports = TodoStore;
