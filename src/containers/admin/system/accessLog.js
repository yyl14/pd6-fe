import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import CustomTable from '../../../components/admin/system/accessLog/CustomTable';
import { fetchAccessLog } from '../../../actions/admin/system';

// temp data, will be replaced by the data from the api.
function createData(LogID, StudentID, RealName, Username, IP, ResourcePath, RequestMethod, AccessTime) {
  return {
    LogID, StudentID, RealName, Username, IP, ResourcePath, RequestMethod, AccessTime,
  };
}

const data = [
  createData(22, 'B07705002', '黃祥祥', 'shiba', '106.114.0.1', 22, 22, '2021-06-20, 09:21:44'),
  createData(22, 'B07705002', '黃祥祥', 'shiba', '106.114.0.1', 22, 22, '2021-06-20, 09:21:44'),
  createData(22, 'B07705002', '黃祥祥', 'shiba', '106.114.0.1', 22, 22, '2021-06-20, 09:21:44'),
  createData(22, 'B07705002', '黃祥祥', 'shiba', '106.114.0.1', 22, 22, '2021-06-20, 09:21:44'),
  createData(22, 'B07705002', '黃祥祥', 'shiba', '106.114.0.1', 22, 22, '2021-06-20, 09:21:44'),
  createData(22, 'B07705002', '黃祥祥', 'shiba', '106.114.0.1', 22, 22, '2021-06-20, 09:21:44'),
];

class AccessLog extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    const { token } = this.props.auth.user;
    this.props.fetchAccessLog(0, 10, token);
  }

  render() {
    return (
      <div className="page">
        <h1>Access Log</h1>
        <CustomTable data={data} />
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  auth: state.auth,
  error: state.error,
});

export default connect(mapStateToProps, { fetchAccessLog })(withRouter(AccessLog));
