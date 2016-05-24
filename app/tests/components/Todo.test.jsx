var React = require('react');
var ReactDOM = require('react-dom');
var expect = require('expect');
var $ = require('jQuery');
var TestUtils = require('react-addons-test-utils');

var Todo =  require('Todo');


describe('Todo', () => {
  it('should exist', () => {
      expect(Todo).toExist();
    }
  );

  it('should pass the correct id to the parent function when todo is clicked', () => {
    var spy = expect.createSpy();
    var dummyTodo = {
      id: 1,
      text: 'blah',
      completed: false
    }
    var todo = TestUtils.renderIntoDocument(<Todo key={dummyTodo.id} {...dummyTodo} onToggle={spy}/>);
    TestUtils.Simulate.click(todo.refs.toggler);
    expect(spy).toHaveBeenCalledWith(1);
  });

});
