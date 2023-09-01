import { Button, TextField, Typography, makeStyles } from '@material-ui/core';
import { useState } from 'react';

import AlignedText from '@/components/AlignedText';
import SimpleBar from '@/components/SimpleBar';
import useAccount from '@/lib/account/useAccount';

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
  accountId,
  isAdmin,
  handleBack,
}: {
  username: string;
  realName: string;
  nickname: string;
  altMail: string;
  accountId: number;
  isAdmin: boolean;
  handleBack: (msg: string) => void;
}) {
  const [inputs, setInputs] = useState({
    username,
    realName,
    nickname,
    altMail,
  });
  const [errors, setErrors] = useState({
    username: false,
    realName: false,
  });
  const [errorTexts, setErrorTexts] = useState({
    username: '',
    realName: '',
  });
  const classes = useStyles();
  const { editAccount } = useAccount(accountId);

  const handleSave = async () => {
    if (inputs.username === '') {
      setErrors((ori) => ({ ...ori, username: true }));
      setErrorTexts((ori) => ({ ...ori, username: "Can't be empty" }));
      return;
    }
    if (inputs.realName === '') {
      setErrors((ori) => ({ ...ori, realName: true }));
      setErrorTexts((ori) => ({ ...ori, realName: "Can't be empty" }));
      return;
    }

    const altMailChanged = inputs.altMail !== altMail && inputs.altMail !== '';
    try {
      await editAccount({
        account_id: accountId,
        username,
        nickname,
        alternative_email: altMailChanged ? altMail : undefined,
        real_name: realName,
      });
      handleBack(altMailChanged ? 'Alternative email will be updated once it’s verified.' : '');
      // eslint-disable-next-line no-empty
    } catch {}
  };

  const handleCancel = () => {
    handleBack('');
    setErrors({ realName: false, username: false });
    setErrorTexts({ realName: '', username: '' });
  };

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    const { name, value } = e.target;
    setInputs((input) => ({ ...input, [name]: value }));

    if (name === 'realName' && value !== '') {
      setErrors((ori) => ({ ...ori, realName: false }));
      setErrorTexts((ori) => ({ ...ori, realName: '' }));
    }
    if (name === 'username' && value !== '') {
      setErrors((ori) => ({ ...ori, username: false }));
      setErrorTexts((ori) => ({ ...ori, username: '' }));
    }
  };

  return (
    <div>
      <SimpleBar title="Basic Information">
        <>
          <AlignedText text="Username" childrenType="text" maxWidth="lg">
            <TextField
              name="username"
              value={inputs.username}
              variant="outlined"
              onChange={(e) => handleChange(e)}
              error={errors.username}
              helperText={errorTexts.username}
            />
          </AlignedText>
          {isAdmin ? (
            <AlignedText text="Real name" childrenType="field" maxWidth="lg">
              <TextField
                name="realName"
                value={inputs.realName}
                variant="outlined"
                onChange={(e) => handleChange(e)}
                error={errors.realName}
                helperText={errorTexts.realName}
              />
            </AlignedText>
          ) : (
            <AlignedText text="Real name" childrenType="text">
              <Typography variant="body1">{realName}</Typography>
            </AlignedText>
          )}
          <AlignedText text="Nickname" childrenType="field" maxWidth="lg">
            <TextField name="nickname" value={inputs.nickname} onChange={(e) => handleChange(e)} />
          </AlignedText>
          <AlignedText text="Alternative Email" childrenType="field" maxWidth="lg">
            <TextField value={inputs.altMail} name="altMail" onChange={(e) => handleChange(e)} />
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
