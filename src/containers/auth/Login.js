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
    this.state = {
    };
  }

  componentDidMount() {}

  render() {
    return (
      <div className="page auth-page">
        <Grid className="auth-page-container" container direction="row" justifyContent="center" alignItems="center">
          <Grid container item xs={6} className="auth-page-col auth-page-col-left" justify="center">
            <Grid item className="auth-title">
              <Typography className="auth-title" variant="h1">
                Login and train your puppy!
              </Typography>
            </Grid>
          </Grid>
          <Grid container item xs={6} className="auth-page-col auth-page-col-right" justify="center">
            <LoginForm />
          </Grid>
          <Trademark />
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
//   onSubmit: (input) => dispatch(userSignIn(input)),
// });

// Login.propTypes = {
//   onSubmit: PropTypes.func.isRequired,
// };

// export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Login));

export default Login;
