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
import NoMatch from '@/components/noMatch';
import PageTitle from '@/components/ui/PageTitle';
import ThemeToggleContext from '@/contexts/ThemeContext';
import useEventListener from '@/hooks/useEventListener';
import useReduxStateShape from '@/hooks/useReduxStateShape';
import useAccount from '@/lib/account/useAccount';
import useAccountStudentCards from '@/lib/studentCard/useAccountStudentCards';

import BasicInfo from './setting/BasicInfo';
import BasicInfoEdit from './setting/BasicInfoEdit';
import NewPassword from './setting/NewPassword';
import StudentInfoEdit from './setting/StudentInfoEdit';
import { StudentCards } from './setting/types';

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

interface PendingStudentCardsForm {
  id: number;
  email: string;
  account_id: number;
  institute_id: number;
  student_id: string;
  is_consumed: boolean;
}

/* This is a level 3 component (page component) */

export default function AccountSetting({ accountId }: { accountId: string }) {
  const { value: selectedTheme } = useContext(ThemeToggleContext);
  // setter: setSelectedTheme
  const [selectedThemes, setSelectedThemes] = useState(selectedTheme);
  const [cards, setCards] = useState<StudentCards[]>([]);
  const [pendingCards, setPendingCards] = useState<PendingStudentCardsForm[]>([]);
  const [editBasicInfo, setEditBasicInfo] = useState(false);
  const [showSnackbar, setShowSnackbar] = useState(false);
  const [showThemeSelector, setShowThemeSelector] = useState(false);
  const [message, setMessage] = useState('');

  const { account, error, isLoading: loading } = useAccount(Number(accountId));
  const { studentCards, pendingStudentCards, isLoading } = useAccountStudentCards(Number(accountId));
  const [studentCardsById, studentCardsIds] = useReduxStateShape(studentCards);
  const [pendingStudentCardsById, pendingStudentCardsIds] = useReduxStateShape(pendingStudentCards);

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

  useEffect(() => {
    const newData = studentCardsIds?.map((id) => studentCardsById[id]) ?? [];
    setCards(newData);
  }, [studentCardsById, studentCardsIds]);

  useEffect(() => {
    const newData = pendingStudentCardsIds?.map((id) => pendingStudentCardsById[id]) ?? [];
    setPendingCards(newData);
  }, [pendingStudentCardsById, pendingStudentCardsIds]);

  function keydownHandler({ key }: { key: string }) {
    if (String(key) === '/') {
      setShowThemeSelector((state) => !state);
    }
  }

  useEventListener('keydown', keydownHandler);

  if (account === undefined || studentCards === undefined) {
    if (loading.account || isLoading.browseAll || isLoading.browsePending) {
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
        <StudentInfoEdit accountId={accountId} card={cards} pendingCard={pendingCards} />
      </div>
      <NewPassword accountId={accountId} />
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
