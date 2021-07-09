import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import {
  Button,
  TextField,
  Card,
  CardContent,
  Container,
  Grid,
  Typography,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@material-ui/core';
import { borders, borderRadius } from '@material-ui/system';
import { TrainRounded } from '@material-ui/icons';
import agent from '../../actions/agent';
import { userForgetPassword } from '../../actions/auth';

import '../../styles/auth.css';
import '../../styles/index.css';

function checkEmailFormat(email) {
  // console.log('checkEmailFormat: ', email.indexOf('@ntu.edu.tw'));
  const index1 = email.indexOf('@ntu.edu.tw'); // 台大
  const index2 = email.indexOf('@mail.ntust.edu.tw'); // 台科大
  const index3 = email.indexOf('@ntnu.edu.tw'); // 台師大
  if (email === '') {
    return '';
  }
  if (index1 <= 0 && index2 <= 0 && index3 <= 0) {
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
      disabled: true,
      popUp: false,
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleClosePopUp = this.handleClosePopUp.bind(this);
  }

  componentDidMount() {}

  handleChange(event) {
    if (event.target.value === '') {
      this.setState({
        email: event.target.value,
        errorText: '',
        error: false,
        disabled: true,
      });
      return;
    }
    const error = checkEmailFormat(event.target.value);
    if (error === 'Invalid email address') {
      this.setState({
        email: event.target.value,
        errorText: error,
        error: true,
        disabled: true,
      });
    } else {
      this.setState({
        email: event.target.value,
        errorText: '',
        error: false,
        disabled: false,
      });
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
    this.setState({ popUp: true });
  }

  handleClosePopUp(event) {
    this.setState({ popUp: false });
  }

  render() {
    const value = this.state;
    return (
      <div className="page auth-page">
        <Grid className="auth-page-container" container direction="row" justifyContent="center" alignItems="center">
          <Grid container item xs={6} className="auth-page-col auth-page-col-left" justify="center">
            <Grid item className="auth-title">
              <Typography className="auth-title" variant="h1">
                Lost your puppy? Reset Password
              </Typography>
            </Grid>
          </Grid>
          <Grid container item xs={6} className="auth-page-col auth-page-col-right" justify="center">
            <Card className="auth-form" variant="outlined">
              <CardContent className="auth-form-content">
                <TextField
                  required
                  className="auth-form-input"
                  error={value.error}
                  helperText={value.errorText}
                  placeholder="Email"
                  value={value.email}
                  onChange={this.handleChange}
                  onKeyPress={(event) => {
                    if (event.key === 'Enter') this.handleSubmit();
                  }}
                />
                <Button
                  disabled={value.disabled}
                  type="submit"
                  color="primary"
                  onClick={this.handleSubmit}
                  onKeyPress={this.handleSubmit}
                >
                  Send
                </Button>
              </CardContent>
            </Card>
            {value.popUp ? (
              <Dialog
                open={value.popUp}
                keepMounted
                onClose={this.handleClosePopUp}
                aria-labelledby="alert-dialog-slide-title"
                aria-describedby="alert-dialog-slide-description"
              >
                <DialogTitle id="alert-dialog-slide-title">
                  <Typography variant="h2">Password reset email sent</Typography>
                </DialogTitle>
                <DialogContent>
                  <DialogContentText id="alert-dialog-slide-description">
                    Please check your mailbox to reset your password.
                  </DialogContentText>
                </DialogContent>
                <DialogActions>
                  <Button onClick={this.handleClosePopUp}>Done</Button>
                </DialogActions>
              </Dialog>
            ) : (
              <></>
            )}
          </Grid>
        </Grid>
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
