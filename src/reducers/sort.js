import * as types from "../constants/ActionsTypes";

const initialState = {
  by: "name",
  value: 1
};

const myReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.SORT_TASK:
      return {
        by: action.sortBy,
        value: action.sortVal
      };
    default:
      return state;
  }
};

export default myReducer;
