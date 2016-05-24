var React = require('react');
var ReactDOM = require('react-dom');
var expect = require('expect');
var $ = require('jQuery');
var TestUtils = require('react-addons-test-utils');

var TodoApp =  require('TodoApp');


describe('TodoApp', () => {
  it('should exist', () => {
      expect(TodoApp).toExist();
    }
  );

  it('should add todo to the todos state on handleAddTodo', () => {
    var todoText = "Shower";
    var todoApp = TestUtils.renderIntoDocument(<TodoApp/>);

    todoApp.setState({todos: []});
    todoApp.handleNewTodo(todoText);

    expect(todoApp.state.todos[0].text).toBe(todoText);
    expect(todoApp.state.todos.length).toBe(1);
    expect(todoApp.state.todos[0].createdAt).toBeA('number');
    expect(todoApp.state.todos[0].completedAt).toBe(undefined);
  });

  it('should toggle completed value when handleToggle called', () => {
    var todoText = "Shower";
    var todoApp = TestUtils.renderIntoDocument(<TodoApp/>);
    todoApp.setState({todos: [{id: 1, text: todoText, completed: false, createdAt: 0, completedAt: undefined}]});
    expect(todoApp.state.todos[0].completed).toBe(false);
    todoApp.handleToggle(1);
    expect(todoApp.state.todos[0].completed).toBe(true);
    expect(todoApp.state.todos[0].completedAt).toBeA('number');
  });

  it('should remove completedAt when toggled from completed to not-completed', () => {
    var todoText = "Shower";
    var todoApp = TestUtils.renderIntoDocument(<TodoApp/>);
    todoApp.setState({todos: [{id: 1, text: todoText, completed: true, createdAt: 0, completedAt: 1}]});
    expect(todoApp.state.todos[0].completed).toBe(true);
    todoApp.handleToggle(1);
    expect(todoApp.state.todos[0].completed).toBe(false);
    expect(todoApp.state.todos[0].completedAt).toNotExist();
  });
});
