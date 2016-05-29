var React = require('react');
var ReactDOM = require('react-dom');
var expect = require('expect');
var $ = require('jQuery');
var TestUtils = require('react-addons-test-utils');

var {Todo} = require('Todo');


describe('Todo', () => {
  it('should exist', () => {
      expect(Todo).toExist();
    }
  );

  it('should dispatch TOGGLE_TODO action on click', () => {
    var spy = expect.createSpy();
    var dummyTodo = {
      id: 1,
      text: 'blah',
      completed: false
    };

    var todo = TestUtils.renderIntoDocument(<Todo key={dummyTodo.id} {...dummyTodo} dispatch={spy}/>);
    TestUtils.Simulate.click(todo.refs.toggler);
    expect(spy).toHaveBeenCalledWith({
      type: "TOGGLE_TODO",
      id: dummyTodo.id
    });
  });

  it('should dispatch EDIT_TODO action on click', () => {
    var spy = expect.createSpy();
    var dummyTodo = {
        id: 1,
        text: 'b',
        completed: false,
        completedAt: 123,
        createdAt: 1,
        editable: false,
        edited: false,
        editedAt: undefined
      };

    var todo = TestUtils.renderIntoDocument(<Todo key={dummyTodo.id} {...dummyTodo} dispatch={spy}/>);
    expect(todo.refs.editTodoBtn).toExist();
    TestUtils.Simulate.click(todo.refs.editTodoBtn);
    expect(spy).toHaveBeenCalledWith({
      type: "EDIT_TODO",
      id: dummyTodo.id
    });
  });

  it('should dispatch SAVE_EDIT action on click', () => {
    var spy = expect.createSpy();
    var dummyTodo = {
        id: 1,
        text: 'b',
        completed: false,
        completedAt: 123,
        createdAt: 1,
        editable: true,
        edited: false,
        editedAt: undefined
      };

    var todo = TestUtils.renderIntoDocument(<Todo key={dummyTodo.id} {...dummyTodo} dispatch={spy}/>);
    expect(todo.refs.saveEditBtn).toExist();
    todo.refs.editTodoText.value = 'pet';
    TestUtils.Simulate.click(todo.refs.saveEditBtn);
    expect(spy).toHaveBeenCalledWith({
      type: "SAVE_EDIT",
      id: dummyTodo.id,
      text: "pet"
    });
  });

  it('should dispatch DELETE_TODO action on click', () => {
    var spy = expect.createSpy();
    var dummyTodo = {
        id: 1,
        text: 'b',
        completed: false,
        completedAt: 123,
        createdAt: 1,
        editable: true,
        edited: false,
        editedAt: undefined
      };

    var todo = TestUtils.renderIntoDocument(<Todo key={dummyTodo.id} {...dummyTodo} dispatch={spy}/>);
    expect(todo.refs.deleteTodoBtn).toExist();
    TestUtils.Simulate.click(todo.refs.deleteTodoBtn);
    expect(spy).toHaveBeenCalledWith({
      type: "DELETE_TODO",
      id: dummyTodo.id
    });
});

});
