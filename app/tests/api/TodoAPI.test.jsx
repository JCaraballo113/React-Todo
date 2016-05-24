var expect = require('expect');

var TodoAPI = require('TodoAPI');

describe('TodoAPI', () => {
  beforeEach(() => {
    localStorage.removeItem('todos');
  });

  it('should exist', () => {
    expect(TodoAPI).toExist();
  });

  describe('setTodos', () => {
    it('should set valid todos array', () => {
      var todos = [{
        id: 1,
        text: "test",
        completed: false
      }];

      TodoAPI.setTodos(todos);

      var actualTodos = JSON.parse(localStorage.getItem('todos'));
      expect(actualTodos).toEqual(todos);
    });

    it('should NOT set invalid todos array', () => {
      var badTodos = {a : 'b'};

      TodoAPI.setTodos(badTodos);

      expect(localStorage.getItem('todos')).toBe(null);
    });
  });

  describe('getTodos', () => {
    it('should return empty array for bad localstorage data', () => {
      var actualTodos = TodoAPI.getTodos();
      expect(actualTodos).toEqual([]);
    });

    it('should return todos if valid array in localStorage', () => {
      var todos = [{
        id: 1,
        text: "test",
        completed: false
      }];
      localStorage.setItem('todos', JSON.stringify(todos));
      var actualTodos = TodoAPI.getTodos();
      expect(actualTodos).toEqual(todos);
    });
  });

  describe('filterTodos', () => {
    var todos = [{
      id: 1,
      text: 'some text',
      completed: true
    }, {
      id: 2,
      text: 'test',
      completed: false
    }, {
      id: 3,
      text: 'test2',
      completed: true
    }];

    it('should return all items if showCompleted is true', () => {
      var filteredTodos = TodoAPI.filterTodos(todos,true, '');
      expect(filteredTodos.length).toBe(3);
    });

    it('should return only items with non-completed status if showCompleted is false', () => {
      var filteredTodos = TodoAPI.filterTodos(todos,false, '');
      expect(filteredTodos.length).toBe(1);
    });

    it('should sort by completed status', () => {
      var filteredTodos = TodoAPI.filterTodos(todos,true, '');
      expect(filteredTodos[0].completed).toBe(false);
    });

    it('should return all todos when searchText is empty', () => {
      var filteredTodos = TodoAPI.filterTodos(todos,true, '');
      expect(filteredTodos.length).toBe(3);
    });

    it('should return only todos with searchText inside them', () => {
      var filteredTodos = TodoAPI.filterTodos(todos,true, 'some');
      expect(filteredTodos.length).toBe(1);
    });
  });
});
