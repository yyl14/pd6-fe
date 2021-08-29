import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter, BrowserRouter as Router } from 'react-router-dom';

import AccountSetting from '../../components/account/AccountSetting';

import Header from '../../components/ui/Header';
import Sidebar from '../../components/ui/Sidebar';

class Account extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {}

  render() {
    return (
      <div>
        <Header />
        <Sidebar />
        <Router>
          <div className="layout-content-container">
            <div className="layout-content">
              <AccountSetting />
            </div>
          </div>
        </Router>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  auth: state.auth,
  user: state.user,
  error: state.error,
});

export default connect(mapStateToProps, {})(withRouter(Account));
