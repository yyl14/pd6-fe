import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchStudentCards } from '../../actions/user/user';
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
  const [editBasicInfo, setEditBasicInfo] = useState(false);

  const dispatch = useDispatch();
  const accountId = useSelector((state) => state.user.id);
  const authToken = useSelector((state) => state.user.token);
  const account = useSelector((state) => state.user);
  const studentCards = useSelector((state) => state.studentCards);
  const loading = useSelector((state) => state.loading.user);

  useEffect(() => {
    dispatch(fetchStudentCards(authToken, accountId));
  }, [authToken, accountId, dispatch]);

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

  if (account === undefined || studentCards === undefined) {
    if (loading.auth.fetchAccount || loading.user.fetchStudentCards) {
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
      <PageTitle text={`${account.usernamem} / Setting`} />
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
        <StudentInfoEdit cards={cards} />
      </div>

      <NewPassword />
    </div>
  );
}
