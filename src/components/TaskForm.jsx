import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../actions";

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
    } else {
      this.onClear();
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
      this.onClear();
    }
  }

  onCloseForm = () => {
    this.props.onCloseForm();
  };

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
    this.props.onSubmitTask(this.state);
    this.onClear();
    this.props.onCloseForm();
  };

  onClear = () => {
    this.setState({
      name: "",
      status: false
    });
  };

  render() {
    const { isDisplayForm, onCloseForm } = this.props;

    if (!isDisplayForm) return null;
    return (
      <div className="panel panel-warning">
        <div className="panel-heading">
          <h3 className="panel-title">
            {this.state.id === "" ? "Thêm Công Việc" : "Cập nhật công việc"}
            <span
              className="fa fa-times-circle text-right"
              onClick={this.onCloseForm}
            />
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
                onClick={this.onClear}
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

const mapStateToProps = state => {
  return {
    isDisplayForm: state.isDisplayForm,
    taskEditing: state.taskEditing
  };
};

const mapDispatchToProps = (dispatch, props) => {
  return {
    onSubmitTask: task => {
      dispatch(actions.submitTask(task));
    },
    onCloseForm: () => {
      dispatch(actions.closeForm());
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TaskForm);
