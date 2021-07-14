import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Grid, Typography } from '@material-ui/core';
import agent from '../../actions/agent';
import { userSignIn } from '../../actions/auth';
import LoginForm from './LoginForm';
import Trademark from '../../components/auth/Trademark';

import '../../styles/auth.css';
import '../../styles/index.css';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {}

  render() {
    return (
      <div className="page auth-page">
        <Grid className="auth-page-container" container direction="row" justifyContent="center" alignItems="center">
          <Grid container item xs={6} className="auth-page-col auth-page-col-left" justifyContent="center" />
          <Grid container item xs={6} className="auth-page-col auth-page-col-right" justifyContent="center">
            <LoginForm />
          </Grid>
          <Typography className="auth-title" variant="h1">
            Login and train your puppy!
          </Typography>
          <Trademark />
        </Grid>
      </div>
    );
  }
}

export default Login;
