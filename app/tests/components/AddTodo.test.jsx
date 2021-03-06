var React = require('react');
var ReactDOM = require('react-dom');
var expect = require('expect');
var $ = require('jQuery');
var TestUtils = require('react-addons-test-utils');

import * as actions from 'actions';
var {AddTodo} =  require('AddTodo');


describe('AddTodo', () => {
  it('should exist', () => {
    expect(AddTodo).toExist();
  });

  it('should dispatch startAddTodo async func when valid todo text', () => {
    var todoText = "A simple todo";
    var action = actions.startAddTodo(todoText);

    var spy = expect.createSpy();
    var addTodo = TestUtils.renderIntoDocument(<AddTodo dispatch={spy}/>);
    addTodo.refs.todo.value = todoText;
    var $el = $(ReactDOM.findDOMNode(addTodo));
    TestUtils.Simulate.submit($el.find('form')[0]);

    expect(spy).toHaveBeenCalledWith(action);
  });

  it('should NOT call onAddTodo prop with invalid data', () => {
    var spy = expect.createSpy();
    var addTodo = TestUtils.renderIntoDocument(<AddTodo dispatch={spy}/>);
    addTodo.refs.todo.value = '';
    var $el = $(ReactDOM.findDOMNode(addTodo));
    TestUtils.Simulate.submit($el.find('form')[0]);

    expect(spy).toNotHaveBeenCalled();
  });
});
