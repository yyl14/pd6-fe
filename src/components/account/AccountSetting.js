import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Snackbar } from '@material-ui/core';

import { fetchStudentCards, browsePendingStudentCards } from '../../actions/user/user';
import { getInstitutes } from '../../actions/common/common';
import GeneralLoading from '../GeneralLoading';
import PageTitle from '../ui/PageTitle';
import NoMatch from '../noMatch';
import BasicInfo from './BasicInfo';
import BasicInfoEdit from './BasicInfoEdit';
import StudentInfoEdit from './StudentInfoEdit';
import NewPassword from './NewPassword';

/* This is a level 3 component (page component) */

export default function AccountSetting() {
  const [cards, setCards] = useState([]);
  const [pendingCards, setPendingCards] = useState([]);
  const [editBasicInfo, setEditBasicInfo] = useState(false);

  const dispatch = useDispatch();
  const accountId = useSelector((state) => state.user.id);
  const authToken = useSelector((state) => state.user.token);
  const account = useSelector((state) => state.user);
  const studentCards = useSelector((state) => state.studentCards);
  const pendingStudentCards = useSelector((state) => state.pendingStudentCards);
  const loading = useSelector((state) => state.loading.user);

  const [showSnackbar, setShowSnackbar] = useState(true);

  useEffect(() => {
    if (account.role === 'GUEST') {
      setShowSnackbar(true);
    } else {
      setShowSnackbar(false);
    }
  }, [account.role]);

  useEffect(() => {
    if (!loading.user.makeStudentCardDefault) {
      dispatch(fetchStudentCards(authToken, accountId));
    }
  }, [authToken, accountId, dispatch, loading.user.makeStudentCardDefault]);

  useEffect(() => {
    if (!loading.user.deletePendingStudentCard && !loading.user.addStudentCard) {
      dispatch(browsePendingStudentCards(authToken, accountId));
    }
  }, [accountId, authToken, dispatch, loading.user.addStudentCard, loading.user.deletePendingStudentCard]);

  useEffect(() => {
    dispatch(getInstitutes());
  }, [dispatch]);

  useEffect(() => {
    setCards(
      account.studentCards.reduce((acc, key) => {
        if (studentCards.byId[key]) {
          return [...acc, studentCards.byId[key]];
        }
        return [...acc];
      }, []),
    );
  }, [account, studentCards]);

  useEffect(() => {
    setPendingCards(
      account.pendingStudentCards.reduce((acc, key) => {
        if (pendingStudentCards.byId[key]) {
          return [...acc, pendingStudentCards.byId[key]];
        }
        return [...acc];
      }, []),
    );
  }, [account, pendingStudentCards]);

  if (account === undefined || studentCards === undefined) {
    if (loading.auth.fetchAccount || loading.user.fetchStudentCards || loading.user.browsePendingStudentCards) {
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

  return (
    <div>
      <PageTitle text={`${account.username} / Setting`} />
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
      <div>
        <StudentInfoEdit cards={cards} pendingCards={pendingCards} />
      </div>

      <NewPassword />
      <Snackbar
        open={showSnackbar}
        style={{ width: '600px' }}
        autoHideDuration={3000}
        message="Please verify your institute email to activate your PDOGS account."
        onClose={() => setShowSnackbar(false)}
      />
    </div>
  );
}
