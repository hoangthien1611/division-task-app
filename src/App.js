import React, { Component } from "react";
import "./App.css";
import TaskForm from "./components/TaskForm";
import TaskControl from "./components/TaskControl";
import TaskList from "./components/TaskList";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tasks: [],
      isDisplayForm: false,
      taskEditing: null
    };
  }

  componentWillMount() {
    if (localStorage && localStorage.getItem("tasks")) {
      const tasks = JSON.parse(localStorage.getItem("tasks"));
      this.setState({ tasks });
    } else {
      this.handleGenerateData();
    }
  }

  handleGenerateData = () => {
    var tasks = [
      {
        id: this.generateId(),
        name: "Training React",
        status: true
      },
      {
        id: this.generateId(),
        name: "Having lunch",
        status: false
      },
      {
        id: this.generateId(),
        name: "Going out",
        status: true
      }
    ];

    this.setState({ tasks });
    localStorage.setItem("tasks", JSON.stringify(tasks));
  };

  s4() {
    return Math.floor(1 + Math.random() * 0x10000)
      .toString(16)
      .substring(1);
  }

  generateId() {
    return (
      this.s4() +
      "-" +
      this.s4() +
      "-" +
      this.s4() +
      "-" +
      this.s4() +
      "-" +
      this.s4()
    );
  }

  handleDisplayForm = () => {
    if (this.state.isDisplayForm !== null) {
      this.setState({
        isDisplayForm: true,
        taskEditing: null
      });
    } else {
      this.setState({
        isDisplayForm: !this.state.isDisplayForm,
        taskEditing: null
      });
    }
  };

  onCloseForm = () => {
    this.setState({
      isDisplayForm: true,
      taskEditing: null
    });
  };

  handleSubmitForm = data => {
    let { tasks } = this.state;
    data.status = data.status === "true" ? true : false;

    if (data.id === "") {
      data.id = this.generateId();
      tasks.push(data);
    } else {
      let index = this.findIndexById(data.id);
      tasks[index] = data;
    }

    this.setState({
      tasks: tasks,
      taskEditing: null
    });

    localStorage.setItem("tasks", JSON.stringify(tasks));
  };

  handleUpdateStatus = id => {
    const { tasks } = this.state;
    let index = this.findIndexById(id);
    if (index > -1) {
      tasks[index].status = !tasks[index].status;
      this.setState({
        tasks
      });
      localStorage.setItem("tasks", JSON.stringify(tasks));
    }
  };

  findIndexById = id => {
    const { tasks } = this.state;
    return tasks.findIndex(task => task.id === id);
  };

  handleDelete = id => {
    const { tasks } = this.state;
    let index = this.findIndexById(id);
    if (index > -1) {
      tasks.splice(index, 1);
      this.setState({
        tasks
      });
      localStorage.setItem("tasks", JSON.stringify(tasks));
    }
  };

  handleUpdate = id => {
    const { tasks } = this.state;
    let index = this.findIndexById(id);
    if (index > -1) {
      this.setState({
        taskEditing: tasks[index]
      });
    }
    this.onShowForm();
  };

  onShowForm = () => {
    this.setState({
      isDisplayForm: true
    });
  };

  render() {
    const { tasks, isDisplayForm, taskEditing } = this.state;

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
            {isDisplayForm ? (
              <TaskForm
                onSubmit={this.handleSubmitForm}
                onClose={this.onCloseForm}
                taskEditing={taskEditing}
              />
            ) : (
              ""
            )}
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
                <TaskList
                  tasks={tasks}
                  onUpdateStatus={this.handleUpdateStatus}
                  onDelete={this.handleDelete}
                  onUpdate={this.handleUpdate}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
