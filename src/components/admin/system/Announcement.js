import React, { Component } from 'react';
import { connect } from 'react-redux';

import { withRouter } from 'react-router-dom';
import BasicTextFields from './search';
import ContainedButtons from './AddButton';
import StickyHeadTable from './Table';

class Announcement extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {}

  render() {
    return (
      <div>
        <BasicTextFields />
        <ContainedButtons />
        <StickyHeadTable />
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  auth: state.auth,
  error: state.error,
});

export default connect(mapStateToProps, {})(withRouter(Announcement));
