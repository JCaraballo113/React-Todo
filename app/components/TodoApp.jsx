var React = require('react');

var TodoList = require('TodoList');
var AddTodo = require('AddTodo');

//A stateless component
var TodoApp = React.createClass({
  getInitialState: function() {
    return {
      todos: [
        {
          id: 1,
          text: 'Walk the dog'
        },
        {
          id: 2,
          text: 'Clean the yard'
        },
        {
          id: 3,
          text: 'Pet Hershey'
        },
        {
          id: 4,
          text: 'Pet Midnight'
        }
      ],
    };
  },
  handleNewTodo: function(todo) {
    console.log(todo);
  },
  render: function() {
    var {todos} = this.state;
    return (
      <div>
        <TodoList todos={todos}/>
        <AddTodo onAddTodo={this.handleNewTodo}/>
      </div>
    )
  }
});

module.exports = TodoApp;
