import React, { Component } from "react";

class TaskForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: "",
      name: "",
      status: false
    };
  }

  componentWillMount() {
    const { taskEditing } = this.props;
    if (taskEditing) {
      this.setState({
        id: taskEditing.id,
        name: taskEditing.name,
        status: taskEditing.status
      });
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps && nextProps.taskEditing) {
      this.setState({
        id: nextProps.taskEditing.id,
        name: nextProps.taskEditing.name,
        status: nextProps.taskEditing.status
      });
    } else if (!nextProps.taskEditing) {
      this.setState({
        id: "",
        name: "",
        status: false
      });
    }
  }

  onChange = event => {
    const target = event.target;
    let name = target.name;
    let value = target.value;
    this.setState({
      [name]: value
    });
  };

  onSubmit = event => {
    event.preventDefault();
    this.props.onSubmit(this.state);
    this.onCancel();
    this.props.onClose();
  };

  onCancel = () => {
    this.setState({
      name: "",
      status: false
    });
  };

  render() {
    const { onClose } = this.props;

    return (
      <div className="panel panel-warning">
        <div className="panel-heading">
          <h3 className="panel-title">
            {this.state.id === "" ? "Thêm Công Việc" : "Cập nhật công việc"}
            <span className="fa fa-times-circle text-right" onClick={onClose} />
          </h3>
        </div>
        <div className="panel-body">
          <form onSubmit={this.onSubmit}>
            <div className="form-group">
              <label>Tên :</label>
              <input
                type="text"
                className="form-control"
                name="name"
                value={this.state.name}
                onChange={this.onChange}
              />
            </div>
            <label>Trạng Thái :</label>
            <select
              className="form-control"
              name="status"
              value={this.state.status}
              onChange={this.onChange}
            >
              <option value={true}>Kích Hoạt</option>
              <option value={false}>Ẩn</option>
            </select>
            <br />
            <div className="text-center">
              <button type="submit" className="btn btn-warning">
                Lưu lại
              </button>&nbsp;
              <button
                type="button"
                className="btn btn-danger"
                onClick={this.onCancel}
              >
                Hủy Bỏ
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default TaskForm;
