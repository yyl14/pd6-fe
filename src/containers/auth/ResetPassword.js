import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Grid, Typography } from '@material-ui/core';
import agent from '../../actions/agent';
import { userResetPaswword } from '../../actions/auth';
import ResetPasswordForm from './ResetPasswordForm';

import '../../styles/auth.css';
import '../../styles/index.css';

class ResetPassword extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {}

  render() {
    return (
      <div className="page auth-page">
        <Grid className="auth-page-container" container direction="row" justifyContent="center" alignItems="center">
          <Grid container item xs={6} className="auth-page-col auth-page-col-left" justify="center">
            <Grid container className="auth-title">
              <Typography className="auth-title" variant="h1">
                Go find your puppy!
              </Typography>
            </Grid>
          </Grid>
          <Grid container item xs={6} className="auth-page-col auth-page-col-right" justify="center">
            <ResetPasswordForm />
          </Grid>
          <Grid item xs={12} className="auth-trademark" justifyContent="flex-start">
            <Typography className="auth-trademark" variant="h1">
              PDOGS 6.0
            </Typography>
            <Typography className="auth-trademark" variant="h6">
              Department of Information Management,
              <br />
              Nation Taiwan University
              <br />
              2021 All rights reserved.
            </Typography>
          </Grid>
        </Grid>
      </div>
    );
  }
}

// const mapStateToProps = (state) => ({
//   auth: state.auth,
//   error: state.error,
// });

// const mapDispatchToProps = (dispatch) => ({
//   onSubmit: (input) => dispatch(userForgetPassword(input)),
// });

// ResetPassword.propTypes = {
//   onSubmit: PropTypes.func.isRequired,
// };

// export default connect(mapStateToProps, mapDispatchToProps)(withRouter(ForgetPassword));

export default ResetPassword;
