import * as types from "../constants/ActionsTypes";

const initialState = "";

const myReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.SEARCH_TASK:
      return action.keyWord;
    default:
      return state;
  }
};

export default myReducer;
