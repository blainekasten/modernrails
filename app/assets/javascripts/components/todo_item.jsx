var React = require('react');

var TodoItem = React.createClass({

  render: function() : React.DOM {
    return (
      <div>{this.props.todo}</div>
    )
  }

});

module.exports = TodoItem;
