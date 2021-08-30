import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Switch, Route, withRouter } from 'react-router-dom';

import Account from './account/account';
import Institute from './account/institute';
import Class from './course/class';
import Course from './course/course';
import AccessLog from './system/accessLog';
import SubmitLang from './system/submitLang';
import Announcement from './system/announcement';
import NoMatch from '../../components/noMatch';

import Header from '../../components/ui/Header';
import Sidebar from '../../components/ui/Sidebar';

/* This is a level 2 container (role container) */
class Admin extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    if (this.props.auth.isAuthenticated) {
      if (this.props.user.role.indexOf('MANAGER') === -1) {
        this.props.history.push('/notFound');
      }
    }
  }

  render() {
    return (
      <div>
        <Header role={this.props.user.role} />
        <Sidebar />
        <div className="layout-content-container">
          <div className="layout-content">
            <Switch>
              <Route path="/admin/course/course" component={Course} />
              <Route path="/admin/course/class" component={Class} />
              <Route path="/admin/account/institute" component={Institute} />
              <Route path="/admin/account/account" component={Account} />
              <Route path="/admin/system/accesslog" component={AccessLog} />
              <Route path="/admin/system/announcement" component={Announcement} />
              <Route path="/admin/system/submitlang" component={SubmitLang} />
              <Route component={NoMatch} />
            </Switch>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  auth: state.auth,
  user: state.user,
  error: state.error,
});

export default connect(mapStateToProps, {})(withRouter(Admin));
