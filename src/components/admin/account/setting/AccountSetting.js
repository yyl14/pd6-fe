import React, { Component, useState, useEffect } from 'react';
import { connect, useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { Button, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { editAccount, fetchAccount, fetchStudentCard } from '../../../../actions/admin/account';
import SimpleBar from '../../../ui/SimpleBar';
import NoMatch from '../../../noMatch';
import BasicInfo from './BasicInfo';
import BasicInfoEdit from './BasicInfoEdit';
import StudentInfo from './StudentInfo';
import StudentInfoEdit from './StudentInfoEdit';
import AccountDelete from './AccountDelete';
import NewPassword from './NewPassword';

const useStyles = makeStyles((theme) => ({
  pageHeader: {
    marginBottom: '50px',
  },
}));

/* This is a level 4 component (page component) */

// MAKE_STUDENT_CARD_DEFAULT_SUCCESS not yet finished
export default function AccountSetting() {
  const [cards, setCards] = useState([]);
  const [editBasicInfo, setEditBasicInfo] = useState(false);
  const [editStudInfo, setEditStudInfo] = useState(false);
  const classes = useStyles();

  const dispatch = useDispatch();
  const { accountId } = useParams();
  const authToken = useSelector((state) => state.auth.user.token);
  const accounts = useSelector((state) => state.admin.account.accounts.byId);
  const studentCards = useSelector((state) => state.admin.account.studentCards.byId);
  const loading = useSelector((state) => state.admin.account.loading);
  const account = accounts[accountId];

  useEffect(() => {
    dispatch(fetchAccount(authToken, accountId));
    dispatch(fetchStudentCard(authToken, accountId));
  }, [authToken, accountId, dispatch]);

  useEffect(() => {
    // console.log(accounts[accountId]);
    // console.log(accounts[accountId].studentCard);
    let update = [];
    accounts[accountId].studentCard.forEach((key) => {
      update = [...update, studentCards[key]];
    });
    setCards(update);
  }, [accounts, accountId, studentCards]);

  if (accounts[accountId] === undefined || studentCards === undefined) {
    if (loading.fetchAccount || loading.fetchStudentCard) {
      return <div>loading...</div>;
    }
    return <NoMatch />;
  }
  const handleBasicBack = () => {
    setEditBasicInfo(false);
  };

  const handleBasicEdit = () => {
    setEditBasicInfo(true);
  };

  const handleStudBack = () => {
    setEditStudInfo(false);
  };

  const handleStudEdit = () => {
    setEditStudInfo(true);
  };

  return (
    <div>
      <Typography variant="h3" className={classes.pageHeader}>
        {account.username}
        {' '}
        / Setting
      </Typography>
      {editBasicInfo ? (
        <BasicInfoEdit
          handleBack={handleBasicBack}
          realName={account.real_name}
          userName={account.username}
          nickName={account.nickname}
          altMail={account.alternative_email}
        />
      )
        : (
          <BasicInfo
            handleEdit={handleBasicEdit}
            realName={account.real_name}
            userName={account.username}
            nickName={account.nickname}
            altMail={account.alternative_email}
          />
        )}

      {editStudInfo ? (
        <div>
          <StudentInfoEdit
            handleBack={handleStudBack}
            cards={cards}
          />
        </div>
      ) : (
        <div>
          <StudentInfo
            handleEdit={handleStudEdit}
            cards={cards}
          />

        </div>
      )}

      {/* <NewPassword /> */}
      <AccountDelete
        userName={account.username}
        cards={cards}
        realName={account.real_name}
      />
    </div>
  );
}
