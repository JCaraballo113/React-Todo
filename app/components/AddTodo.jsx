var React = require('react');
var Todo = require('Todo');

var TodoList = React.createClass({
  propTypes: {
    onAddTodo: React.PropTypes.func.isRequired
  },
  handleAddTodo: function (e) {
    e.preventDefault();
    var todo = this.refs.todo.value;

    if(typeof todo === 'string' && todo.length > 0) {
      this.refs.todo.value = '';
      this.props.onAddTodo(todo);
    }
    else {
      this.refs.todo.focus();
    }
  },
  render: function() {
    return (
      <div>
        <form onSubmit={this.handleAddTodo}>
          <input type="search" ref="todo" placeholder="What do you need to do?"/>
          <button className="button expanded" ref="addTodo">Add Todo</button>
        </form>
      </div>
    );
  }
});

module.exports = TodoList;
