import React, { Component } from "react";
import TaskItem from "./TaskItem";
import { connect } from "react-redux";
import * as actions from "../actions";

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

    let filter = {
      filterName: name === "filterName" ? value : this.state.filterName,
      filterStatus: name === "filterStatus" ? value : this.state.filterStatus
    };

    this.setState({
      [name]: value
    });
    this.props.onFilterTable(filter);
  };

  render() {
    let { tasks, filter, keyWord } = this.props;
    let { filterName, filterStatus } = this.state;

    if (filter) {
      if (filter.filterStatus === -1) {
        tasks = tasks.filter(
          task => task.name.toLowerCase().indexOf(filter.filterName) !== -1
        );
      } else {
        tasks = tasks.filter(task => {
          return (
            task.name.toLowerCase().indexOf(filter.filterName) !== -1 &&
            task.status === (filter.filterStatus === 1 ? true : false)
          );
        });
      }
    }

    if (keyWord) {
      tasks = tasks.filter(
        task => task.name.toLowerCase().indexOf(keyWord) !== -1
      );
    }

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
    tasks: state.tasks,
    filter: state.filterTable,
    keyWord: state.keyWord
  };
};

const mapDispatchToProps = (dispatch, props) => {
  return {
    onFilterTable: filter => {
      dispatch(actions.filterTable(filter));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TaskList);
