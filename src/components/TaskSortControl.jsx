import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../actions";

class TaskSortControl extends Component {
  render() {
    let { onSortTask, sort } = this.props;

    return (
      <div className="col-xs-6 col-sm-6 col-md-6 col-lg-6">
        <div className="dropdown">
          <button
            className="btn btn-primary dropdown-toggle"
            type="button"
            id="dropdownMenu1"
            data-toggle="dropdown"
            aria-haspopup="true"
            aria-expanded="true"
          >
            Sắp Xếp <span className="fa fa-caret-square-o-down ml-5" />
          </button>
          <ul className="dropdown-menu" aria-labelledby="dropdownMenu1">
            <li onClick={() => onSortTask("name", 1)}>
              <a
                role="button"
                className={
                  sort.by === "name" && sort.value === 1 ? "sort_selected" : ""
                }
              >
                <span className="fa fa-sort-alpha-asc pr-5">Tên A-Z</span>
              </a>
            </li>
            <li onClick={() => onSortTask("name", -1)}>
              <a
                role="button"
                className={
                  sort.by === "name" && sort.value === -1 ? "sort_selected" : ""
                }
              >
                <span className="fa fa-sort-alpha-desc pr-5">Tên Z-A</span>
              </a>
            </li>
            <li role="separator" className="divider" />
            <li onClick={() => onSortTask("status", 1)}>
              <a
                role="button"
                className={
                  sort.by === "status" && sort.value === 1
                    ? "sort_selected"
                    : ""
                }
              >
                Trạng Thái Kích Hoạt
              </a>
            </li>
            <li onClick={() => onSortTask("status", -1)}>
              <a
                role="button"
                className={
                  sort.by === "status" && sort.value === -1
                    ? "sort_selected"
                    : ""
                }
              >
                Trạng Thái Ẩn
              </a>
            </li>
          </ul>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    sort: state.sort
  };
};

const mapDispatchToProps = (dispatch, props) => {
  return {
    onSortTask: (sortBy, sortVal) => {
      dispatch(actions.sortTask(sortBy, sortVal));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TaskSortControl);
