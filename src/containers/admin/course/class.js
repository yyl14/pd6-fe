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

import MemberList from '../../../components/admin/course/MemberList';
import ClassSetting from '../../../components/admin/course/ClassSetting';

/* This is a level 3 container (main page container) */
class ClassInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {}

  render() {
    return (
      <div>
        <Switch>
          <Route path="/admin/class/:courseId/:classId/member" component={MemberList} />
          <Route path="/admin/class/:courseId/:classId/setting" component={ClassSetting} />
        </Switch>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  auth: state.auth,
  error: state.error,
});

export default connect(mapStateToProps, {})(withRouter(ClassInfo));
