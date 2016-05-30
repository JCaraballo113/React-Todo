var React = require('react');
var ReactDOM = require('react-dom');
var expect = require('expect');
var $ = require('jQuery');
var TestUtils = require('react-addons-test-utils');

import * as actions from 'actions';
import {Todo} from 'Todo';


describe('Todo', () => {
  it('should exist', () => {
      expect(Todo).toExist();
    }
  );

  it('should dispatch START_TOGGLE_TODO action on click', () => {
    var spy = expect.createSpy();
    var dummyTodo = {
      id: '123',
      text: 'blah',
      completed: false
    };

    var action = actions.startToggleTodo(dummyTodo.id, !dummyTodo.completed);

    var todo = TestUtils.renderIntoDocument(<Todo key={dummyTodo.id} {...dummyTodo} dispatch={spy}/>);
    TestUtils.Simulate.click(todo.refs.toggler);
    expect(spy).toHaveBeenCalledWith(action);
  });

  it('should dispatch START_SAVE_EDITED action on click', () => {
    var spy = expect.createSpy();
    var dummyTodo = {
        id: '123',
        text: 'b',
        completed: false,
        completedAt: 123,
        createdAt: 1,
        editable: true,
        edited: false,
        editedAt: undefined
      };

    var action = actions.startSaveEditedTodo(dummyTodo.id, 'pet');

    var todo = TestUtils.renderIntoDocument(<Todo key={dummyTodo.id} {...dummyTodo} dispatch={spy}/>);
    TestUtils.Simulate.click(todo.refs.editTodoBtn);
    expect(todo.refs.saveEditBtn).toExist();
    todo.refs.editTodoText.value = 'pet';
    TestUtils.Simulate.click(todo.refs.saveEditBtn);
    expect(spy).toHaveBeenCalledWith(action);
  });

  it('should dispatch START_DELETE_TODO action on click', () => {
    var spy = expect.createSpy();
    var dummyTodo = {
        id: '123',
        text: 'b',
        completed: false,
        completedAt: 123,
        createdAt: 1,
        editable: true,
        edited: false,
        editedAt: undefined
      };

    var action = actions.startDeleteTodo(dummyTodo.id);

    var todo = TestUtils.renderIntoDocument(<Todo key={dummyTodo.id} {...dummyTodo} dispatch={spy}/>);
    expect(todo.refs.deleteTodoBtn).toExist();
    TestUtils.Simulate.click(todo.refs.deleteTodoBtn);
    expect(spy).toHaveBeenCalledWith(action);
});

});
