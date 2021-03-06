var expect = require('expect');
var moment = require('moment');
var TodoAPI = require('TodoAPI');

describe('TodoAPI', () => {
  beforeEach(() => {
    localStorage.removeItem('todos');
  });

  it('should exist', () => {
    expect(TodoAPI).toExist();
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

  describe('getFormattedDate', () => {
    it('should return a valid date when a message, timestamp and format are passed', () => {
      var now = moment().unix();

      var validDate = TodoAPI.getFormattedDate("Created ", now, 'MMM Do YYYY @ h:mm a');

      expect(validDate).toBe(TodoAPI.getFormattedDate("Created ", now, 'MMM Do YYYY @ h:mm a'));
    });

    it('should return a valid date when no message or desiredFormat is input', () => {
      var now = moment().unix();
      var validDate = TodoAPI.getFormattedDate("", now, '');

      expect(validDate).toBe(TodoAPI.getFormattedDate("", now, ''));
    });

    it('should return an empty string when no timestamp is provided or invalid', () => {
      var invalidDate = TodoAPI.getFormattedDate("", null, '');
      var invalidDate2 = TodoAPI.getFormattedDate("", 'poop', '');

      expect(invalidDate).toBe('');
      expect(invalidDate2).toBe('');
    });
  });
});
