import * as types from "../constants/ActionsTypes";

const data = JSON.parse(localStorage.getItem("tasks"));
const initialState = data ? data : [];

const s4 = () => {
  return Math.floor(1 + Math.random() * 0x10000)
    .toString(16)
    .substring(1);
};

const generateId = () => {
  return s4() + "-" + s4() + "-" + s4() + "-" + s4() + "-" + s4();
};

const findIndexById = (tasks, id) => {
  return tasks.findIndex(task => task.id === id);
};

let index = -1;

const myReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.LIST_ALL:
      return state;
    case types.SUBMIT_TASK:
      const task = {
        id: action.task.id,
        name: action.task.name,
        status: action.task.status === "true" ? true : false
      };
      if (task.id) {
        index = findIndexById(state, task.id);
        state[index] = task;
      } else {
        task.id = generateId();
        state.push(task);
      }
      localStorage.setItem("tasks", JSON.stringify(state));
      return [...state];
    case types.UPDATE_STATUS_TASK:
      index = findIndexById(state, action.id);
      if (index > -1) {
        state[index] = {
          ...state[index],
          status: !state[index].status
        };
        localStorage.setItem("tasks", JSON.stringify(state));
      }
      return [...state];
    case types.DELETE_TASK:
      index = findIndexById(state, action.id);
      if (index > -1) {
        state.splice(index, 1);
        localStorage.setItem("tasks", JSON.stringify(state));
      }
      return [...state];
    default:
      return state;
  }
};

export default myReducer;
