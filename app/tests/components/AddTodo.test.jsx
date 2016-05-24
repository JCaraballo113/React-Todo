var React = require('react');
var ReactDOM = require('react-dom');
var expect = require('expect');
var $ = require('jQuery');
var TestUtils = require('react-addons-test-utils');

var AddTodo =  require('AddTodo');


describe('AddTodo', () => {
  it('should exist', () => {
    expect(AddTodo).toExist();
  });

  it('should call onAddTodo prop with valid  and clear the input', () => {
    var todoText = "A simple todo";
    var spy = expect.createSpy();
    var addTodo = TestUtils.renderIntoDocument(<AddTodo onAddTodo={spy}/>);
    addTodo.refs.todo.value = 'A simple todo';
    var addBtn = addTodo.refs.addTodo;
    TestUtils.Simulate.click(addBtn);

    setTimeout(() => {
      expect(spy).toHaveBeenCalledWith(todoText);
      expect(addTodo.refs.todo.value).toBe('');
    }, 1001);
  });

  it('should NOT call onAddTodo prop with invalid data', () => {
    var spy = expect.createSpy();
    var addTodo = TestUtils.renderIntoDocument(<AddTodo onAddTodo={spy}/>);
    addTodo.refs.todo.value = '';
    var addBtn = addTodo.refs.addTodo;
    TestUtils.Simulate.click(addBtn);

    setTimeout(() => {
      expect(spy).toNotHaveBeenCalled();
    }, 1001);
  });
});
