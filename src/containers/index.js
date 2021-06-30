import { connect } from 'react-redux';
import { Switch, Route, withRouter } from 'react-router-dom';

import React, { Component } from 'react';
import Home from './home';
import NoMatch from '../components/noMatch';

import {} from '../actions/auth';

import '../styles/index.css';

class Index extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {}

  render() {
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

const mapStateToProps = (state) => ({
  auth: state.auth,
  error: state.error,
});

export default connect(mapStateToProps, {})(withRouter(Index));
