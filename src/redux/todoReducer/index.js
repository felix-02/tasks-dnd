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

const initState = [];

function todoReducer(state = initState, action) {
  switch (action.type) {
    case "ADD_TODO":
      return [...state, action.payload];
    default:
      return state;
  }
}

export default todoReducer;
