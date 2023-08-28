import { Button, TextField, Typography, makeStyles } from '@material-ui/core';
import { useState } from 'react';
import { useDispatch } from 'react-redux';

import { editAccount } from '@/actions/user/user';
import AlignedText from '@/components/ui/AlignedText';
import SimpleBar from '@/components/ui/SimpleBar';
import useAccountStudentCards from '@/lib/studentCard/useAccountStudentCards';
import useAuthToken from '@/lib/user/useAuthToken';

const useStyles = makeStyles(() => ({
  buttons: {
    marginTop: '6px',
    marginLeft: '-5px',
  },
}));

export default function BasicInfoEdit({
  username,
  realName,
  nickname,
  altMail,
  handleBack,
  accountId,
}: {
  username: string;
  realName: string;
  nickname: string;
  altMail: string;
  handleBack: (msg: string) => void;
  accountId: string;
}) {
  const [usernames, setUsername] = useState(username);
  const [nicknames, setNickname] = useState(nickname);
  const [altMails, setAltMail] = useState(altMail);
  const classes = useStyles();
  const [error, setError] = useState(false);
  const [errorText, setErrorText] = useState('');

  const authToken = useAuthToken();
  const dispatch = useDispatch();
  const { mutatePendingStudentCards } = useAccountStudentCards(Number(accountId));

  const handleSave = () => {
    const altMailChanged = altMails !== altMail && altMail !== '';
    dispatch(editAccount(authToken, accountId, usernames, nicknames, altMailChanged ? altMails : null));
    mutatePendingStudentCards();
    handleBack(altMailChanged ? 'Alternative email will be updated once it’s verified.' : '');
  };

  const handleCancel = () => {
    handleBack('');
    setError(false);
    setErrorText('');
  };

  return (
    <div>
      <SimpleBar title="Basic Information">
        <>
          <AlignedText text="Username" childrenType="field" maxWidth="lg">
            <TextField
              value={usernames}
              onChange={(e) => {
                setUsername(e.target.value);
              }}
              error={error}
              helperText={errorText}
            />
          </AlignedText>
          <AlignedText text="Real name" childrenType="text" maxWidth="lg">
            <Typography variant="body1">{realName}</Typography>
          </AlignedText>
          <AlignedText text="Nickname" childrenType="field" maxWidth="lg">
            <TextField
              value={nicknames}
              onChange={(e) => {
                setNickname(e.target.value);
              }}
              error={error}
              helperText={errorText}
            />
          </AlignedText>
          <AlignedText text="Alternative Email" childrenType="field" maxWidth="lg">
            <TextField
              value={altMails}
              onChange={(e) => {
                setAltMail(e.target.value);
              }}
            />
          </AlignedText>
          <div className={classes.buttons}>
            <Button onClick={handleCancel}>Cancel</Button>
            <Button color="primary" type="submit" onClick={handleSave}>
              Save
            </Button>
          </div>
        </>
      </SimpleBar>
    </div>
  );
}
