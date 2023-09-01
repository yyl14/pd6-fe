import {
  Dialog,
  DialogContent,
  DialogTitle,
  FormControl,
  MenuItem,
  Select,
  Snackbar,
  Typography,
} from '@material-ui/core';
import React, { useContext, useEffect, useState } from 'react';

import GeneralLoading from '@/components/GeneralLoading';
import PageTitle from '@/components/PageTitle';
import NoMatch from '@/components/noMatch';
import ThemeToggleContext from '@/contexts/ThemeContext';
import useEventListener from '@/hooks/useEventListener';
import useAccount from '@/lib/account/useAccount';

import BasicInfo from './setting/BasicInfo';
import BasicInfoEdit from './setting/BasicInfoEdit';
import NewPassword from './setting/NewPassword';
import StudentCards from './setting/StudentCards';

const activeThemeList = [
  {
    label: 'PDOGS 6',
    value: 'pd6New',
  },
  {
    label: 'PDOGS 6 Classic',
    value: 'pd6',
  },
  {
    label: 'DOGE',
    value: 'doge',
  },
  {
    label: 'IM Night 2021',
    value: 'IMNight2021',
  },
  {
    label: 'IM Camp 2021',
    value: 'IMCamp2021',
  },
];

export default function AccountSetting({ accountId, isAdmin }: { accountId: number; isAdmin: boolean }) {
  const { value: selectedTheme } = useContext(ThemeToggleContext);
  const [selectedThemes, setSelectedThemes] = useState(selectedTheme);
  const [editBasicInfo, setEditBasicInfo] = useState(false);
  const [showSnackbar, setShowSnackbar] = useState(false);
  const [showThemeSelector, setShowThemeSelector] = useState(false);
  const [message, setMessage] = useState('');

  const { account, error, isLoading: loading } = useAccount(accountId);

  useEffect(() => {
    if (account?.role === 'GUEST') {
      setMessage('Please verify your institute email to activate your PDOGS account.');
      setShowSnackbar(true);
    } else {
      setShowSnackbar(false);
    }
  }, [account?.role]);

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

  function keydownHandler({ key }: { key: string }) {
    if (key === '/') {
      setShowThemeSelector((state) => !state);
    }
  }

  useEventListener('keydown', keydownHandler);

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
      <Snackbar
        open={showSnackbar}
        autoHideDuration={3000}
        onClose={() => {
          setShowSnackbar(false);
          setMessage('');
        }}
        message={message}
      />
      <Dialog open={showThemeSelector} onClose={() => setShowThemeSelector(false)}>
        <DialogTitle>
          <Typography variant="h4">Wow, super secret option! 🐕</Typography>
        </DialogTitle>
        <DialogContent>
          <FormControl variant="outlined">
            <Select
              value={selectedThemes}
              onChange={(e) => setSelectedThemes(e.target.value as React.SetStateAction<string>)}
            >
              {activeThemeList.map((item) => (
                <MenuItem key={item.value} value={item.value}>
                  {item.label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </DialogContent>
      </Dialog>
    </>
  );
}
