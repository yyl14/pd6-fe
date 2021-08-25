import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import {
  Button, TextField, Typography, makeStyles, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions,
} from '@material-ui/core';
import moment from 'moment-timezone';
import SimpleBar from '../../../../ui/SimpleBar';
import AlignedText from '../../../../ui/AlignedText';
import { editTeam } from '../../../../../actions/myClass/team';

const useStyles = makeStyles((theme) => ({
  textField: {
    width: '350px',
  },
  label: {
    marginTop: '38px',
  },
}));

export default function BasicInfoEdit(props) {
  const classNames = useStyles();
  const dispatch = useDispatch();
  const { classId, teamId } = useParams();

  const authToken = useSelector((state) => state.auth.token);
  const [teamName, setTeamName] = useState(props.teamName);
  const [label, setLabel] = useState(props.label);

  const handleSave = () => {
    if (teamName !== '' && label !== '') {
      dispatch(editTeam(authToken, teamId, teamName, classId, label));
    }
    props.handleBack();
  };

  return (
    <div>
      <SimpleBar title="Team Information">
        <>
          <AlignedText text="Team Name" maxWidth="lg" childrenType="field">
            <TextField
              className={classNames.textField}
              value={teamName}
              onChange={(e) => setTeamName(e.target.value)}
            />
          </AlignedText>
          {props.isManager ? (
            <AlignedText text="Label" maxWidth="lg" childrenType="field">
              <TextField
                className={classNames.textField}
                value={label}
                onChange={(e) => setLabel(e.target.value)}
              />
            </AlignedText>
          ) : (
            <div className={classNames.label}>
              <AlignedText text="Label" maxWidth="lg" childrenType="text">
                <Typography variant="body1">{label}</Typography>
              </AlignedText>
            </div>
          )}
          <Button onClick={() => props.handleBack()}>Cancel</Button>
          <Button
            color="primary"
            type="submit"
            onClick={handleSave}
          >
            Save
          </Button>
        </>
      </SimpleBar>
    </div>
  );
}
