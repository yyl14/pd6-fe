import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter, Switch, Route } from 'react-router-dom';
import NoMatch from '../../../components/noMatch';

/* This is a level 3 container (main page container) */
class Team extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {}

  render() {
    return (
      <>
        <Switch>
          {/* <Route exact path="/my-class/:courseId/:classId/team" component={TeamList} />
          <Route path="/my-class/:courseId/:classId/team/:teamId" component={TeamDetail} /> */}
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

export default connect(mapStateToProps, {})(withRouter(Team));
