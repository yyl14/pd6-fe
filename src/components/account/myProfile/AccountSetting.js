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
import { useContext, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import ThemeToggleContext from '../../../contexts/themeToggleContext';
import useEventListener from '../../../hooks/useEventListener';
import useReduxStateShape from '../../../hooks/useReduxStateShape';
import useAccountStudentCards from '../../../lib/studentCard/useAccountStudentCards';
import GeneralLoading from '../../GeneralLoading';
import NoMatch from '../../noMatch';
import PageTitle from '../../ui/PageTitle';
import BasicInfo from './setting/BasicInfo';
import BasicInfoEdit from './setting/BasicInfoEdit';
import NewPassword from './setting/NewPassword';
import StudentInfoEdit from './setting/StudentInfoEdit';

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

/* This is a level 3 component (page component) */

export default function AccountSetting() {
  const { value: selectedTheme, setter: setSelectedTheme } = useContext(ThemeToggleContext);
  const [cards, setCards] = useState([]);
  const [pendingCards, setPendingCards] = useState([]);
  const [editBasicInfo, setEditBasicInfo] = useState(false);
  const [showSnackbar, setShowSnackbar] = useState(false);
  const [showThemeSelector, setShowThemeSelector] = useState(false);
  const [message, setMessage] = useState('');

  const accountId = useSelector((state) => state.user.id);
  const account = useSelector((state) => state.user);
  const { studentCards, pendingStudentCards, isLoading } = useAccountStudentCards(accountId);
  const [studentCardsById, studentCardsIds] = useReduxStateShape(studentCards);
  const [pendingStudentCardsById, pendingStudentCardsIds] = useReduxStateShape(pendingStudentCards);
  const loading = useSelector((state) => state.loading.user);
  const error = useSelector((state) => state.error.user);

  useEffect(() => {
    if (account.role === 'GUEST') {
      setMessage('Please verify your institute email to activate your PDOGS account.');
      setShowSnackbar(true);
    } else {
      setShowSnackbar(false);
    }
  }, [account.role]);

  useEffect(() => {
    if (!loading.user.editAccount && error.user.editAccount) {
      if (error.user.editAccount === 'UniqueViolationError') {
        setMessage('Edit account error: Username already taken.');
      } else {
        setMessage(`Edit account error: ${error.user.editAccount}`);
      }
      setShowSnackbar(true);
    }
  }, [error.user.editAccount, loading.user.editAccount]);

  useEffect(() => {
    const newData = studentCardsIds?.map((id) => studentCardsById[id]) ?? [];
    setCards(newData);
  }, [studentCardsById, studentCardsIds]);

  useEffect(() => {
    const newData = pendingStudentCardsIds?.map((id) => pendingStudentCardsById[id]) ?? [];
    setPendingCards(newData);
  }, [pendingStudentCardsById, pendingStudentCardsIds]);

  function keydownHandler({ key }) {
    if (String(key) === '/') {
      setShowThemeSelector((state) => !state);
    }
  }

  useEventListener('keydown', keydownHandler);

  if (account === undefined || studentCards === undefined) {
    if (loading.auth.fetchAccount || isLoading.browseAll || isLoading.browsePending) {
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
    <>
      <PageTitle text={`${account.username} / Setting`} />
      {editBasicInfo ? (
        <BasicInfoEdit
          handleBack={handleBasicBack}
          realName={account.real_name}
          username={account.username}
          nickname={account.nickname}
          altMail={account.alternative_email}
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
        <StudentInfoEdit cards={cards} pendingCards={pendingCards} />
      </div>
      <NewPassword />
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
            <Select value={selectedTheme} onChange={(e) => setSelectedTheme(e.target.value)}>
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
