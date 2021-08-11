import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Grid, Typography } from '@material-ui/core';
import agent from '../../actions/agent';
import { userForgetPassword } from '../../actions/user/auth';
import Trademark from '../../components/auth/Trademark';
import ForgetPasswordForm from './ForgetPasswordForm';

import '../../styles/auth.css';
import '../../styles/index.css';

class ForgetPassword extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {}

  render() {
    return (
      <div className="page auth-page">
        <Grid className="auth-page-container" container direction="row" justifyContent="center" alignItems="center">
          <Grid container item xs={6} className="auth-page-col auth-page-col-left" justifyContent="center">
            <Grid item className="auth-title" />
          </Grid>
          <Grid container item xs={6} className="auth-page-col auth-page-col-right" justifyContent="center">
            <ForgetPasswordForm />
          </Grid>
          <Typography className="auth-title" variant="h3">
            Lost your puppy? Reset Password
          </Typography>
          <Trademark />
        </Grid>
      </div>
    );
  }
}

export default ForgetPassword;
