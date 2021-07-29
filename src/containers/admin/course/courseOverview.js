import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Switch, withRouter, Route } from 'react-router-dom';
import { Button, Typography } from '@material-ui/core';
import SimpleBar from '../../../components/ui/SimpleBar';
import ClassList from '../../../components/admin/course/ClassList';
import CourseSetting from '../../../components/admin/course/CourseSetting';

class CourseOverview extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {}

  render() {
    return (
      <>
        <Switch>
          <Route path="/admin/course/:courseId/class-list" component={ClassList} />
          <Route path="/admin/course/:courseId/setting" component={CourseSetting} />
        </Switch>
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  auth: state.auth,
  error: state.error,
});

export default connect(mapStateToProps, {})(withRouter(CourseOverview));
