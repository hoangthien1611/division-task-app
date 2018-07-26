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
      isDisplayForm: false
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
    let isDisplayForm = !this.state.isDisplayForm;
    this.setState({ isDisplayForm });
  };

  handleSubmitForm = data => {
    let { tasks } = this.state;
    let task = {
      id: this.generateId(),
      name: data.name,
      status: data.status === "true" ? true : false
    };

    tasks.push(task);
    this.setState({
      tasks: tasks
    });

    localStorage.setItem("tasks", JSON.stringify(tasks));
  };

  handleUpdateStatus = id => {
    console.log(id);
  };

  render() {
    const { tasks, isDisplayForm } = this.state;

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
                onClose={this.handleDisplayForm}
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
