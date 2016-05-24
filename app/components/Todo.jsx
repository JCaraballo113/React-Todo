var React = require('react');
var TodoAPI = require('TodoAPI');

var Todo = React.createClass({
  render: function() {
    var {text, id, completed, createdAt, completedAt} = this.props;
    var renderDate = () => {
      var message = 'Created ';
      var timestamp = createdAt;

      if(completed) {
        message = 'Completed ';
        timestamp = completedAt;
      }

      return TodoAPI.getFormattedDate(message, timestamp, 'MMM Do YYYY @ h:mm a');
    };

    return (
      <div ref="toggler" onClick={()=>{
          this.props.onToggle(id);
        }}>
        <input type="checkbox" checked={completed}/>
        <p>{text}</p>
        <p>{renderDate()}</p>
      </div>
    );
  }
});

module.exports = Todo;
