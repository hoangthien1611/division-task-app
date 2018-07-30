import * as types from "../constants/ActionsTypes";

export const listAll = () => {
  return {
    type: types.LIST_ALL
  };
};

export const submitTask = task => {
  return {
    type: types.SUBMIT_TASK,
    task
  };
};

export const toggleForm = () => {
  return {
    type: types.TOGGLE_FORM
  };
};

export const openForm = () => {
  return {
    type: types.OPEN_FORM
  };
};

export const closeForm = () => {
  return {
    type: types.CLOSE_FORM
  };
};

export const updateStatus = id => {
  return {
    type: types.UPDATE_STATUS_TASK,
    id
  };
};

export const deleteTask = id => {
  return {
    type: types.DELETE_TASK,
    id
  };
};

export const editTask = task => {
  return {
    type: types.EDIT_TASK,
    task
  };
};

export const filterTable = filter => {
  return {
    type: types.FILTER_TABLE,
    filter
  };
};

export const searchTask = keyWord => {
  return {
    type: types.SEARCH_TASK,
    keyWord
  };
};

export const sortTask = (sortBy, sortVal) => {
  return {
    type: types.SORT_TASK,
    sortBy,
    sortVal
  };
};
