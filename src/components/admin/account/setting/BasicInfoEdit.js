import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import {
  Button, TextField, Typography, makeStyles,
} from '@material-ui/core';
import SimpleBar from '../../../ui/SimpleBar';
import AlignedText from '../../../ui/AlignedText';
import { editAccount } from '../../../../actions/admin/account';
// import NoMatch from '../../../noMatch';

const useStyles = makeStyles((theme) => ({
  textfield: {
    width: '350px',
  },
}));

export default function BasicInfoEdit(props) {
  const [realName, setRealName] = useState(props.realName);
  const [userName, setUserName] = useState(props.userName);
  const [nickName, setNickName] = useState(props.nickName);
  const [altMail, setAltMail] = useState(props.altMail ? props.altMail : '');
  const [disabled, setDisabled] = useState(true);
  const classes = useStyles();

  const { accountId } = useParams();
  const authToken = useSelector((state) => state.auth.user.token);
  // const loading = useSelector((state) => state.admin.account.loading);
  const dispatch = useDispatch();

  const handleSave = () => {
    dispatch(editAccount(authToken, accountId, userName, realName, nickName, altMail));
    props.handleBack();
  };

  return (
    <div>
      <SimpleBar
        title="Basic Information"
      >
        <>
          <AlignedText text="Username" childrenType="text" maxWidth="lg">
            <Typography variant="body1">{userName}</Typography>
          </AlignedText>
          <AlignedText text="Real name" childrenType="field" maxWidth="lg">
            <TextField
              value={realName}
              variant="outlined"
              onChange={(e) => {
                setRealName(e.target.value);
                setDisabled(false);
              }}
              className={classes.textfield}
            />
          </AlignedText>
          <AlignedText text="Nickname" childrenType="field" maxWidth="lg">
            <TextField
              value={nickName}
              onChange={(e) => {
                setNickName(e.target.value);
                setDisabled(false);
              }}
              className={classes.textfield}
            />
          </AlignedText>
          <AlignedText text="Alternative Email" childrenType="field" maxWidth="lg">
            <TextField
              value={altMail}
              onChange={(e) => {
                setAltMail(e.target.value);
                setDisabled(false);
              }}
              className={classes.textfield}
            />
          </AlignedText>
          <Button onClick={() => props.handleBack()}>Cancel</Button>
          <Button
            color="primary"
            type="submit"
            disabled={disabled}
            onClick={handleSave}
          >
            Save
          </Button>
        </>
      </SimpleBar>
    </div>
  );
}
