import React, { Component } from 'react';
import { connect } from 'react-redux';

import { Switch, Route, withRouter } from 'react-router-dom';
import UserInfo from '../../../components/admin/account/AccountSetting';
import NoMatch from '../../../components/noMatch';

/* This is a level 3 container (main page container) */
class Account extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {}

  render() {
    return (
      <>
        <Switch>
          <Route path="/admin/account/account/:accountId/setting" component={UserInfo} />
          <Route path="/admin/account/account/" component={UserInfo} />
          <Route component={NoMatch} />
        </Switch>
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  auth: state.auth,
  error: state.error,
});

export default connect(mapStateToProps, {})(withRouter(Account));
