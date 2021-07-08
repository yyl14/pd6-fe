import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import agent from '../../actions/agent';
import { userSignIn } from '../../actions/auth';

import '../../styles/auth.css';
import '../../styles/index.css';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userId: '',
      password: '',
    };
    this.handleChange1 = this.handleChange1.bind(this);
    this.handleChange2 = this.handleChange2.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {}

  handleChange1(event) {
    this.setState({ userId: event.target.value });
  }

  handleChange2(event) {
    this.setState({ password: event.target.value });
  }

  handleSubmit(event) {
    event.preventDefault();
    const { onSubmit } = this.props;
    onSubmit(this.state);
  }

  render() {
    const { userId, password } = this.state;
    return (
      <div className="login-page">
        <p>Hello Pdogs!</p>
        <form onSubmit={this.handleSubmit}>
          <input type="text" name="userId" value={userId} onChange={this.handleChange1} />
          <input type="text" name="password" value={password} onChange={this.handleChange2} />
          <input type="submit" value="Submit" />
        </form>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  auth: state.auth,
  error: state.error,
});

const mapDispatchToProps = (dispatch) => ({
  onSubmit: (input) => dispatch(userSignIn(input)),
});

Login.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Login));
