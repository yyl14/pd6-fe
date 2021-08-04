import React, { Component } from 'react';
import { connect } from 'react-redux';

import { Button, Typography } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import { accountActions } from '../../../../actions/index';
import SimpleBar from '../../../ui/SimpleBar';

import BasicInfo from './BasicInfo';
import BasicInfoEdit from './BasicInfoEdit';
import StudentInfo from './StudentInfo';
import StudentInfoEdit from './StudentInfoEdit';
import AccountDelete from './AccountDelete';
import NewPassword from './NewPassword';

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
      realName: '',
      userName: '',
      nickName: '',
      altMail: '',
      cards: [],
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

    account.studentCard.forEach(
      (cardId) => {
        this.setState((prevState) => ({ cards: [...prevState.cards, this.props.studentCards[cardId]] }));
      },
    );
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

        {this.state.cards && console.log(this.state.cards)}
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
            cards={this.state.cards}
            updateStatus={this.updateStatus}
          />
        ) : (
          <StudentInfo
            handleEdit={this.handleStudEdit}
            cards={this.state.cards}
          />
        )}

        <NewPassword />
        <AccountDelete
          userName={this.state.userName}
          cards={this.state.cards}
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
