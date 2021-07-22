import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { withCookies, Cookies } from 'react-cookie';
import { instanceOf } from 'prop-types';
import { Grid, Typography } from '@material-ui/core';
import agent from '../../actions/agent';
import { userSignIn } from '../../actions/auth';
import LoginForm from './LoginForm';
import Trademark from '../../components/auth/Trademark';

import '../../styles/auth.css';
import '../../styles/index.css';

const propTypes = {
  cookies: instanceOf(Cookies).isRequired,
};

class Login extends Component {
  static propTypes = {
    cookies: instanceOf(Cookies).isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
      loading: false,
    };
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.auth.isAuthenticated) {
      nextProps.cookies.set('id', nextProps.auth.user.id, {
        path: '/',
        expires: new Date(Date.now() + 86400), // cookie expires after 1 day
      });

      nextProps.cookies.set('token', nextProps.auth.user.token, {
        path: '/',
        expires: new Date(Date.now() + 86400), // cookie expires after 1 day
      });
      nextProps.history.push('/');
    }

    return null;
  }

  componentDidMount() {
    document.title = 'Login';
  }

  signIn = (username, password) => {
    this.props.userSignIn(username, password);
  };

  render() {
    return (
      <div className="page auth-page">
        <Grid className="auth-page-container" container direction="row" justifyContent="center" alignItems="center">
          <Grid container item xs={6} className="auth-page-col auth-page-col-left" justifyContent="center" />
          <Grid container item xs={6} className="auth-page-col auth-page-col-right" justifyContent="center">
            <LoginForm userSignIn={this.signIn} />
          </Grid>
          <Typography className="auth-title" variant="h3">
            Login and train your puppy!
          </Typography>
          <Trademark />
        </Grid>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  auth: state.auth,
  error: state.error,
});

export default connect(mapStateToProps, { userSignIn })(withRouter(withCookies(Login)));
