var React = require('react');
var {connect} = require('react-redux');
var TodoAPI = require('TodoAPI');
var actions = require('actions');

export var Todo = React.createClass({
  getInitialState: function() {
    return {
      //Since the todo being editable only matters in the front end, make it the only initial state. No need to upload to firebase.
      editable: false
    };
  },
  render: function() {
    var {text, id, completed, createdAt, completedAt,edited,editedAt, dispatch} = this.props;
    var todoClassName = completed ? "todo todo__completed" : "todo";
    var renderDate = () => {
      var message = 'Created ';
      var timestamp = createdAt;

      if (edited) {
        message = 'Edited '
        timestamp = editedAt;
      }

      if(completed) {
        message = 'Completed ';
        timestamp = completedAt;
      }

      var formattedDate = TodoAPI.getFormattedDate(message, timestamp, 'MMM Do YYYY @ h:mm a');
      return formattedDate ;
    };

    var renderTodo = () => {
      if(this.state.editable && !completed) {
        return   <input className="edit-input" type="text" placeholder={text} ref="editTodoText"/>
      }
      else {
        return   <p>{text}</p>;
      }
    };

    var renderButton = () => {
      if(!completed) {
        if(!this.state.editable) {
          return <button className="small button expanded hollow" ref="editTodoBtn" onClick={() => {
              this.setState({editable: !this.state.editable});
            }}>Edit Todo</button>;
        }
        else {
          return <button className="small success button expanded hollow" ref="saveEditBtn" onClick={() => {
              var newText = this.refs.editTodoText.value;
              this.refs.editTodoText.value = '';
              if(newText.length > 0) {
                dispatch(actions.startSaveEditedTodo(id,newText));
              }
              this.setState({editable: false});
            }}>Save</button>;
        }
      }
    };

    return (
      <div className={todoClassName}>
        <div>
          <input type="checkbox" checked={completed} ref="toggler" onClick={()=>{
              dispatch(actions.startToggleTodo(id, !completed));
            }}/>
        </div>
        <div>
          {renderTodo()}
          <p className="todo__subtext">{renderDate()}</p>
        </div>
        <div className="controls">
          {renderButton()}
          <button className="small expanded button alert hollow" ref="deleteTodoBtn" onClick={() => {
              dispatch(actions.startDeleteTodo(id));
            }}>Delete</button>
        </div>
      </div>
    );
  }
});

export default connect()(Todo);
