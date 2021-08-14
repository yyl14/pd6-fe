import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Switch, withRouter, Route } from 'react-router-dom';
import { Button, Typography } from '@material-ui/core';
import SimpleBar from '../../../components/ui/SimpleBar';
import ClassList from '../../../components/admin/course/ClassList';
import CourseSetting from '../../../components/admin/course/CourseSetting';
import NoMatch from '../../../components/noMatch';

/* This is a level 3 container (main page container) */
class Course extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    // push to default page component: class list
    // if (this.props.courses.allIds.length) {
    //   // this.props.history.push(
    //   //   `/admin/course/course/${this.props.courses.byId[this.props.courses.allIds[0]].id}/class-list/`,
    //   // );
    // }
  }

  render() {
    return (
      <>
        <Switch>
          <Route path="/admin/course/course/:courseId/class-list/:addType?" component={ClassList} />
          <Route path="/admin/course/course/:courseId/setting" component={CourseSetting} />
          <Route component={NoMatch} />
        </Switch>
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  // auth: state.auth,
  // error: state.error,
  // courses: state.admin.course.courses,
});

export default connect(mapStateToProps, {})(withRouter(Course));
