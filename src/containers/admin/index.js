import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  Switch, Route, withRouter, BrowserRouter as Router,
} from 'react-router-dom';

import { Container } from '@material-ui/core';
import Account from './account/account';
import Institute from './account/institute';
import InstituteSetting from './account/instituteSetting';
import ClassInfo from './course/classInfo';
import CourseOverview from './course/courseOverview';
import AccessLog from './system/accessLog';
import Announcement from './system/announcement';
import SubmitLang from './system/submitLang';
import NoMatch from '../../components/noMatch';

import Header from '../../components/ui/Header';
import Sidebar from '../../components/ui/Sidebar';

class Admin extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    if (this.props.auth.isAuthenticated) {
      if (this.props.auth.user.role.indexOf('MANAGER') === -1) {
        this.props.history.push('/notFound');
      }
    }
  }

  render() {
    return (
      <div>
        <Header role={this.props.auth.user.role} />
        <Sidebar />
        <Router>
          <div className="layout-content-container">
            <div className="layout-content">
              <Switch>
                <Route path="/admin/course/overview" component={CourseOverview} />
                <Route path="/admin/course/:class" component={ClassInfo} />
                <Route path="/admin/account/institute" component={InstituteSetting} />
                <Route path="/admin/account/institute/:institute/setting" component={InstituteSetting} />
                <Route path="/admin/account/account" component={Account} />
                <Route path="/admin/system/accesslog" component={AccessLog} />
                <Route path="/admin/system/announcement" component={Announcement} />
                <Route path="/admin/system/submitlang" component={SubmitLang} />
                <Route component={NoMatch} />
              </Switch>
            </div>
          </div>
        </Router>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  auth: state.auth,
  error: state.error,
});

export default connect(mapStateToProps, {})(withRouter(Admin));
