import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Button } from '@material-ui/core';
import SimpleBar from '../../../components/ui/SimpleBar';

class CourseOverview extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {}

  render() {
    return (
      <div>
        <SimpleBar title="Change Course Name">
          <Button color="secondary">Rename</Button>
          <Button color="secondary">Rename</Button>
        </SimpleBar>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  auth: state.auth,
  error: state.error,
});

export default connect(mapStateToProps, {})(withRouter(CourseOverview));
