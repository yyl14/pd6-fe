import { connect, useSelector, useDispatch } from 'react-redux';
import {
  Switch, Route, withRouter, useHistory, useLocation,
} from 'react-router-dom';
import { withCookies, Cookies, useCookies } from 'react-cookie';
import { instanceOf } from 'prop-types';

import React, { Component, useEffect, useState } from 'react';
import Normal from './normal';
import Admin from './admin';
import Account from './account';
import NoMatch from '../components/noMatch';

import { getUserInfo } from '../actions/user/auth';

import '../styles/index.css';

function Index() {
  const history = useHistory();
  const location = useLocation();
  const auth = useSelector((state) => state.auth);
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [cookies, setCookie, removeCookie] = useCookies(['id', 'token']);

  useEffect(() => {
    // console.log(auth.isAuthenticated, Boolean(cookies.id && cookies.token));
    if (!auth.isAuthenticated) {
      if (cookies.id && cookies.token) {
        dispatch(getUserInfo(cookies.id, cookies.token));
      } else {
        history.push('/login');
      }
    }
  }, [auth.isAuthenticated, cookies, cookies.id, cookies.token, dispatch, history]);

  useEffect(() => {
    if (auth.isAuthenticated && location.pathname === '/') {
      if (user.role.indexOf('MANAGER') !== -1 || user.role === 'MANAGER') {
        history.push('/admin/course/course');
      } else if (user.role.indexOf('NORMAL') !== -1 || user.role === 'NORMAL') {
        history.push('/my-class');
      } else {
        history.push('/my-profile');
      }
    }
  }, [auth.isAuthenticated, history, location.pathname, user.role]);

  if (!auth.isAuthenticated) {
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

// class Index extends Component {
//   static propTypes = {
//     cookies: instanceOf(Cookies).isRequired,
//   };

//   constructor(props) {
//     super(props);
//     this.state = {};
//   }

//   componentDidMount() {}

//   static getDerivedStateFromProps(nextProps, prevState) {
//     console.log(prevState);
//     if (nextProps.auth.isAuthenticated) {
//       const cookieId = nextProps.cookies.get('id');
//       const cookieToken = nextProps.cookies.get('token');
//       console.log(cookieId, cookieToken);

//       if (cookieId !== null && cookieId !== undefined && cookieToken !== null && cookieToken !== undefined) {
//         this.props.getUserInfo(cookieId, cookieToken);
//       } else {
//         this.props.history.push('/login');
//       }
//     }

//     if (nextProps.auth.isAuthenticated && nextProps.history.location.pathname === '/') {
//       if (nextProps.user.role.indexOf('MANAGER') !== -1 || nextProps.user.role === 'MANAGER') {
//         nextProps.history.push('/admin/course/course');
//       } else {
//         nextProps.history.push('/my-class');
//       }
//     }

//     return null;
//   }

//   render() {
//     if (!this.props.auth.isAuthenticated) {
//       return <></>;
//     }

//     return (
//       <div className="wrapper">
//         <Switch>
//           <Route path="/admin" component={Admin} />
//           <Route path="/my-profile" component={Account} />
//           <Route path="/" component={Normal} />
//         </Switch>
//       </div>
//     );
//   }
// }

// const mapStateToProps = (state) => ({
//   auth: state.auth,
//   user: state.user,
//   error: state.error,
// });

// export default connect(mapStateToProps, { getUserInfo })(withRouter(withCookies(Index)));

export default Index;
