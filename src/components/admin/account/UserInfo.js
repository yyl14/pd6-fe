import {
  Button, Grid, Typography,
} from '@material-ui/core';
import React, { Component } from 'react';
import BasicInfo from './BasicInfo';
import EditBasicInfo from './EditBasicInfo';
import StudentInfo from './StudentInfo';
import EditStudentInfo from './EditStudentInfo';
import DeleteAccount from './DeleteAccount';

import './userinfo.css';

// only two student ID cards is allowed now

class UserInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      editBasicInfo: false,
      editStudInfo: false,
      realName: 'hhh', // this.props.realName
      userName: 'h',
      nickName: 'h',
      altMail: 'h@gmail.com',
      defaultId: 'B05705024',
      defaultMail: '1@ntu.edu.tw',
      defaultSchool: 'National Taiwan University',
      id2: 'r05705024',
      mail2: '2@ntu.edu.tw',
      school2: 'Another University',
    };

    this.handleBasicEdit = this.handleBasicEdit.bind(this);
    this.handleBasicBack = this.handleBasicBack.bind(this);
    this.setBasicInfo = this.setBasicInfo.bind(this);
    this.handleStudBack = this.handleStudBack.bind(this);
    this.handleStudEdit = this.handleStudEdit.bind(this);
    this.setDefaultStatus = this.setDefaultStatus.bind(this);
    this.setSecondStatus = this.setSecondStatus.bind(this);
  }

  setBasicInfo = (newRealName, newUserName, newNickName, newAltMail) => {
    this.setState({
      realName: newRealName,
      userName: newUserName,
      nickName: newNickName,
      altMail: newAltMail,
    });
  }

  handleBasicEdit= () => {
    this.setState({
      editBasicInfo: true,
    });
  }

  handleBasicBack = () => {
    this.setState({
      editBasicInfo: false,
    });
  }

  setDefaultStatus = (newDefaultId, newDefaultMail, newDefaultSchool) => {
    this.setState({
      defaultId: newDefaultId,
      defaultMail: newDefaultMail,
      defaultSchool: newDefaultSchool,
    });
  }

  setSecondStatus = (secondId, secondMail, secondSchool) => {
    this.setState({
      id2: secondId,
      mail2: secondMail,
      school2: secondSchool,
    });
  }

  handleStudEdit = () => {
    this.setState({
      editStudInfo: true,
    });
  }

  handleStudBack = () => {
    this.setState({
      editStudInfo: false,
    });
  }

  render() {
    return (
      <div className="userinfo-page">
        <Grid
          container
          xs={12}
          className="userinfo-page-container"
          direction="column"
        >
          <Grid item className="userinfo-page-header" xs={12}>
            <Typography variant="h3">
              {this.state.defaultId}
              {' '}
              / Account Setting
            </Typography>
          </Grid>

          <Grid item className="userinfo-page-basicinfo" xs={12}>
            {this.state.editBasicInfo
              ? (
                <EditBasicInfo
                  handleBack={this.handleBasicBack}
                  realName={this.state.realName}
                  setBasicInfo={this.setBasicInfo}
                  userName={this.state.userName}
                  nickName={this.state.nickName}
                  altMail={this.state.altMail}
                />
              )
              : (
                <BasicInfo
                  handleEdit={this.handleBasicEdit}
                  realName={this.state.realName}
                  userName={this.state.userName}
                  nickName={this.state.nickName}
                  altMail={this.state.altMail}
                />
              )}
          </Grid>

          <Grid item className="userinfo-page-studentinfo" xs={12}>
            {this.state.editStudInfo
              ? (
                <EditStudentInfo
                  handleBack={this.handleStudBack}
                  defaultId={this.state.defaultId}
                  defaultMail={this.state.defaultMail}
                  defaultSchool={this.state.defaultSchool}
                  id2={this.state.id2}
                  mail2={this.state.mail2}
                  school2={this.state.school2}
                  setDefaultStatus={this.setDefaultStatus}
                  setSecondStatus={this.setSecondStatus}
                />
              ) : (
                <StudentInfo
                  handleEdit={this.handleStudEdit}
                  defaultId={this.state.defaultId}
                  defaultMail={this.state.defaultMail}
                  defaultSchool={this.state.defaultSchool}
                  id2={this.state.id2}
                  mail2={this.state.mail2}
                  school2={this.state.school2}
                />
              )}
          </Grid>
          <Grid item className="userinfo-page-deleteaccount" xs={12}>
            <DeleteAccount id={this.state.defaultId} name={this.state.realName} />
          </Grid>
        </Grid>
      </div>
    );
  }
}

export default UserInfo;
