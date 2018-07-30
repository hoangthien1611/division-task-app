import React, { Component } from "react";
import "./App.css";
import TaskForm from "./components/TaskForm";
import TaskControl from "./components/TaskControl";
import TaskList from "./components/TaskList";
import { connect } from "react-redux";
import * as actions from "./actions";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  handleDisplayForm = () => {
    const { taskEditing, onOpenForm, onToggleForm, onClearTask } = this.props;
    if (taskEditing && taskEditing.id !== "") {
      onOpenForm();
    } else {
      onToggleForm();
    }
    onClearTask({
      id: "",
      name: "",
      status: false
    });
  };

  render() {
    const { isDisplayForm } = this.props;

    return (
      <div className="container">
        <div className="text-center">
          <h1>Quản Lý Công Việc</h1>
          <hr />
        </div>
        <div className="row">
          <div
            className={
              isDisplayForm ? "col-xs-4 col-sm-4 col-md-4 col-lg-4" : ""
            }
          >
            <TaskForm />
          </div>
          <div
            className={
              isDisplayForm
                ? "col-xs-8 col-sm-8 col-md-8 col-lg-8"
                : "col-xs-12 col-sm-12 col-md-12 col-lg-12"
            }
          >
            <button
              type="button"
              className="btn btn-primary"
              onClick={this.handleDisplayForm}
            >
              <span className="fa fa-plus mr-5" />Thêm Công Việc
            </button>
            <TaskControl />
            <div className="row mt-15">
              <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                <TaskList />
              </div>
            </div>
          </div>
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
    onToggleForm: () => {
      dispatch(actions.toggleForm());
    },
    onClearTask: task => {
      dispatch(actions.editTask(task));
    },
    onOpenForm: () => {
      dispatch(actions.openForm());
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
