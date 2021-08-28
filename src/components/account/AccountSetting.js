import React, { Component, useState, useEffect } from 'react';
import { connect, useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { Button, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { editAccount, fetchStudentCard } from '../../actions/user/user';
import { getUserInfo } from '../../actions/user/auth';
import SimpleBar from '../ui/SimpleBar';
import NoMatch from '../noMatch';
import BasicInfo from './BasicInfo';
import BasicInfoEdit from './BasicInfoEdit';
import StudentInfo from './StudentInfo';
import StudentInfoEdit from './StudentInfoEdit';
import NewPassword from './NewPassword';

const useStyles = makeStyles((theme) => ({
  pageHeader: {
    marginBottom: '50px',
  },
}));

/* This is a level 3 component (page component) */

export default function AccountSetting() {
  const [cards, setCards] = useState([]);
  const [editBasicInfo, setEditBasicInfo] = useState(false);
  const [editStudInfo, setEditStudInfo] = useState(false);
  const classes = useStyles();

  const dispatch = useDispatch();
  const accountId = useSelector((state) => state.user.id);
  const authToken = useSelector((state) => state.user.token);
  const account = useSelector((state) => state.user);
  const studentCards = useSelector((state) => state.studentCards);
  const loading = useSelector((state) => state.loading.user);

  useEffect(() => {
    dispatch(fetchStudentCard(authToken, accountId));
  }, [authToken, accountId, dispatch]);

  useEffect(() => {
    let update = [];
    studentCards.allIds.forEach((key) => {
      update = [...update, studentCards.byId[key]];
    });
    setCards(update);
  }, [account, studentCards]);

  if (account === undefined || studentCards === undefined) {
    if (loading.auth.fetchAccount || loading.user.fetchStudentCard) {
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
      ) : (
        <BasicInfo
          handleEdit={handleBasicEdit}
          realName={account.real_name}
          userName={account.username}
          nickName={account.nickname}
          altMail={account.alternative_email}
        />
      )}

      {editStudInfo ? (
        <StudentInfoEdit handleBack={handleStudBack} cards={cards} />
      ) : (
        <StudentInfo handleEdit={handleStudEdit} cards={cards} />
      )}

      <NewPassword />
    </div>
  );
}
