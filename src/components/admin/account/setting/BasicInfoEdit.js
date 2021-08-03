import {
  Button, Divider, Grid, TextField, Typography, Box, makeStyles,
} from '@material-ui/core';
import React, { useState } from 'react';
import SimpleBar from '../../../ui/SimpleBar';
import AlignedText from '../../../ui/AlignedText';

const useStyles = makeStyles((theme) => ({
  row: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  item: {
    width: '250px',
  },
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

  const handleSave = () => {
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
          <div className={classes.row}>
            <div className={classes.item}>
              <Typography>Username</Typography>
            </div>
            <div className={classes.item}>
              <Typography variant="body1">{props.userName}</Typography>
            </div>
          </div>
        </p>
        <p>
          <div className={classes.row}>
            <div className={classes.item}>
              <Typography>Real name</Typography>
            </div>
            <div className={classes.item}>
              <TextField
                value={realName}
                variant="outlined"
                onChange={(e) => {
                  setRealName(e.target.value);
                  setDisabled(false);
                }}
                className={classes.textfield}
              />
            </div>
          </div>
        </p>
        <p>
          <div className={classes.row}>
            <div className={classes.item}>
              <Typography>Nickname</Typography>
            </div>
            <div className={classes.item}>
              <TextField
                value={nickName}
                onChange={(e) => {
                  setNickName(e.target.value);
                  setDisabled(false);
                }}
                className={classes.textfield}
              />
            </div>
          </div>
        </p>
        <p>
          <div className={classes.row}>
            <div className={classes.item}>
              <Typography>Alternative Email</Typography>
            </div>
            <div className={classes.item}>
              <TextField
                value={altMail}
                onChange={(e) => {
                  setAltMail(e.target.value);
                  setDisabled(false);
                }}
                className={classes.textfield}
              />
            </div>
          </div>
        </p>

        {/* <p>
          <AlignedText text="Username" childrenType="text">
            <Typography variant="body1">{props.userName}</Typography>
          </AlignedText>
        </p>
        <p>
          <AlignedText text="Real name" childrenType="field">
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
          <AlignedText text="Nickname" childrenType="field">
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
          <AlignedText text="Alternative Email" childrenType="field">
            <TextField
              value={altMail}
              onChange={(e) => {
                setAltMail(e.target.value);
                setDisabled(false);
              }}
              className={classes.textfield}
            />
          </AlignedText>
        </p> */}
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
