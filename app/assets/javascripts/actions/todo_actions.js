var Dispatcher = require('../dispatcher')
var TodoContants = require('../constants/todo_constants')

module.exports = {

  addTodo: function(value){
    Dispatcher.handleAction({
      actionType: TodoContants.ADD_TODO,
      value: value
    });
  }

}
