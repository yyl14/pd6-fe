import React, { Component } from 'react';
import { connect } from 'react-redux';

import { Switch, Route, withRouter } from 'react-router-dom';
import UserInfo from '../../../components/admin/account/UserInfo';

class Account extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {}

  render() {
    return (
      <div>
        <Switch>
          <Route path="/admin/account/account/:accountId" component={UserInfo} />
          <Route path="/admin/account/account" component={UserInfo} />
        </Switch>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  auth: state.auth,
  error: state.error,
});

export default connect(mapStateToProps, {})(withRouter(Account));
