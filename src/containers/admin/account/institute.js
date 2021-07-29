import React, { Component } from 'react';
import { connect } from 'react-redux';

import { withRouter } from 'react-router-dom';

import { Button, Typography, TextField } from '@material-ui/core';
import CustomTable from '../../../components/ui/CustomTable';

class Institute extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fakeData: [
        {
          institute: 'National Taiwan University',
          email_domain: 'ntu.edu.tw',
          is_disabled: 'Enabled',
        },
        {
          institute: 'National Taiwan University',
          email_domain: 'ntu.edu.tw',
          is_disabled: 'Enabled',
        },
        {
          institute: 'National Taiwan University',
          email_domain: 'ntu.edu.tw',
          is_disabled: 'Disabled',
        },
        {
          institute: 'National Taiwan University',
          email_domain: 'ntu.edu.tw',
          is_disabled: 'Enabled',
        },
        {
          institute: 'National Taiwan University',
          email_domain: 'ntu.edu.tw',
          is_disabled: 'Enabled',
        },
        {
          institute: 'National Taiwan University',
          email_domain: 'ntu.edu.tw',
          is_disabled: 'Disabled',
        },
      ],
    };
  }

  componentDidMount() {}

  render() {
    return (
      <>
        <CustomTable
          buttons={(
            <>
              <Button color="primary">Add Institute</Button>
            </>
          )}
          data={this.state.fakeData}
          columns={[
            {
              id: 'institute', label: 'Institute', minWidth: 150, align: 'center',
            },
            {
              id: 'email_domain', label: 'Email', minWidth: 100, align: 'center',
            },
            {
              id: 'is_disabled', label: 'Status', minWidth: 100, align: 'center',
            },
          ]}
        />
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  auth: state.auth,
  error: state.error,
});

export default connect(mapStateToProps, {})(withRouter(Institute));
