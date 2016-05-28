var React = require('react');
var {connect} = require('react-redux');
var actions = require('actions');

export var AddTodo = React.createClass({
  handleAddTodo: function (e) {
    e.preventDefault();
    var {dispatch} = this.props
    var todo = this.refs.todo.value;

    if(typeof todo === 'string' && todo.length > 0) {
      this.refs.todo.value = '';
      //this.props.onAddTodo(todo);
      dispatch(actions.addTodo(todo));
    }
    else {
      this.refs.todo.focus();
    }
  },
  render: function() {
    return (
      <div className="container__footer">
        <form onSubmit={this.handleAddTodo}>
          <input type="search" ref="todo" placeholder="What do you need to do?"/>
          <button className="button expanded" ref="addTodo">Add Todo</button>
        </form>
      </div>
    );
  }
});

export default connect()(AddTodo);
