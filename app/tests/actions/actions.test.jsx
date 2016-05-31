import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
var expect = require('expect');

import firebase, {firebaseRef} from 'app/firebase';
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
        text: 'boop',
        completed: false,
        createdAt: false,
        edited: true,
        editable: false
      }
    };

    var res = actions.addTodo(action.todo);

    expect(res).toEqual(action);
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
      type: 'UPDATE_TODO',
      id: '123',
      updates: {completed: false}
    };

    var res = actions.updateTodo(action.id, action.updates);

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

  describe('Tests with firebase todos', () => {
    var testTodoRef;

    beforeEach((done) => {
      var todosRef = firebaseRef.child('todos');

      todosRef.remove().then(() => {
        testTodoRef = firebaseRef.child('todos').push();

        return testTodoRef.set({
          text: 'something',
          completed: false,
          createdAt: 12345,
          edited: false,
        })
      })
      .then(() => done())
      .catch(done);
    });

    afterEach((done) => {
      testTodoRef.remove().then(() => done());
    });

    it('should create todo and dispatch ADD_TODO', (done) => {
      const store = createMockStore({});
      const todoText = 'Test';

      const action = actions.startAddTodo(todoText);

      store.dispatch(action).then(() => {
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


    it('should toggle todo and dispatch UPDATE_TODO action', (done) => {
      const store = createMockStore({});
      const action = actions.startToggleTodo(testTodoRef.key, true);

      store.dispatch(action).then(() => {
        const mockActions = store.getActions();

        expect(mockActions[0]).toInclude({
          type: 'UPDATE_TODO',
          id: testTodoRef.key
        });

        expect(mockActions[0].updates).toInclude({
          completed: true
        });

        expect(mockActions[0].updates.completedAt).toExist();
        done();

      }, done);
    });

    it('should save todo edit and dispatch UPDATE_TODO action', (done) => {
      const store = createMockStore({});
      const action = actions.startSaveEditedTodo(testTodoRef.key, 'abc');

      store.dispatch(action).then(() => {
        const mockActions = store.getActions();

        expect(mockActions[0]).toInclude({
            type: 'UPDATE_TODO',
            id: testTodoRef.key,
        })

        expect(mockActions[0].updates).toInclude({
          text: 'abc',
          edited: true
        });

        expect(mockActions[0].updates.editedAt).toExist();
        done();

      }, done);
    });

    it('should delete todo and dispatch DELETE_TODO action', (done) => {
      const store = createMockStore({});
      const action = actions.startDeleteTodo(testTodoRef.key);

      store.dispatch(action).then(() => {
        const mockActions = store.getActions();

        expect(mockActions[0]).toInclude({
            type: 'DELETE_TODO',
            id: testTodoRef.key,
        })

        done();

      }, done);
    });

    it('should start fetching todos and dispatch ADD_TODOS action', (done) => {
      const store = createMockStore({});
      const action = actions.startAddTodos();

      store.dispatch(action).then(() => {
        const mockActions = store.getActions();

        expect(mockActions[0].type).toEqual('ADD_TODOS');

        expect(mockActions[0].todos.length).toEqual(1);

        expect(mockActions[0].todos[0].text).toEqual('something');

        done();

      }, done);
    });

  });
});
