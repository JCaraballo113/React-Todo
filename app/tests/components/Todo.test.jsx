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
      id: 1
    });
  });

});
