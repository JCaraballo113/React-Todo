var React = require('react');
var {connect} = require('react-redux');
var TodoAPI = require('TodoAPI');
var actions = require('actions');

export var Todo = React.createClass({
  render: function() {
    var {text, id, completed, createdAt, completedAt,editable,edited,editedAt, dispatch} = this.props;
    var todoClassName = completed ? "todo todo__completed" : "todo";
    var renderDate = () => {
      var message = 'Created ';
      var timestamp = createdAt;

      if(completed) {
        message = 'Completed ';
        timestamp = completedAt;
      }

      if (edited) {
        message = 'Edited '
        timestamp = editedAt;
      }

      var formattedDate = TodoAPI.getFormattedDate(message, timestamp, 'MMM Do YYYY @ h:mm a');
      return formattedDate ;
    };

    var renderTodo = () => {
      if(editable) {
        return   <input className="edit-input" type="text" placeholder={text} ref="editTodoText"/>
      }
      else {
        return   <p>{text}</p>;
      }
    };

    var renderButton = () => {
      if(!editable) {
        return <button className="small button expanded" ref="editTodoBtn" onClick={() => {
            dispatch(actions.editTodo(id));
          }}>Edit Todo</button>;
      }
      else {
        return <button className="small success button expanded" ref="saveEditBtn" onClick={() => {
            var newText = this.refs.editTodoText.value;
            this.refs.editTodoText.value = '';
            if(newText.length > 0) {
              dispatch(actions.saveEditedTodo(id,newText));
            }
            else {
              dispatch(actions.saveEditedTodo(id,text));
            }
          }}>Save</button>;
      }
    }

    return (
      <div className={todoClassName}>
        <div>
          <input type="checkbox" checked={completed} ref="toggler" onClick={()=>{
              //this.props.onToggle(id);
              dispatch(actions.toggleTodo(id));
            }}/>
        </div>
        <div>
          {renderTodo()}
          <p className="todo__subtext">{renderDate()}</p>
        </div>
        <div className="controls">
          {renderButton()}
          <button className="small expanded button alert" ref="deleteTodoBtn" onClick={() => {
              dispatch(actions.deleteTodo(id));
            }}>Delete</button>
        </div>
      </div>
    );
  }
});

export default connect()(Todo);
