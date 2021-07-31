import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import '../../../styles/admin/accessLog.css';
import CustomTable from '../../../components/admin/system/accessLog/CustomTable';

class AccessLog extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {}

  render() {
    return (
      <div className="page">
        <div className="main-bar center">
          main bar
        </div>
        <div className="horizontal container">
          <div className="side-bar center">
            side-bar
          </div>
          <div className="content center">
            <div className="panel">
              <CustomTable />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  auth: state.auth,
  error: state.error,
});

export default connect(mapStateToProps, {})(withRouter(AccessLog));
