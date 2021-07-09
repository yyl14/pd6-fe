import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Button, TextField } from '@material-ui/core';
// import { borders, borderradius } from '@material-ui/system';
import agent from '../../actions/agent';
import { userForgetPassword } from '../../actions/auth';

import '../../styles/auth.css';
import '../../styles/index.css';

function checkEmailFormat(email) {
  // console.log('checkEmailFormat: ', email.indexOf('@ntu.edu.tw'));
  const index = email.indexOf('@ntu.edu.tw');
  if (email === '') {
    return '';
  }
  if (index === -1) {
    return 'Invalid email address';
  }
  return '';
}

class ForgetPasswordForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      error: false,
      errorText: '',
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {}

  handleChange(event) {
    const error = checkEmailFormat(event.target.value);
    if (error === 'Invalid email address') {
      this.setState({ email: event.target.value, errorText: error, error: true });
    } else {
      this.setState({ email: event.target.value, errorText: '', error: false });
    }
  }

  handleSubmit(event) {
    // event.preventDefault();
    // console.log(this.state);
    const value = this.state;
    if (value.error) {
      return;
    }
    const { onSubmit } = this.props;
    onSubmit(value);
  }

  render() {
    const value = this.state;
    return (
      <div className="login-page">
        <p>Hello Pdogs!</p>
        <TextField
          required
          error={value.error}
          helperText={value.errorText}
          placeholder="Email"
          value={value.email}
          onChange={this.handleChange}
          onKeyPress={(event) => {
            if (event.key === 'Enter') this.handleSubmit();
          }}
        />
        <Button type="submit" color="primary" onClick={this.handleSubmit} onKeyPress={this.handleSubmit}>
          Send
        </Button>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  auth: state.auth,
  error: state.error,
});

const mapDispatchToProps = (dispatch) => ({
  onSubmit: (input) => dispatch(userForgetPassword(input)),
});

ForgetPasswordForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(ForgetPasswordForm));
