import React, { Component } from "react";

class TaskItem extends Component {
  state = {};
  render() {
    const { index, name, status, id, onUpdateStatus } = this.props;

    return (
      <tr>
        <td>{index + 1}</td>
        <td>{name}</td>
        <td className="text-center">
          <span
            className={"label label-" + (status ? "success" : "danger")}
            onClick={() => {
              onUpdateStatus(id);
            }}
          >
            {status ? "Kích hoạt" : "Ẩn"}
          </span>
        </td>
        <td className="text-center">
          <button type="button" className="btn btn-warning">
            <span className="fa fa-pencil mr-5" />Sửa
          </button>
          &nbsp;
          <button type="button" className="btn btn-danger">
            <span className="fa fa-trash mr-5" />Xóa
          </button>
        </td>
      </tr>
    );
  }
}

export default TaskItem;
