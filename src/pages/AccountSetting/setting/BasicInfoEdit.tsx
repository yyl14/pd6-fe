import { Button, TextField, Typography, makeStyles } from '@material-ui/core';
import { useState } from 'react';
import { useDispatch } from 'react-redux';

import AlignedText from '@/components/ui/AlignedText';
import SimpleBar from '@/components/ui/SimpleBar';
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
  handleBack,
}: {
  username: string;
  realName: string;
  nickname: string;
  altMail: string;
  accountId: number;
  handleBack: (msg: string) => void;
}) {
  const [inputs, setInputs] = useState({
    realName,
    nickname,
    altMail,
  });
  const [errors, setErrors] = useState({
    realName: false,
  });
  const [errorTexts, setErrorTexts] = useState({
    realName: '',
  });
  const classes = useStyles();
  const { editAccount } = useAccount(accountId);

  const dispatch = useDispatch();

  const handleSave = () => {
    if (inputs.realName === '') {
      setErrors((ori) => ({ ...ori, realName: true }));
      setErrorTexts((ori) => ({ ...ori, realName: "Can't be empty" }));
      return;
    }
    const altMailChanged = inputs.altMail !== altMail && inputs.altMail !== '';
    dispatch(
      editAccount({
        account_id: accountId,
        username,
        nickname,
        alternative_email: altMail,
        real_name: realName,
      }),
    );
    handleBack(altMailChanged ? 'Alternative email will be updated once it’s verified.' : '');
  };

  const handleCancel = () => {
    handleBack('');
    setErrors({ realName: false });
    setErrorTexts({ realName: '' });
  };

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    const { name, value } = e.target;
    setInputs((input) => ({ ...input, [name]: value }));

    if (name === 'realName' && value !== '') {
      setErrors((ori) => ({ ...ori, realName: false }));
      setErrorTexts((ori) => ({ ...ori, realName: '' }));
    }
  };

  return (
    <div>
      <SimpleBar title="Basic Information">
        <>
          <AlignedText text="Username" childrenType="text" maxWidth="lg">
            <Typography variant="body1">{username}</Typography>
          </AlignedText>
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
