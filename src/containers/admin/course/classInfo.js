import React, { Component } from 'react';
import { connect } from 'react-redux';

import { withRouter } from 'react-router-dom';

import ClassSetting from '../../../components/admin/course/ClassSetting';

class ClassInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {}

  render() {
    return <ClassSetting />;
  }
}

const mapStateToProps = (state) => ({
  auth: state.auth,
  error: state.error,
});

export default connect(mapStateToProps, {})(withRouter(ClassInfo));
