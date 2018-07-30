import * as types from "../constants/ActionsTypes";

const initialState = {
  filterName: "",
  filterStatus: -1
};

const myReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.FILTER_TABLE:
      return {
        filterName: action.filter.filterName.toLowerCase(),
        filterStatus: parseInt(action.filter.filterStatus, 10)
      };
    default:
      return state;
  }
};

export default myReducer;
