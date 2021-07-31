import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import CustomTable from '../../../components/admin/system/accessLog/CustomTable';
import { fetchAccessLog } from '../../../actions/admin/system';

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
        <CustomTable />
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  auth: state.auth,
  error: state.error,
});

export default connect(mapStateToProps, { fetchAccessLog })(withRouter(AccessLog));
