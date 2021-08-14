import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  Switch, Route, withRouter, BrowserRouter as Router,
} from 'react-router-dom';

import { Container } from '@material-ui/core';

import NoMatch from '../../../components/noMatch';

import Header from '../../../components/ui/Header';
import Sidebar from '../../../components/ui/Sidebar';

/* This is a level 2 container (role container) */
class MyClass extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {}

  render() {
    return (
      <Router>
        <div>
          <Header role={this.props.auth.user.role} />
          <Sidebar />
          <div className="layout-content-container">
            <div className="layout-content">
              <Switch>
                {/* <Route path="/admin/course/course" component={Course} /> */}
                <Route component={NoMatch} />
              </Switch>
            </div>
          </div>
        </div>
      </Router>
    );
  }
}

const mapStateToProps = (state) => ({
  auth: state.auth,
  error: state.error,
});

export default connect(mapStateToProps, {})(withRouter(MyClass));
