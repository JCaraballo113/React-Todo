import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
var expect = require('expect');

var actions = require('actions');

var createMockStore = configureMockStore([thunk]);

describe('Actions', () => {
  it('should generate search text action', () => {
    var action = {
      type: 'SET_SEARCH_TEXT',
      searchText: 'Some search text'
    };

    var res = actions.setSearchText(action.searchText);
    expect(res).toEqual(action);
  });

  it('should generate add todo action', () => {
    var action = {
      type: 'ADD_TODO',
      todo: {
        id: '123abc',
        text: 'test',
        completed: false,
        createdAt: false,
        edited: true,
        editable: false
      }
    };

    var res = actions.addTodo(action.todo);

    expect(res).toEqual(action);
  });

  it('should create todo and dispatch ADD_TODO', (done) => {
    const store = createMockStore({});
    const todoText = 'Test';

    store.dispatch(actions.startAddTodo(todoText)).then(() => {
      const actions = store.getActions();
      expect(actions[0]).toInclude({
        type: 'ADD_TODO'
      });

      expect(actions[0].todo).toInclude({
        text: todoText
      });

      done();
    }).catch(done);
  });

  it('should generate add todos action', () => {
    var todos = [
      {
        id: 1,
        text: 'b',
        completed: false,
        completedAt: 123,
        createdAt: 1
      }
    ];
    var action = {
      type: 'ADD_TODOS',
      todos: todos
    };

    var res = actions.addTodos(action.todos);

    expect(res).toEqual(action);
  });

  it('should generate toggle show completed action', () => {
    var action = {
      type: 'TOGGLE_SHOW_COMPLETED'
    };

    var res = actions.toggleShowCompleted();

    expect(res).toEqual(action);
  });

  it('should generate toggle todo action', () => {
    var action = {
      type: 'TOGGLE_TODO',
      id: 1
    };

    var res = actions.toggleTodo(action.id);

    expect(res).toEqual(action);
  });

  it('should generate edit todo action', () => {
    var action = {
      type: 'EDIT_TODO',
      id: 1
    };

    var res = actions.editTodo(action.id);

    expect(res).toEqual(action);
  });

  it('should generate save edited todo action', () => {
    var todoText = "blah";
    var action = {
      type: 'SAVE_EDIT',
      id: 1,
      text: todoText
    };

    var res = actions.saveEditedTodo(action.id, todoText);

    expect(res).toEqual(action);
  });

  it('should generate reset editable todos action', () => {
    var action = {
      type: 'RESET_EDITABLE_TODOS'
    };

    var res = actions.resetEditables();

    expect(res).toEqual(action);
  });

  it('should generate delete todo action', () => {
    var action = {
      type: 'DELETE_TODO',
      id: 1
    };

    var res = actions.deleteTodo(1);

    expect(res).toEqual(action);
  });
});
