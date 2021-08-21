import { connect } from 'react-redux';
import { Switch, Route, withRouter } from 'react-router-dom';
import { withCookies, Cookies } from 'react-cookie';
import { instanceOf } from 'prop-types';

import React, { Component } from 'react';
import Normal from './normal';
import Admin from './admin';
import Account from './account';
import NoMatch from '../components/noMatch';

import { getUserInfo } from '../actions/user/auth';

import '../styles/index.css';

class Index extends Component {
  static propTypes = {
    cookies: instanceOf(Cookies).isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    if (!this.props.auth.isAuthenticated) {
      const cookieId = this.props.cookies.get('id');
      const cookieToken = this.props.cookies.get('token');
      console.log(cookieId, cookieToken);

      if (cookieId !== null && cookieId !== undefined && cookieToken !== null && cookieToken !== undefined) {
        this.props.getUserInfo(cookieId, cookieToken);
      } else {
        this.props.history.push('/login');
      }
    }
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.auth.isAuthenticated && nextProps.history.location.pathname === '/') {
      if (nextProps.user.role.indexOf('MANAGER') !== -1 || nextProps.user.role === 'MANAGER') {
        nextProps.history.push('/admin/course/course');
      } else {
        nextProps.history.push('/my-class');
      }
    }

    return null;
  }

  render() {
    if (!this.props.auth.isAuthenticated) {
      return <></>;
    }

    return (
      <div className="wrapper">
        <Switch>
          <Route path="/admin" component={Admin} />
          <Route path="/my-profile" component={Account} />
          <Route path="/" component={Normal} />
        </Switch>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  auth: state.auth,
  user: state.user,
  error: state.error,
});

export default connect(mapStateToProps, { getUserInfo })(withRouter(withCookies(Index)));
