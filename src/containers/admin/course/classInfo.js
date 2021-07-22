import React, { Component } from 'react';
import { connect } from 'react-redux';

import { withRouter } from 'react-router-dom';

class ClassInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {}

  render() {
    return <div />;
  }
}

const mapStateToProps = (state) => ({
  auth: state.auth,
  error: state.error,
});

export default connect(mapStateToProps, {})(withRouter(ClassInfo));
