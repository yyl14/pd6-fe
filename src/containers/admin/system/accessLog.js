import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter, Switch, Route } from 'react-router-dom';

// TODO: do fetch action in level 4 component (remove this import afterwards)
import { fetchAccessLog } from '../../../actions/admin/system';

import AccessLogComponent from '../../../components/admin/system/AccessLog';
import NoMatch from '../../../components/noMatch';

/* This is a level 3 container (main page container) */
class AccessLog extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    const { token } = this.props.auth.user;

    // TODO: do fetch action in level 4 component
    // this.props.fetchAccessLog(0, 10, token);
  }

  render() {
    return (
      <>
        <Switch>
          <Route path='path="/admin/system/accesslog' component={AccessLogComponent} />
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

export default connect(mapStateToProps, { fetchAccessLog })(withRouter(AccessLog));
