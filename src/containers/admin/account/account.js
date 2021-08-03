import React, { Component } from 'react';
import { connect } from 'react-redux';

import { Switch, Route, withRouter } from 'react-router-dom';
import AccountSetting from '../../../components/admin/account/setting/AccountSetting';
import AccountList from '../../../components/admin/account/AccountList';
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
          <Route path="/admin/account/account/:accountId/setting" component={AccountSetting} />
          <Route path="/admin/account/account/" component={AccountList} />
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
