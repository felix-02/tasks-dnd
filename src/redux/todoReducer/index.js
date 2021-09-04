export function getTodos() {
  return {
    type: "GET_TODOS",
  };
}
export function addTodos(task) {
  return {
    type: "ADD_TODO",
    payload: task,
  };
}
export function editTodos(task) {
  return {
    type: "EDIT_TODO",
    payload: task,
  };
}

const initState = [];

function todoReducer(state = initState, action) {
  switch (action.type) {
    case "ADD_TODO":
      return [...state, action.payload];
    case "EDIT_TODO":
      return state.map((x) =>
        x.id === action.payload.id ? action.payload : x
      );
    case "DELETE_TASK":
      return state.filter((itm) => itm.id !== action.payload);
    default:
      return state;
  }
}

export default todoReducer;
