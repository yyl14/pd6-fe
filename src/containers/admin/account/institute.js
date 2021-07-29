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
          is_disabled: true,
        },
        {
          institute: 'National Taiwan University',
          email_domain: 'ntu.edu.tw',
          is_disabled: true,
        },
        {
          institute: 'National Taiwan University',
          email_domain: 'ntu.edu.tw',
          is_disabled: false,
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
              <Button color="default">Edit</Button>
            </>
          )}
          columnName={['Institute', 'Email', 'Status']}
          dataColumnName={['institute', 'email_domain', 'is_disabled']}
          width={[170, 100, 100]}
          data={this.state.fakeData}
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
