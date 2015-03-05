/* @flow */

var React = require('react');
var TodoActions = require('../actions/todo_actions');

var TodoInput = React.createClass({

  getInitialState: function() : Object {
    return {
      value: '',
    }
  },

  render: function() : React.DOM {
    return (
      <form action="/test" onSubmit={this.onSubmit}>
        <input type="text" name="test" value={this.state.value} onChange={this.updateValue} />
        <input type="submit" value="Submit"/>
      </form>
    )
  },

  updateValue: function(e: Event) : void {
    var target = e.target;
    if (target instanceof HTMLInputElement) {
      this.setState({value: target.value});
    }
  },

  onSubmit: function(e: Event) : void {
    e.preventDefault();
    TodoActions.addTodo(this.state.value);
    this.setState({value: ''});
  }

});

module.exports = TodoInput;
