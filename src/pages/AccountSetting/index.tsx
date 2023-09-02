import { Snackbar } from '@material-ui/core';
import { useEffect, useState } from 'react';

import GeneralLoading from '@/components/GeneralLoading';
import PageTitle from '@/components/PageTitle';
import NoMatch from '@/components/noMatch';
import useAccount from '@/lib/account/useAccount';

import AccountDelete from './setting/AccountDelete';
import BasicInfo from './setting/BasicInfo';
import BasicInfoEdit from './setting/BasicInfoEdit';
import NewPassword from './setting/NewPassword';
import StudentCards from './setting/StudentCards';
import ThemeSetting from './setting/ThemeSetting';

export default function AccountSetting({ accountId, isAdmin }: { accountId: number; isAdmin: boolean }) {
  const [editBasicInfo, setEditBasicInfo] = useState(false);
  const [showSnackbar, setShowSnackbar] = useState(false);
  const [message, setMessage] = useState('');

  const { account, error, isLoading: loading } = useAccount(accountId);

  useEffect(() => {
    if (account?.role === 'GUEST' && !isAdmin) {
      setMessage('Please verify your institute email to activate your PDOGS account.');
      setShowSnackbar(true);
    } else {
      setShowSnackbar(false);
    }
  }, [account?.role, isAdmin]);

  useEffect(() => {
    if (!loading.editAccount && error.editAccount) {
      if (error.editAccount === 'UniqueViolationError') {
        setMessage('Edit account error: Username already taken.');
      } else {
        setMessage(`Edit account error: ${error.editAccount}`);
      }
      setShowSnackbar(true);
    }
  }, [error.editAccount, loading.editAccount]);

  if (account === undefined) {
    if (loading.account) {
      return <GeneralLoading />;
    }
    return <NoMatch />;
  }

  const handleBasicBack = (msg: string) => {
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
    <>
      <PageTitle text={`${account.username} / Setting`} />
      {editBasicInfo ? (
        <BasicInfoEdit
          handleBack={handleBasicBack}
          realName={account.real_name}
          username={account.username}
          nickname={account.nickname}
          altMail={account.alternative_email}
          isAdmin={isAdmin}
          accountId={accountId}
        />
      ) : (
        <BasicInfo
          handleEdit={handleBasicEdit}
          realName={account.real_name}
          username={account.username}
          nickname={account.nickname}
          altMail={account.alternative_email}
        />
      )}
      <div>
        <StudentCards accountId={accountId} />
      </div>
      <NewPassword accountId={accountId} isAdmin={isAdmin} />
      {isAdmin && <AccountDelete accountId={accountId} />}
      {!isAdmin && <ThemeSetting />}

      <Snackbar
        open={showSnackbar}
        autoHideDuration={3000}
        onClose={() => {
          setShowSnackbar(false);
          setMessage('');
        }}
        message={message}
      />
    </>
  );
}
