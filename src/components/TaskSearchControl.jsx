import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../actions";

class TaskSearchControl extends Component {
  constructor(props) {
    super(props);
    this.state = {
      keyword: ""
    };
  }

  onChange = event => {
    this.setState({ keyword: event.target.value });
  };

  render() {
    let { keyword } = this.state;
    const { onSearchTask } = this.props;

    return (
      <div className="col-xs-6 col-sm-6 col-md-6 col-lg-6">
        <div className="input-group">
          <input
            type="text"
            className="form-control"
            placeholder="Nhập từ khóa..."
            name="keyword"
            value={keyword}
            onChange={this.onChange}
          />
          <span className="input-group-btn">
            <button
              className="btn btn-primary"
              type="button"
              onClick={() => onSearchTask(keyword)}
            >
              <span className="fa fa-search mr-5" />Tìm
            </button>
          </span>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {};
};

const mapDispatchToProps = (dispatch, props) => {
  return {
    onSearchTask: key => {
      dispatch(actions.searchTask(key));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TaskSearchControl);
