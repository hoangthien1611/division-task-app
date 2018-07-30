import React, { Component } from "react";
import TaskSearchControl from "./TaskSearchControl";
import TaskSortControl from "./TaskSortControl";

class TaskControl extends Component {
  state = {};
  render() {
    const { onSort, sort } = this.props;
    return (
      <div className="row mt-15">
        <TaskSearchControl />
        <TaskSortControl onSort={onSort} sort={sort} />
      </div>
    );
  }
}

export default TaskControl;
