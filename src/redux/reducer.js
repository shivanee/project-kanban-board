const initialState = { todo: [], inProgress: [], done: [] };

export const todoData = (state=initialState, action) => { 
  switch (action.type) {
    case "SET_TODO":
      return { ...state, todo: [...action.data] };
    case "SET_IN_PROGRESS":
      return { ...state, inProgress: [...action.data] };
    case "SET_DONE":
      return { ...state, done: [...action.data] };
    default:
      return state;
  }
};

export const todoDataById=(task=[],action)=>{
  switch (action.type) {
    case "SET_TASK":
      return action.data;
    default:
      return task;
  }
};