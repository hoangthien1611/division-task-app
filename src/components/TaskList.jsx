import React, { Component } from "react";
import TaskItem from "./TaskItem";
import { connect } from "react-redux";

class TaskList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      filterName: "",
      filterStatus: -1
    };
  }

  onChange = event => {
    let name = event.target.name;
    let value = event.target.value;

    this.setState(
      {
        [name]: value
      },
      () => {
        this.props.onFilter(this.state);
      }
    );
  };

  render() {
    const { tasks, onUpdate } = this.props;
    let { filterName, filterStatus } = this.state;
    const elmTask = tasks.map((task, index) => {
      return <TaskItem key={task.id} index={index} task={task} />;
    });

    return (
      <table className="table table-bordered table-hover">
        <thead>
          <tr>
            <th className="text-center" width="10%">
              STT
            </th>
            <th className="text-center" width="45%">
              Tên
            </th>
            <th className="text-center" width="20%">
              Trạng Thái
            </th>
            <th className="text-center" width="25%">
              Hành Động
            </th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td />
            <td>
              <input
                type="text"
                className="form-control"
                name="filterName"
                value={filterName}
                onChange={this.onChange}
              />
            </td>
            <td>
              <select
                className="form-control"
                name="filterStatus"
                value={filterStatus}
                onChange={this.onChange}
              >
                <option value={-1}>Tất Cả</option>
                <option value={0}>Ẩn</option>
                <option value={1}>Kích Hoạt</option>
              </select>
            </td>
            <td />
          </tr>
          {elmTask}
        </tbody>
      </table>
    );
  }
}

const mapStateToProps = state => {
  return {
    tasks: state.tasks
  };
};

export default connect(
  mapStateToProps,
  null
)(TaskList);
