import { Snackbar } from '@material-ui/core';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { browsePendingStudentCards, fetchStudentCards } from '../../../../actions/admin/account';
import { fetchAccount, getInstitutes } from '../../../../actions/common/common';
import useReduxStateShape from '../../../../hooks/useReduxStateShape';
import useEmailVerification from '../../../../lib/email/useEmailVerification';
import useAccountStudentCards from '../../../../lib/studentCard/useAccountStudentCards';
import GeneralLoading from '../../../GeneralLoading';
import NoMatch from '../../../noMatch';
import PageTitle from '../../../ui/PageTitle';
import AccountDelete from './AccountDelete';
import BasicInfo from './BasicInfo';
import BasicInfoEdit from './BasicInfoEdit';
import NewPassword from './NewPassword';
import StudentInfoEdit from './StudentInfoEdit';

/* This is a level 4 component (page component) */

export default function AccountSetting() {
  const [cards, setCards] = useState([]);
  const [pendingCards, setPendingCards] = useState([]);
  const [editBasicInfo, setEditBasicInfo] = useState(false);
  const [showSnackbar, setShowSnackbar] = useState(false);
  const [message, setMessage] = useState('');
  const { isLoading: emailVerificationIsLoading } = useEmailVerification();

  const dispatch = useDispatch();
  const { accountId } = useParams();

  const authToken = useSelector((state) => state.auth.token);
  const accounts = useSelector((state) => state.accounts);
  const { studentCards, pendingStudentCards, isLoading } = useAccountStudentCards(accountId);
  const [studentCardsById, studentCardsIds] = useReduxStateShape(studentCards);
  const [pendingStudentCardsById, pendingStudentCardsIds] = useReduxStateShape(pendingStudentCards);
  const loading = useSelector((state) => state.loading.admin.account);

  useEffect(() => {
    if (!loading.editAccount) {
      dispatch(fetchAccount(authToken, accountId));
    }
  }, [accountId, authToken, dispatch, loading.editAccount]);

  useEffect(() => {
    if (!isLoading.makeDefault) {
      dispatch(fetchStudentCards(authToken, accountId));
    }
  }, [accountId, authToken, dispatch, isLoading.makeDefault]);

  useEffect(() => {
    if (!emailVerificationIsLoading.deletePendingEmailVerification && !isLoading.add) {
      dispatch(browsePendingStudentCards(authToken, accountId));
    }
  }, [
    accountId,
    authToken,
    dispatch,
    isLoading.add,
    emailVerificationIsLoading.deletePendingEmailVerification,
  ]);

  useEffect(() => {
    if (accounts.byId[accountId]) {
      const newData = studentCardsIds?.map(id => studentCardsById[id]) ?? [];
      setCards(newData);
    }
  }, [accountId, accounts, studentCardsById, studentCardsIds]);

  useEffect(() => {
    if (accounts.byId[accountId]) {
      const newData = pendingStudentCardsIds?.map(id => pendingStudentCardsById[id]) ?? [];
      setPendingCards(newData);
    }
  }, [accountId, accounts, pendingStudentCardsById, pendingStudentCardsIds]);

  useEffect(() => {
    dispatch(getInstitutes());
  }, [dispatch]);

  if (accounts.byId[accountId] === undefined || studentCardsById === undefined) {
    if (loading.fetchAccount || isLoading.browseAll || isLoading.browsePending) {
      return <GeneralLoading />;
    }
    return <NoMatch />;
  }

  const handleBasicBack = (msg) => {
    setEditBasicInfo(false);
    if (msg !== '') {
      setMessage(msg);
      setShowSnackbar(true);
    }
  };

  const handleBasicEdit = () => {
    setEditBasicInfo(true);
  };

  return (
    <div>
      <PageTitle text={`${accounts.byId[accountId].username} / Setting`} />
      {editBasicInfo ? (
        <BasicInfoEdit
          handleBack={handleBasicBack}
          realName={accounts.byId[accountId].real_name}
          username={accounts.byId[accountId].username}
          nickname={accounts.byId[accountId].nickname}
          altMail={accounts.byId[accountId].alternative_email}
        />
      ) : (
        <BasicInfo
          handleEdit={handleBasicEdit}
          realName={accounts.byId[accountId].real_name}
          username={accounts.byId[accountId].username}
          nickname={accounts.byId[accountId].nickname}
          altMail={accounts.byId[accountId].alternative_email}
        />
      )}

      <div>
        <StudentInfoEdit cards={cards} pendingCards={pendingCards} />
      </div>

      <NewPassword />
      <AccountDelete
        username={accounts.byId[accountId].username}
        cards={cards}
        realName={accounts.byId[accountId].real_name}
      />
      <Snackbar open={showSnackbar} autoHideDuration={3000} message={message} onClose={() => setShowSnackbar(false)} />
    </div>
  );
}
