import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { fetchStudentCard } from '../../actions/user/user';
import { getInstitutes } from '../../actions/common/common';
import GeneralLoading from '../GeneralLoading';

import NoMatch from '../noMatch';
import BasicInfo from './BasicInfo';
import BasicInfoEdit from './BasicInfoEdit';
import StudentInfo from './StudentInfo';
import StudentInfoEdit from './StudentInfoEdit';
import NewPassword from './NewPassword';

const useStyles = makeStyles(() => ({
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
    setCards(account.studentCards.reduce((acc, key) => [...acc, studentCards.byId[key]], []));
  }, [account, studentCards]);

  useEffect(() => {
    dispatch(getInstitutes());
  }, [dispatch]);

  if (account === undefined || studentCards === undefined) {
    if (loading.auth.fetchAccount || loading.user.fetchStudentCard) {
      return <GeneralLoading />;
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
