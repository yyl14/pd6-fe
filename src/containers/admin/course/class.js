import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Route, Switch, withRouter } from 'react-router-dom';
import MemberList from '../../../components/admin/course/MemberList';
import ClassSetting from '../../../components/admin/course/ClassSetting';
import NoMatch from '../../../components/noMatch';

/* This is a level 3 container (main page container) */
class ClassInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {}

  render() {
    return (
      <>
        <Switch>
          <Route path="/admin/course/class/:courseId/:classId/member" component={MemberList} />
          <Route path="/admin/course/class/:courseId/:classId/setting" component={ClassSetting} />
          <Route component={NoMatch} />
        </Switch>
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  auth: state.auth,
  error: state.error,
});

export default connect(mapStateToProps, {})(withRouter(ClassInfo));
