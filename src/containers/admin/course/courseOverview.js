import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Button, Typography } from '@material-ui/core';
import SimpleBar from '../../../components/ui/SimpleBar';
import DateRangePicker from '../../../components/ui/DateRangePicker';

class CourseOverview extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {}

  render() {
    return (
      <>
        <Typography variant="h3" style={{ marginBottom: '50px' }}>
          PBC
        </Typography>
        <SimpleBar
          title="Change Course Name"
          buttons={(
            <>
              <Button color="secondary">Rename</Button>
            </>
          )}
        >
          <Typography variant="body1">
            Once you change the course name, all related classes will be change their names. Please be certain.
          </Typography>
        </SimpleBar>
        <SimpleBar
          title="Delete Course"
          buttons={(
            <>
              <Button color="secondary">Delete</Button>
            </>
          )}
        >
          <Typography variant="body1">Once you delete a course, there is no going back. Please be certain.</Typography>
          <DateRangePicker />
        </SimpleBar>
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  auth: state.auth,
  error: state.error,
});

export default connect(mapStateToProps, {})(withRouter(CourseOverview));
