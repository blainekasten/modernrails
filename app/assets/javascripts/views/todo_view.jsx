var React = require('react');
var TodoStore = require('../stores/todo_store');

var TodoInput = require('../components/todo_input');
var TodoItem = require('../components/todo_item');


var TodoView = React.createClass({

  getInitialState: function() : Object {
    return {todos: []}
  },

  render: function() : React.DOM {
    var items = this.state.todos.map(function(todo){
      return <TodoItem key={todo} todo={todo} />;
    });

    return (
      <div>
        <TodoInput />
        {items}
      </div>
    )
  },

  /*
   * when mounted, watch for store changes
   */

  componentDidMount: function() : void {
    TodoStore.addChangeListener(this._onChange);
  },


  /*
   * stop watching for store changes when unmounted
   */

  componentWillUnmount: function() :void {
    TodoStore.removeChangeListener(this._onChange);
  },

  _onChange: function() :void {
    this.setState({todos: TodoStore.getData() });
  }


});

module.exports = TodoView;
