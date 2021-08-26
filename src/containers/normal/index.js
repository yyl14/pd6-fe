import React, { Component } from 'react';
import { connect } from 'react-redux';

import { Switch, Route, withRouter } from 'react-router-dom';

import MyClass from './myClass';
import AllClass from './allClass';

import NoMatch from '../../components/noMatch';
import Header from '../../components/ui/Header';
import Sidebar from '../../components/ui/Sidebar';

class Normal extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    if (this.props.auth.isAuthenticated) {
      if (this.props.user.role.indexOf('NORMAL') === -1) {
        // not system normal
        this.props.history.push('/notFound');
      }
    }
  }

  render() {
    return (
      <div>
        <Header role={this.props.user.role} hasClass={this.props.user.classes.length !== 0} />
        <Sidebar />
        <div className="layout-content-container">
          <div className="layout-content">
            <Switch>
              <Route path="/my-class/:courseId/:classId" component={MyClass} />
              <Route path="/all-class/:courseId/:classId" component={AllClass} />
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

export default connect(mapStateToProps, {})(withRouter(Normal));
