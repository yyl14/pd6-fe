import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { fetchStudentCard, browsePendingStudentCards } from '../../../../actions/admin/account';
import { fetchAccount, getInstitutes } from '../../../../actions/common/common';
import NoMatch from '../../../noMatch';
import BasicInfo from './BasicInfo';
import BasicInfoEdit from './BasicInfoEdit';
// import StudentInfo from './StudentInfo';
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
  const [pendingCards, setPendingCards] = useState([]);
  const [editBasicInfo, setEditBasicInfo] = useState(false);
  const classes = useStyles();
  const dispatch = useDispatch();
  const { accountId } = useParams();

  const authToken = useSelector((state) => state.auth.token);
  const accounts = useSelector((state) => state.accounts.byId);
  const studentCards = useSelector((state) => state.studentCards.byId);
  const pendingStudentCards = useSelector((state) => state.pendingStudentCards.byId);
  const loading = useSelector((state) => state.loading.admin.account);

  useEffect(() => {
    if (!loading.editAccount) {
      dispatch(fetchAccount(authToken, accountId));
    }
  }, [accountId, authToken, dispatch, loading.editAccount]);

  useEffect(() => {
    if (!loading.makeStudentCardDefault) {
      dispatch(fetchStudentCard(authToken, accountId));
    }
  }, [accountId, authToken, dispatch, loading.makeStudentCardDefault]);

  useEffect(() => {
    if (!loading.deletePendingStudentCard) {
      dispatch(browsePendingStudentCards(authToken, accountId));
    }
  }, [accountId, authToken, dispatch, loading.deletePendingStudentCard]);

  useEffect(() => {
    setCards(
      accounts[accountId].studentCard.reduce((acc, key) => {
        if (studentCards[key]) {
          return [...acc, studentCards[key]];
        }
        return [...acc];
      }, []),
    );
  }, [accountId, accounts, studentCards]);

  useEffect(() => {
    setPendingCards(
      accounts[accountId].pendingStudentCard.reduce((acc, key) => {
        if (pendingStudentCards[key]) {
          return [...acc, pendingStudentCards[key]];
        }
        return [...acc];
      }, []),
    );
  }, [accountId, accounts, pendingStudentCards]);

  useEffect(() => {
    dispatch(getInstitutes());
  }, [dispatch]);

  if (accounts[accountId] === undefined || studentCards === undefined) {
    if (loading.fetchAccount || loading.fetchStudentCard) {
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

  // const handleStudBack = () => {
  //   setEditStudInfo(false);
  // };

  // const handleStudEdit = () => {
  //   setEditStudInfo(true);
  // };

  return (
    <div>
      <Typography variant="h3" className={classes.pageHeader}>
        {accounts[accountId].username}
        {' '}
        / Setting
      </Typography>
      {editBasicInfo ? (
        <BasicInfoEdit
          handleBack={handleBasicBack}
          realName={accounts[accountId].real_name}
          userName={accounts[accountId].username}
          nickName={accounts[accountId].nickname}
          altMail={accounts[accountId].alternative_email}
        />
      ) : (
        <BasicInfo
          handleEdit={handleBasicEdit}
          realName={accounts[accountId].real_name}
          userName={accounts[accountId].username}
          nickName={accounts[accountId].nickname}
          altMail={accounts[accountId].alternative_email}
        />
      )}

      <div>
        <StudentInfoEdit cards={cards} pendingCards={pendingCards} />
      </div>

      <NewPassword />
      <AccountDelete userName={accounts[accountId].username} cards={cards} realName={accounts[accountId].real_name} />
    </div>
  );
}
