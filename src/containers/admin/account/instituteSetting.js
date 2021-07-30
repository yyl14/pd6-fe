import React, { Component } from 'react';
import { connect } from 'react-redux';

import { withRouter } from 'react-router-dom';

import {
  Button, Typography,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@material-ui/core';

import SimpleBar from '../../../components/ui/SimpleBar';

class InstituteSetting extends Component {
  constructor(props) {
    super(props);
    this.state = {
      changeName: false,
      changeInitialism: false,
      changeEmail: false,
      changeStatus: false,
    };
  }

  componentDidMount() {}

  handleClosePopUp = () => {
    this.setState({
      changeName: false,
      changeInitialism: false,
      changeEmail: false,
      changeStatus: false,
    });
  };

  render() {
    return (
      <>
        <Typography variant="h3" style={{ marginBottom: '50px' }}>
          Institute: NTNU / Setting
        </Typography>
        <SimpleBar
          title="Change Institute Full Name"
          buttons={(
            <>
              <Button color="secondary" onClick={(prevState) => { this.setState({ changeName: !prevState.changeName }); }}>Rename</Button>
            </>
          )}
        >
          <Typography variant="body1">
            Once you change the institute name, all related members will be affected. Please be certain.
          </Typography>
        </SimpleBar>
        <SimpleBar
          title="Change Institute Initialism"
          buttons={(
            <>
              <Button color="secondary" onClick={(prevState) => { this.setState({ changeInitialism: !prevState.changeInitialism }); }}>Rename</Button>
            </>
          )}
        >
          <Typography variant="body1">
            Once you change the institute initialism, all related members will be affected. Please be certain.
          </Typography>
        </SimpleBar>
        <SimpleBar
          title="Change Institute Email"
          buttons={(
            <>
              <Button color="secondary" onClick={(prevState) => { this.setState({ changeEmail: !prevState.changeEmail }); }}>Change Email</Button>
            </>
          )}
        >
          <Typography variant="body1">
            Once you change the institute email, future members may not be able to register with certain email. Please be certain.
          </Typography>
        </SimpleBar>
        <SimpleBar
          title="Change Institute Status"
          buttons={(
            <>
              <Button color="secondary" onClick={(prevState) => { this.setState({ changeStatus: !prevState.changeStatus }); }}>Change Status</Button>
            </>
          )}
        >
          <Typography variant="body1">
            Once you change the institute status, future members from this institute may not be able to register. Please be certain.
          </Typography>
        </SimpleBar>
        <Dialog
          open={this.state.changeName}
          keepMounted
          onClose={() => this.handleClosePopUp()}
          aria-labelledby="dialog-slide-title"
          aria-describedby="dialog-slide-description"
        >
          <DialogTitle id="dialog-slide-title">
            <Typography variant="h4">Rename institute</Typography>
          </DialogTitle>
          <DialogContent>

            <Typography variant="body1">
              Once you change the institute name, all related members will be affected. Please be certain.
            </Typography>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => this.handleClosePopUp()} color="default">
              Cancel
            </Button>
            <Button onClick={() => this.handleClosePopUp()} color="secondary">
              Rename
            </Button>
          </DialogActions>
        </Dialog>
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  auth: state.auth,
  error: state.error,
});

export default connect(mapStateToProps, {})(withRouter(InstituteSetting));
