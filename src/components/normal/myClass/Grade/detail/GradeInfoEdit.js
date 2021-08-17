import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import {
  Button, TextField, Typography, makeStyles, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions,
} from '@material-ui/core';
import moment from 'moment-timezone';
import SimpleBar from '../../../../ui/SimpleBar';
import AlignedText from '../../../../ui/AlignedText';
import { editGrade } from '../../../../../actions/myClass/grade';

const useStyles = makeStyles((theme) => ({
  textFieldScore: {
    width: '350px',
  },
  textFieldComment: {
    width: '980px',
    height: '180px',
  },
  gap: {
    marginTop: theme.spacing(2),
  },
}));

export default function BasicInfoEdit(props) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { gradeId } = useParams();

  const authToken = useSelector((state) => state.auth.token);
  const [score, setScore] = useState(props.score);
  const [comment, setComment] = useState(props.comment);
  const [disabled, setDisabled] = useState(true);

  const handleSave = () => {
    if (score !== '') {
      dispatch(editGrade(authToken, gradeId, props.title, score, comment));
    }
    props.handleBack();
  };

  return (
    <div>
      <SimpleBar title="Grade Information">
        <>
          <AlignedText text="Username" maxWidth="lg" childrenType="text">
            <Typography variant="body1">{props.userName}</Typography>
          </AlignedText>
          <AlignedText text="Student ID" maxWidth="lg" childrenType="text">
            <Typography variant="body1">{props.studentId}</Typography>
          </AlignedText>
          <AlignedText text="Real Name" maxWidth="lg" childrenType="text">
            <Typography variant="body1">{props.realName}</Typography>
          </AlignedText>
          <AlignedText text="Challenge Title" maxWidth="lg" childrenType="text">
            <Typography variant="body1">{props.title}</Typography>
          </AlignedText>
          <AlignedText text="Score" maxWidth="lg" childrenType="field">
            <TextField
              value={score}
              onChange={(e) => {
                setScore(e.target.value);
                setDisabled(false);
              }}
              className={classes.textFieldScore}
            />
          </AlignedText>
          <AlignedText text="Comment" maxWidth="lg" childrenType="field">
            <TextField
              value={comment}
              onChange={(e) => {
                setComment(e.target.value);
                setDisabled(false);
              }}
              className={classes.textFieldComment}
            />
          </AlignedText>
          <AlignedText text="Submitted Time" maxWidth="lg" childrenType="text">
            <Typography variant="body1">{moment(props.time).format('YYYY-MM-DD, HH:mm')}</Typography>
          </AlignedText>
          <div className={classes.gap}>
            <Button onClick={() => props.handleBack()}>Cancel</Button>
            <Button
              color="primary"
              type="submit"
              disabled={disabled}
              onClick={handleSave}
            >
              Save
            </Button>
          </div>
        </>
      </SimpleBar>
    </div>
  );
}
