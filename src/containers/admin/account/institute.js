import React, { Component } from 'react';
import { connect } from 'react-redux';

import { Route, Switch, withRouter } from 'react-router-dom';
import { Button, Typography, TextField } from '@material-ui/core';
import InstituteSetting from '../../../components/admin/account/InstituteSetting';
import InstituteList from '../../../components/admin/account/InstituteList';
import NoMatch from '../../../components/noMatch';

import CustomTable from '../../../components/ui/CustomTable';

/* This is a level 3 container (main page container) */
class Institute extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {}

  render() {
    return (
      <>
        <Switch>
          <Route path="/admin/account/institute/:institute" component={InstituteSetting} />
          <Route path="/admin/account/institute" component={InstituteList} />
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

export default connect(mapStateToProps, {})(withRouter(Institute));
