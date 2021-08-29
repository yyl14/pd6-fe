import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter, Switch, Route } from 'react-router-dom';

import AccessLogComponent from '../../../components/admin/system/AccessLog';
import NoMatch from '../../../components/noMatch';

/* This is a level 3 container (main page container) */
class AccessLog extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {}

  render() {
    return (
      <>
        <Switch>
          <Route path="/admin/system/accesslog" component={AccessLogComponent} />
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

export default connect(mapStateToProps, {})(withRouter(AccessLog));
