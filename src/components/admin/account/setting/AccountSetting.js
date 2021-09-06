import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { fetchStudentCards } from '../../../../actions/admin/account';
import { fetchAccount, getInstitutes } from '../../../../actions/common/common';
import NoMatch from '../../../noMatch';
import BasicInfo from './BasicInfo';
import BasicInfoEdit from './BasicInfoEdit';
import StudentInfo from './StudentInfo';
import StudentInfoEdit from './StudentInfoEdit';
import AccountDelete from './AccountDelete';
import NewPassword from './NewPassword';
import GeneralLoading from '../../../GeneralLoading';

const useStyles = makeStyles(() => ({
  pageHeader: {
    marginBottom: '50px',
  },
}));

/* This is a level 4 component (page component) */

export default function AccountSetting() {
  const [cards, setCards] = useState([]);
  const [editBasicInfo, setEditBasicInfo] = useState(false);
  const [editStudInfo, setEditStudInfo] = useState(false);
  const classes = useStyles();

  const dispatch = useDispatch();
  const { accountId } = useParams();
  const authToken = useSelector((state) => state.auth.token);
  const accounts = useSelector((state) => state.accounts.byId);
  const studentCards = useSelector((state) => state.studentCards.byId);
  const loading = useSelector((state) => state.loading.admin.account);
  const account = accounts[accountId];

  useEffect(() => {
    if (!loading.editAccount) {
      dispatch(fetchAccount(authToken, accountId));
    }
  }, [accountId, authToken, dispatch, loading.editAccount]);

  useEffect(() => {
    if (!loading.makeStudentCardDefault) {
      dispatch(fetchStudentCards(authToken, accountId));
    }
  }, [accountId, authToken, dispatch, loading.makeStudentCardDefault]);

  useEffect(() => {
    setCards(Object.values(studentCards));
  }, [studentCards]);

  useEffect(() => {
    dispatch(getInstitutes());
  }, [dispatch]);

  if (accounts[accountId] === undefined || studentCards === undefined) {
    if (loading.fetchAccount || loading.fetchStudentCards) {
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
        <div>
          <StudentInfoEdit handleBack={handleStudBack} cards={cards} />
        </div>
      ) : (
        <div>
          <StudentInfo handleEdit={handleStudEdit} cards={cards} />
        </div>
      )}

      <NewPassword />
      <AccountDelete userName={account.username} cards={cards} realName={account.real_name} />
    </div>
  );
}
