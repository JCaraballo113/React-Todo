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
        text: "test"
      };

      var res = reducers.todosReducer(df([]), df(action));
      expect(res.length).toBe(1);
      expect(res[0].text).toBe(action.text);
    });

    it('should toggle a todo with provided id', () => {
      var dummyTodos  = [
        {
          id: 1,
          text: "dummy",
          completed : true,
          createdAt : 1,
          completedAt: 123
        }
      ];

      var toggleAction = {
        type: "TOGGLE_TODO",
        id: 1
      };

      var res = reducers.todosReducer(df(dummyTodos), df(toggleAction));
      expect(res[0].completed).toBe(false);
      expect(res[0].completedAt).toBe(undefined);

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
  });

});
