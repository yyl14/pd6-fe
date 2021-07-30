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
  FormControlLabel,
  Switch,
  Grid,
  OutlinedInput,
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
      newStatus: false,
      newName: '',
      newInitialism: '',
      newEmail: '',
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

  handleChange = (prop) => (event) => {
    this.setState({ [prop]: event.target.value });
  };

  handleChangeStatus = (event) => {
    this.setState({ [event.target.name]: event.target.checked });
  };

  render() {
    return (
      <>
        <Typography variant="h3" style={{ marginBottom: '50px' }}>
          Institute: NTU / Setting
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
            Once you change the institute’s name, all related members will be affected. Please be certain.
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
            Once you change the institute’s initialism, all related members will be affected. Please be certain.
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
            Once you change the institute’s email, future members may not be able to register with certain email. Please be certain.
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
            Once you change the institute’s status, future members from this institute may not be able to register. Please be certain.
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
            <Grid container spacing={3}>
              <Grid item xs={5}>
                <Typography variant="body1" style={{ color: 'red' }}>
                  Current Name
                </Typography>
              </Grid>
              <Grid item xs={7}>
                <Typography variant="body1" style={{ color: 'red' }}>
                  National Taiwan University
                </Typography>
              </Grid>
              <Grid item xs={5}>
                <Typography variant="body1">
                  New Name
                </Typography>
              </Grid>
              <Grid item xs={7}>
                <OutlinedInput
                  id="outlined-adornment"
                  value={this.state.newName}
                  onChange={this.handleChange('newName')}
                  aria-describedby="outlined-weight-helper-text"
                  inputProps={{
                    'aria-label': 'newName',
                  }}
                  labelWidth={0}
                />
              </Grid>
            </Grid>
            <Typography variant="body1">
              Once you change the institute’s name, all related members will be affected. Please be certain.
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
        <Dialog
          open={this.state.changeStatus}
          keepMounted
          onClose={() => this.handleClosePopUp()}
          aria-labelledby="dialog-slide-title"
          aria-describedby="dialog-slide-description"
        >
          <DialogTitle id="dialog-slide-title">
            <Typography variant="h4">Rename institute</Typography>
          </DialogTitle>
          <DialogContent>
            <FormControlLabel
              control={(
                <Switch
                  checked={this.state.newStatus}
                  onChange={this.handleChangeStatus}
                  name="newStatus"
                  color="primary"
                />
              )}
              label={this.state.newStatus ? 'Enabled' : 'Disabled'}
            />
            <Typography variant="body1">
              Once you change the institute’s status, future members from this institute may not be able to register. Please be certain.
            </Typography>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => this.handleClosePopUp()} color="default">
              Cancel
            </Button>
            <Button onClick={() => this.handleClosePopUp()} color="secondary">
              Modify
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
