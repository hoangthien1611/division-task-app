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
    this.state = {
      filter: {
        name: "",
        status: -1
      },
      keyword: "",
      sort: {
        by: "name",
        value: 1
      }
    };
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

  handleFilter = filter => {
    filter.filterStatus = parseInt(filter.filterStatus, 10);
    filter.filterName = filter.filterName.toLowerCase();
    this.setState({
      filter: {
        name: filter.filterName,
        status: filter.filterStatus
      }
    });
  };

  handleSearch = key => {
    this.setState({ keyword: key });
  };

  handleSort = (sortBy, sortVal) => {
    this.setState({
      sort: {
        by: sortBy,
        value: sortVal
      }
    });
  };

  render() {
    const { filter, keyword, sort } = this.state;
    const { isDisplayForm } = this.props;

    // if (filter) {
    //   if (filter.status === -1) {
    //     tasks = tasks.filter(
    //       task => task.name.toLowerCase().indexOf(filter.name) !== -1
    //     );
    //   } else {
    //     tasks = tasks.filter(task => {
    //       return (
    //         task.name.toLowerCase().indexOf(filter.name) !== -1 &&
    //         task.status === (filter.status === 1 ? true : false)
    //       );
    //     });
    //   }
    // }

    // if (keyword) {
    //   tasks = tasks.filter(
    //     task => task.name.toLowerCase().indexOf(keyword) !== -1
    //   );
    // }

    // if (sort.by === "name") {
    //   tasks.sort((a, b) => {
    //     if (a.name > b.name) return sort.value;
    //     else if (a.name < b.name) return -sort.value;
    //     else return 0;
    //   });
    // } else {
    //   tasks.sort((a, b) => {
    //     if (a.status > b.status) return -sort.value;
    //     else if (a.status < b.status) return sort.value;
    //     else return 0;
    //   });
    // }

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
            <TaskControl
              onSearch={this.handleSearch}
              onSort={this.handleSort}
              sort={sort}
            />
            <div className="row mt-15">
              <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                <TaskList onFilter={this.handleFilter} />
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
