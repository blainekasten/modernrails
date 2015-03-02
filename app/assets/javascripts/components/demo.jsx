/* @flow */

var React = require('react');
var Demo = React.createClass({

  render: function(){
    console.log('rendering')
    return (
      <form action="/test" onSubmit={this.onSubmit}>
        <input type="text" name="test" />
        <input type="submit" value="Submit"/>
      </form>
    )
  },

  onSubmit: function(e) {
    e.preventDefault();
    console.log('submitting');
  },

  componentDidMount: function(){
    console.log('mounting logic');
  }

});

module.exports = Demo;
