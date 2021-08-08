import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Grid, Typography } from '@material-ui/core';
import agent from '../../actions/agent';
import { userSignUp } from '../../actions/auth';
import RegisterForm from './RegisterForm';
import Trademark from '../../components/auth/Trademark';

import '../../styles/auth.css';
import '../../styles/index.css';

class Register extends Component {
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
            <RegisterForm />
          </Grid>
          <Typography className="auth-title" variant="h3">
            Register and adopt a puppy...
          </Typography>
          <Trademark />
        </Grid>
      </div>
    );
  }
}

export default Register;
