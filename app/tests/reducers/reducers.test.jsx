var expect = require('expect');
var df = require('deep-freeze-strict');

var reducers = require('reducers');

describe('Reducers', () => {
  describe('searchTextReducer', () => {
    it('should set searchText', () => {
      var action = {
        type: "SET_SEARCH_TEXT",
        searchText: "Pet"
      };

      var res = reducers.searchTextReducer(df(''), df(action));

      expect(res).toEqual(action.searchText);
    });
  });

  describe('showCompletedReducer', () => {
    it('should set showCompleted to the opposite', () => {
      var action = {
        type: "TOGGLE_SHOW_COMPLETED"
      };

      var res = reducers.showCompletedReducer(df(false), df(action));

      expect(res).toEqual(true);
    });
  });

  describe('todosReducer', () => {
    it('should add a new todo', () => {
      var action = {
        type: "ADD_TODO",
        todo: {
          id: 'abc123',
          text: 'Somethin to do',
          completed: false,
          createdAt: 1234,
          edited: false,
          editable: false
        }
      };

      var res = reducers.todosReducer(df([]), df(action));
      expect(res.length).toBe(1);
      expect(res[0]).toBe(action.todo);
    });

    it('should update a todo with completed status', () => {
      var dummyTodos  = [
        {
          id: '123',
          text: "dummy",
          completed : true,
          createdAt : 1,
          completedAt: 123
        }
      ];
      var updates = {
        completed: false,
        completedAt: null,
      }
      var action = {
        type: "UPDATE_TODO",
        id: dummyTodos[0].id,
        updates
      };

      var res = reducers.todosReducer(df(dummyTodos), df(action));
      expect(res[0].completed).toBe(updates.completed);
      expect(res[0].completedAt).toBe(updates.completedAt);
      expect(res[0].text).toEqual(dummyTodos[0].text);

    });

    it('should add existing todos', () => {
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

      var res = reducers.todosReducer(df([]), df(action));

      expect(res.length).toBe(1);
      expect(res[0]).toEqual(todos[0])
    });

    it('should update a todo when it is edited and saved', () => {
      var todos = [
        {
          id: '123',
          text: 'b',
          completed: false,
          completedAt: 123,
          createdAt: 1,
          editable: true,
          edited: false,
          editedAt: undefined
        }
      ];

      var updates = {
        text: 'bloodbath',
        edited: true,
        editedAt: 123
      };

      var action = {
        type: 'UPDATE_TODO',
        id: todos[0].id,
        updates
      };

      var res = reducers.todosReducer(df(todos), df(action));

      expect(res[0].text).toEqual('bloodbath');
      expect(res[0].edited).toBe(true);
      expect(res[0].editedAt).toEqual(updates.editedAt)
    });

    it('should delete todo', () => {
      var todos = [
        {
          id: 1,
          text: 'b',
          completed: false,
          completedAt: 123,
          createdAt: 1,
          editable: false,
          edited: false,
          editedAt: undefined
        },
        {
          id: 2,
          text: 'b',
          completed: false,
          completedAt: 123,
          createdAt: 1,
          editable: false,
          edited: false,
          editedAt: undefined
        }
      ];
      var action = {
        type: 'DELETE_TODO',
        id: todos[0].id
      };

      var res = reducers.todosReducer(df(todos), df(action));

      expect(res.length).toEqual(1);
    });

    it('should clear all todos when user logs out', () => {
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
        type: 'LOGOUT'
      };

      var res = reducers.todosReducer(df(todos), df(action));

      expect(res).toEqual([]);
    });
  });

  describe('authReducer', () => {
    it('should store uid on LOGIN', () => {
      const action = {
        type: 'LOGIN',
        uid: '123'
      };

      const res = reducers.authReducer(undefined, df(action));

      expect(res.uid).toEqual(action.uid);
    });

    it('should return an empty object on LOGOUT', () => {
      const auth = {
        uid: '123'
      };

      const action = {
        type: 'LOGOUT'
      };

      const res = reducers.authReducer(df(auth), df(action));

      expect(res).toEqual({});
    });
  });

});
