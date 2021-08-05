import {
  Button, Divider, Grid, TextField, Typography, Box, makeStyles,
} from '@material-ui/core';
import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import SimpleBar from '../../../ui/SimpleBar';
import AlignedText from '../../../ui/AlignedText';
import { editAccount } from '../../../../actions/admin/account';

const useStyles = makeStyles((theme) => ({
  textfield: {
    width: '350px',
  },
}));

export default function BasicInfoEdit(props) {
  const [realName, setRealName] = useState(props.realName);
  const [userName, setUserName] = useState(props.userName);
  const [nickName, setNickName] = useState(props.nickName);
  const [altMail, setAltMail] = useState(props.altMail);
  const [disabled, setDisabled] = useState(true);
  const classes = useStyles();

  const { accountId } = useParams();
  const authToken = useSelector((state) => state.auth.user.token);
  const dispatch = useDispatch();

  const handleSave = () => {
    dispatch(editAccount(authToken, accountId, userName, realName, nickName, altMail));
    // save revised datas to the system
    props.setBasicInfo(realName, userName, nickName, altMail);
    props.handleBack();
  };

  return (
    <div>
      <SimpleBar
        title="Basic Information"
      >
        <p>
          <AlignedText text="Username" childrenType="text" maxWidth="lg">
            <Typography variant="body1">{props.userName}</Typography>
          </AlignedText>
        </p>
        <p>
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
        </p>
        <p>
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
        </p>
        <p>
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
        </p>
        <Button onClick={() => props.handleBack()}>Cancel</Button>
        <Button
          color="primary"
          type="submit"
          disabled={disabled}
          onClick={handleSave}
        >
          Save
        </Button>
      </SimpleBar>
    </div>
  );
}
