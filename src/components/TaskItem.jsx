import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../actions";

class TaskItem extends Component {
  state = {};
  render() {
    const {
      index,
      task,
      onUpdateStatus,
      onDeleteTask,
      onEditTask,
      onCloseForm,
      onOpenForm
    } = this.props;

    return (
      <tr>
        <td>{index + 1}</td>
        <td>{task.name}</td>
        <td className="text-center">
          <span
            className={"label label-" + (task.status ? "success" : "default")}
            onClick={() => {
              onUpdateStatus(task.id);
            }}
          >
            {task.status ? "Kích hoạt" : "Ẩn"}
          </span>
        </td>
        <td className="text-center">
          <button
            type="button"
            className="btn btn-warning"
            onClick={() => {
              onEditTask(task);
              onOpenForm();
            }}
          >
            <span className="fa fa-pencil mr-5" />Sửa
          </button>
          &nbsp;
          <button
            type="button"
            className="btn btn-danger"
            onClick={() => {
              onDeleteTask(task.id);
              onCloseForm();
            }}
          >
            <span className="fa fa-trash mr-5" />Xóa
          </button>
        </td>
      </tr>
    );
  }
}

const mapStateToProps = state => {
  return {};
};

const mapDispatchToProps = (dispatch, props) => {
  return {
    onUpdateStatus: id => {
      dispatch(actions.updateStatus(id));
    },
    onDeleteTask: id => {
      dispatch(actions.deleteTask(id));
    },
    onCloseForm: () => {
      dispatch(actions.closeForm());
    },
    onOpenForm: () => {
      dispatch(actions.openForm());
    },
    onEditTask: task => {
      dispatch(actions.editTask(task));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TaskItem);
