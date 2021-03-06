import { combineReducers } from "redux";
import tasks from "./tasks";
import isDisplayForm from "./isDisplayForm";
import taskEditing from "./taskEditing";
import filterTable from "./filterTable";
import keyWord from "./keyWord";
import sort from "./sort";

const myReducer = combineReducers({
  tasks,
  isDisplayForm,
  taskEditing,
  filterTable,
  keyWord,
  sort
});

export default myReducer;
