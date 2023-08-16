const initialState = { todo: [], inProgress: [], done: [] };

export const todoData = (state, action) => {
  state = initialState;
  switch (action.type) {
    case "SET_TODO":
      return { ...state, todo: [...action.data] };
    case "SET_INPROGRESS":
      return { ...state, inProgress: [...action.data] };
    case "SET_DONE":
      return { ...state, done: [...action.data] };
    default:
      return "No action";
  }
};
