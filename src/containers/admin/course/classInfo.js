import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  Grid,
  Typography,
  Table,
  TableHead,
  TableBody,
  TableFooter,
  TablePagination,
  TableRow,
  TableCell,
  TableContainer,
  Icon,
  Paper,
  TextField,
  Button,
} from '@material-ui/core';
import SchoolIcon from '@material-ui/icons/School';
import SortRoundedIcon from '@material-ui/icons/SortRounded';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import ArrowForwardRoundedIcon from '@material-ui/icons/ArrowForwardRounded';
import { Route, Switch, withRouter } from 'react-router-dom';
import MemberEdit from '../../../components/admin/course/MemberEdit';
import MemberList from '../../../components/admin/course/MemberList';

class ClassInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      page: 0,
      rowsPerPage: 10,
      searched: '',
      showMemberEdit: false,
      columns: [
        {
          id: 'id',
          label: 'Student ID',
          minWidth: 170,
          sort: false,
        },
        {
          id: 'realName',
          label: 'Real Name',
          minWidth: 170,
          sort: false,
        },
        {
          id: 'username',
          label: 'Username',
          minWidth: 170,
          sort: false,
        },
        {
          id: 'school',
          label: 'School',
          minWidth: 170,
          sort: true,
        },
        {
          id: 'role',
          label: 'Role',
          minWidth: 170,
          sort: true,
        },
      ],
      rows: [
        {
          id: 'B087050801',
          realName: '南部陽一郎',
          username: 'shinymarshmello',
          school: 'NTUST',
          role: 'Guest Student',
        },
        {
          id: 'B087050801',
          realName: '南部陽一郎',
          username: 'shinymarshmello',
          school: 'NTUST',
          role: 'Guest Student',
        },
        {
          id: 'B087050801',
          realName: '南部陽一郎',
          username: 'shinymarshmello',
          school: 'NTUST',
          role: 'Guest Student',
        },
        {
          id: 'B087050801',
          realName: '南部陽一郎',
          username: 'shinymarshmello',
          school: 'NTUST',
          role: 'Guest Student',
        },
        {
          id: 'B087050801',
          realName: '南部陽一郎',
          username: 'shinymarshmello',
          school: 'NTUST',
          role: 'Guest Student',
        },
        {
          id: 'B087050801',
          realName: '南部陽一郎',
          username: 'shinymarshmello',
          school: 'NTUST',
          role: 'Guest Student',
        },
        {
          id: 'B087050801',
          realName: '南部陽一郎',
          username: 'shinymarshmello',
          school: 'NTUST',
          role: 'Guest Student',
        },
        {
          id: 'B087050801',
          realName: '南部陽一郎',
          username: 'shinymarshmello',
          school: 'NTUST',
          role: 'Guest Student',
        },
        {
          id: 'B087050801',
          realName: '南部陽一郎',
          username: 'shinymarshmello',
          school: 'NTUST',
          role: 'Guest Student',
        },
        {
          id: 'B087050801',
          realName: '南部陽一郎',
          username: 'shinymarshmello',
          school: 'NTUST',
          role: 'Guest Student',
        },
        {
          id: 'B087050801',
          realName: '南部陽一郎',
          username: 'shinymarshmello',
          school: 'NTUST',
          role: 'Guest Student',
        },
        {
          id: 'B087050801',
          realName: '南部陽一郎',
          username: 'shinymarshmello',
          school: 'NTUST',
          role: 'Guest Student',
        },
      ],
    };
  }

  componentDidMount() {}

  handleClickEdit = () => {
    this.setState({ showMemberEdit: true });
  };

  handleClickMemberDetail = () => {};

  handleChangePage = (event, newPage) => {
    this.setState({ page: newPage });
  };

  handleChangeRowsPerPage = (event) => {
    this.setState({ rowsPerPage: +event.target.value });
    this.setState({ page: 0 });
  };

  changeShowEditState = () => {
    this.setState({ showMemberEdit: false });
  };

  render() {
    return (
      <div>
        <Switch>
          <Route path="/admin/course/:courseId/:classId/member-list" component={MemberList} />
        </Switch>
        {/* {this.state.showMemberEdit
          ? <MemberEdit backToClassInfo={this.changeShowEditState} TAList={[]} studentList={[]} guestList={[]} /> : (
            <Grid container className="class-info-container" direction="column" justifyContent="center" alignItems="center">
              <Grid container item className="class-setting-col-top" direction="column" xs={6} justifyContent="center" alignItems="flex-start">
                <Typography variant="h3">PBC / 111-1 / Member</Typography>
                <Grid container item direction="row" justifyContent="flex-start" alignItems="center" spacing={1}>
                  <Grid item><SchoolIcon color="action" /></Grid>
                  <Grid item><Typography variant="h4">National Taiwan University</Typography></Grid>
                </Grid>
              </Grid>
              <Grid container item className="class-info-col-bottom" direction="column" xs={6} justifyContent="center" alignItems="center">
                <Paper elevation={0} style={{ width: '1280px' }}>
                  <Grid container item direction="row" justifyContent="space-between" alignItems="center" style={{ height: '75px', width: '1280px' }}>
                    <TextField id="class-member-search-bar" label="Search" variant="outlined" />
                    <Button onClick={this.handleClickEdit}>Edit</Button>
                  </Grid>
                  <Grid item style={{ width: '1280px' }}>
                    <Table stickyHeader>
                      <TableHead>
                        <TableRow style={{ width: '1280px' }}>
                          {this.state.columns.map((column) => (
                            <TableCell
                              style={{ width: '170px' }}
                              key={column.id}
                              align="center"
                            >
                              {column.sort ? (
                                <Grid container direction="row" alignItems="center" justifyContent="center">
                                  {column.label}
                                  <SortRoundedIcon />
                                </Grid>
                              ) : column.label}
                            </TableCell>
                          ))}
                          <TableCell style={{ width: '430px' }}> </TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {this.state.rows.slice(this.state.page * this.state.rowsPerPage, this.state.page * this.state.rowsPerPage + this.state.rowsPerPage).map((row) => (
                          <TableRow key={row.id}>
                            <TableCell align="center"><Typography variant="body1">{row.id}</Typography></TableCell>
                            <TableCell align="center"><Typography variant="body1">{row.realName}</Typography></TableCell>
                            <TableCell align="center"><Typography variant="body1">{row.username}</Typography></TableCell>
                            <TableCell align="center"><Typography variant="body1">{row.school}</Typography></TableCell>
                            <TableCell align="center"><Typography variant="body1">{row.role}</Typography></TableCell>
                            <TableCell align="right"><ArrowForwardRoundedIcon onClick={this.handleClickMemberDetail} /></TableCell>
                          </TableRow>
                        )) }
                      </TableBody>
                    </Table>
                  </Grid>
                  <Grid item style={{ width: '1280px' }}>
                    <TablePagination
                      rowsPerPageOptions={[5, 10, 15]}
                      component={Paper}
                      count={this.state.rows.length}
                      rowsPerPage={this.state.rowsPerPage}
                      labelRowsPerPage=""
                      page={this.state.page}
                      labelDisplayedRows={({ count, page }) => (
                        <Grid container direction="row" alignItems="center" justifyContent="center">
                          <Typography variant="body1">rows     </Typography>
                          <Button><ArrowBackIosIcon style={{ height: '10px' }} /></Button>
                          <TextField defaultValue={1} onChange={(e) => { this.setState({ page: e.target.value - 1 }); }} />

                          <Typography variant="body1">
                            of
                            {' '}
                            {Math.ceil(count / this.state.rowsPerPage)}
                          </Typography>
                          <Button onClick={this.handleChangePage}><ArrowForwardIosIcon style={{ height: '10px' }} /></Button>
                        </Grid>
                      )}
                      onPageChange={this.handleChangePage}
                      onRowsPerPageChange={this.handleChangeRowsPerPage}
                      style={{ width: '100%' }}
                    />
                  </Grid>
                </Paper>
              </Grid>
            </Grid>
          )} */}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  auth: state.auth,
  error: state.error,
});

export default connect(mapStateToProps, {})(withRouter(ClassInfo));
