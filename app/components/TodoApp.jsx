var React = require('react');

var TodoList = require('TodoList');
var AddTodo = require('AddTodo');
var TodoSearch = require('TodoSearch');
var uuid = require('node-uuid');

//A stateless component
var TodoApp = React.createClass({
  getInitialState: function() {
    return {
      showCompleted: false,
      searchText: '',
      todos: [
        {
          id: uuid(),
          text: 'Walk the dog'
        },
        {
          id: uuid(),
          text: 'Clean the yard'
        },
        {
          id: uuid(),
          text: 'Pet Hershey'
        },
        {
          id: uuid(),
          text: 'Pet Midnight'
        }
      ],
    };
  },
  handleNewTodo: function(todo) {
    this.setState({
      todos: [
        ...this.state.todos,
        {
          id: uuid(),
          text: todo
        }
      ]
    });
  },
  handleSearch: function (showCompleted, searchText) {
    this.setState({
      showCompleted: showCompleted,
      searchText: searchText.toLowerCase()
    });
  },
  render: function() {
    var {todos} = this.state;
    return (
      <div>
        <TodoSearch onSearch={this.handleSearch}/>
        <TodoList todos={todos}/>
        <AddTodo onAddTodo={this.handleNewTodo}/>
      </div>
    )
  }
});

module.exports = TodoApp;
