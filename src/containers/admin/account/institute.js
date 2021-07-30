import React, { Component } from 'react';
import { connect } from 'react-redux';

import { Route, Switch, withRouter } from 'react-router-dom';
import { Button, Typography, TextField } from '@material-ui/core';
import InstituteSetting from '../../../components/admin/account/InstituteSetting';
import InstituteList from '../../../components/admin/account/InstituteList';

import CustomTable from '../../../components/ui/CustomTable';

class Institute extends Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }

  componentDidMount() {}

  render() {
    return (
      <div>
        <Switch>
          <Route path="/admin/account/institute/:institute" component={InstituteSetting} />
          <Route path="/admin/account/institute" component={InstituteList} />
        </Switch>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  auth: state.auth,
  error: state.error,
});

export default connect(mapStateToProps, {})(withRouter(Institute));
