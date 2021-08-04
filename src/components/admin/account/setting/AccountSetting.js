import React, { Component } from 'react';
import { connect } from 'react-redux';

import { Button, GrstudentId, Typography } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import { isThisHour } from 'date-fns';
import { accountActions } from '../../../../actions/index';
import SimpleBar from '../../../ui/SimpleBar';

import BasicInfo from './BasicInfo';
import BasicInfoEdit from './BasicInfoEdit';
import StudentInfo from './StudentInfo';
import StudentInfoEdit from './StudentInfoEdit';
import AccountDelete from './AccountDelete';
import NewPassword from './NewPassword';

const datas = [
  {
    studentId: 'b08705080',
    email: 'b08705080@ntu.edu.tw',
    institute: 'National Taiwan University',
    isDefault: true,
  },
  {
    studentId: 'r08705080',
    email: 'r08705080@ntu.edu.tw',
    institute: 'National Taiwan University',
    isDefault: false,
  },
  {
    studentId: 'b05705024',
    email: 'b05705024@ntu.edu.tw',
    institute: 'National Taiwan University',
    isDefault: false,
  },
];

const useStyles = (theme) => ({
  pageHeader: {
    marginBottom: '50px',
  },
});

/* This is a level 4 component (page component) */

class AccountSetting extends Component {
  constructor(props) {
    super(props);
    this.state = {
      accountId: null,
      editBasicInfo: false,
      editStudInfo: false,
      realName: '黑阿柴',
      userName: 'shiba',
      nickName: '柴柴',
      altMail: 'shiba@gmail.com',
      datas,
    };
    this.handleBasicEdit = this.handleBasicEdit.bind(this);
    this.handleBasicBack = this.handleBasicBack.bind(this);
    this.setBasicInfo = this.setBasicInfo.bind(this);
    this.handleStudBack = this.handleStudBack.bind(this);
    this.handleStudEdit = this.handleStudEdit.bind(this);
    this.updateStatus = this.updateStatus.bind(this);
  }

  componentDidMount() {
    const { accountId } = this.props.match.params;
    console.log('hello', this.props.accounts);
    const account = this.props.accounts[accountId];
    this.setState({
      accountId,
      realName: account.real_name,
      userName: account.username,
      nickName: account.nickname,
      altMail: account.alternative_email,
    });
  }

  setBasicInfo = (newRealName, newUserName, newNickName, newAltMail) => {
    this.setState({
      realName: newRealName,
      userName: newUserName,
      nickName: newNickName,
      altMail: newAltMail,
    });
  };

  handleBasicEdit = () => {
    this.setState({
      editBasicInfo: true,
    });
  };

  handleBasicBack = () => {
    this.setState({
      editBasicInfo: false,
    });
  };

  updateStatus = (updated) => {
    this.setState({
      datas: updated,
    });
  };

  handleStudEdit = () => {
    this.setState({
      editStudInfo: true,
    });
  };

  handleStudBack = () => {
    this.setState({
      editStudInfo: false,
    });
  };

  render() {
    const { classes } = this.props;
    return (
      <>
        <Typography variant="h3" className={classes.pageHeader}>
          {this.state.userName}
          {' '}
          / Setting
        </Typography>

        {this.state.editBasicInfo ? (
          <BasicInfoEdit
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
        {this.state.editStudInfo ? (
          <StudentInfoEdit
            handleBack={this.handleStudBack}
            datas={this.state.datas}
            updateStatus={this.updateStatus}
          />
        ) : (
          <StudentInfo
            handleEdit={this.handleStudEdit}
            datas={this.state.datas}
          />
        )}

        <NewPassword />
        <AccountDelete
          userName={this.state.userName}
          datas={this.state.datas}
          realName={this.state.realName}
        />
      </>
    );
  }
}

const mapStateToProps = (store) => (
  {
    accounts: store.admin.account.accounts.byId,
    studentCards: store.admin.account.studentCards.byId,
    studentCardsId: store.admin.account.studentCards.allId,
  }
);

export default connect(mapStateToProps, accountActions)(withStyles(useStyles)(AccountSetting));
