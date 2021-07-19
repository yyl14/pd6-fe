import { connect } from 'react-redux';
import { Switch, Route, withRouter } from 'react-router-dom';
import { withCookies, Cookies } from 'react-cookie';
import { instanceOf } from 'prop-types';

import React, { Component } from 'react';
import Home from './home';
import NoMatch from '../components/noMatch';

import { getUserInfo } from '../actions/auth';

import '../styles/index.css';

const propTypes = {
  cookies: instanceOf(Cookies).isRequired,
};

class Index extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    if (!this.props.auth.isAuthenticated) {
      const cookieToken = this.props.cookies.get('token');
      if (cookieToken !== null) {
        this.props.getUserInfo(cookieToken);
      } else {
        this.props.history.push('/login');
      }
    }
  }

  render() {
    if (!this.props.auth.isAuthenticated) {
      return <></>;
    }

    return (
      <div className="wrapper">
        <Switch>
          <Route exact path="/" component={Home} />
          <Route component={NoMatch} />
        </Switch>
      </div>
    );
  }
}

Index.propTypes = propTypes;

const mapStateToProps = (state) => ({
  auth: state.auth,
  error: state.error,
});

export default connect(mapStateToProps, { getUserInfo })(withRouter(Index));
