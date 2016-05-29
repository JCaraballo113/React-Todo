var uuid = require('node-uuid');
var moment = require('moment');

export var searchTextReducer = (state = '', action) => {
  switch(action.type) {
    case "SET_SEARCH_TEXT":
      return action.searchText;
    default:
      return state;
  };
};

export var showCompletedReducer = (state = false, action) => {
  switch(action.type) {
    case "TOGGLE_SHOW_COMPLETED":
      return !state;
    default:
    return state;
  };
};

export var todosReducer = (state=[], action) => {
  switch (action.type) {
    case "ADD_TODO":
      return [
        ...state,
        {
          id: uuid(),
          text: action.text,
          completed: false,
          createdAt: moment().unix(),
          completedAt: undefined,
          editable: false,
          edited: false,
          editedAt: undefined
        }
      ];
    case "TOGGLE_TODO":
      return state.map((todo) => {
        if(todo.id === action.id) {
          var nextCompleted = !todo.completed;
          return {
            ...todo,
            completed: nextCompleted,
            completedAt: nextCompleted ? moment().unix() : undefined
          };
        }
        else {
          return todo;
        }
      });
      case "ADD_TODOS":
        return [
          ...state,
          ...action.todos
        ];
      case "EDIT_TODO":
        return state.map((todo) =>{
          if(todo.id === action.id) {
            var editable = !todo.editable;

            return {
              ...todo,
              editable: editable
            };
          }
          else {
            return todo;
          }
        });
    case "DELETE_TODO":
      return state.filter((todo) => {
        return todo.id !== action.id
      });
    case "SAVE_EDIT":
      return state.map((todo) => {
        if(todo.id === action.id){
          return {
            ...todo,
            text: action.text,
            editable: false,
            edited: true,
            editedAt: moment().unix()
          }
        }
        else {
          return todo;
        }
      });
    case "RESET_EDITABLE_TODOS":
    return state.map((todo) => {
      return {
        ...todo,
        editable: false
      }
    });
    default:
      return state;
  };
};
