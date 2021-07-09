import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Container } from '@material-ui/core';
import agent from '../../actions/agent';
import { userSignIn } from '../../actions/auth';
import LoginForm from './LoginForm';

import '../../styles/auth.css';
import '../../styles/index.css';

class Login extends Component {
  // constructor(props) {
  //   super(props);
  //   this.state = {
  //     userId: '',
  //     password: '',
  //   };
  //   this.handleChange1 = this.handleChange1.bind(this);
  //   this.handleChange2 = this.handleChange2.bind(this);
  //   this.handleSubmit = this.handleSubmit.bind(this);
  // }

  componentDidMount() {}

  // handleChange1(event) {
  //   this.setState({ userId: event.target.value });
  // }

  // handleChange2(event) {
  //   this.setState({ password: event.target.value });
  // }

  // handleSubmit(event) {
  //   event.preventDefault();
  //   const { onSubmit } = this.props;
  //   onSubmit(this.state);
  // }

  render() {
    return (
      <div className="page login-page">
        <h1 className="login-title">Login and train your puppy!</h1>
        <LoginForm />
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
