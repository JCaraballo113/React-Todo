var React = require('react');

var TodoSearch = React.createClass({
  handleSearch: function () {
    var showCompleted = this.refs.showCompleted.checked;
    var searchText = this.refs.searchTodo.value;

    this.props.onSearch(showCompleted, searchText);
  },
  render: function() {
    return (
      <div>
        <div>
          <input type="search" ref="searchTodo" placeholder="Search todos" onChange={this.handleSearch}/>
        </div>
        <div>
          <label for="showComplete">
            <input type="checkbox" ref="showCompleted" onChange={this.handleSearch} name="showComplete"/>
            Show completed todos
          </label>
        </div>
      </div>
    );
  }
});

module.exports = TodoSearch;
