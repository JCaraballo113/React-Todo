var React = require('react');
var {connect} = require('react-redux');
var TodoAPI = require('TodoAPI');
var actions = require('actions');

export var Todo = React.createClass({
  render: function() {
    var {text, id, completed, createdAt, completedAt, dispatch} = this.props;
    var todoClassName = completed ? "todo todo__completed" : "todo";
    var renderDate = () => {
      var message = 'Created ';
      var timestamp = createdAt;

      if(completed) {
        message = 'Completed ';
        timestamp = completedAt;
      }

      var formattedDate = TodoAPI.getFormattedDate(message, timestamp, 'MMM Do YYYY @ h:mm a');
      return formattedDate ;
    };

    return (
      <div className={todoClassName} ref="toggler" onClick={()=>{
          //this.props.onToggle(id);
          dispatch(actions.toggleTodo(id));
        }}>
        <div>
          <input type="checkbox" checked={completed}/>
        </div>
        <div>
          <p>{text}</p>
          <p className="todo__subtext">{renderDate()}</p>
        </div>
      </div>
    );
  }
});

export default connect()(Todo);
