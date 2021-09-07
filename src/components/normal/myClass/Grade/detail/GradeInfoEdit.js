import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams, Link } from 'react-router-dom';
import {
  makeStyles,
  Button,
  TextField,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
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
    marginBottom: '16px',
  },
  textLink: {
    textDecoration: 'none',
    color: theme.palette.primary.main,
  },
}));

export default function BasicInfoEdit(props) {
  const classNames = useStyles();
  const dispatch = useDispatch();
  const { gradeId } = useParams();

  const authToken = useSelector((state) => state.auth.token);
  const [score, setScore] = useState(props.grade.score);
  const [comment, setComment] = useState(props.grade.comment);

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
            <Typography variant="body1">
              <Link to={props.link} className={classNames.textLink}>
                {props.receiver.username}
              </Link>
            </Typography>
          </AlignedText>
          <AlignedText text="Student ID" maxWidth="lg" childrenType="text">
            <Typography variant="body1">{props.receiver.student_id}</Typography>
          </AlignedText>
          <AlignedText text="Real Name" maxWidth="lg" childrenType="text">
            <Typography variant="body1">{props.receiver.real_name}</Typography>
          </AlignedText>
          <AlignedText text="Challenge Title" maxWidth="lg" childrenType="text">
            <Typography variant="body1">{props.grade.title}</Typography>
          </AlignedText>
          <AlignedText text="Score" maxWidth="lg" childrenType="field">
            <TextField className={classNames.textFieldScore} value={score} onChange={(e) => setScore(e.target.value)} />
          </AlignedText>
          <AlignedText text="Comment" maxWidth="lg" childrenType="field">
            <TextField
              className={classNames.textFieldComment}
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              multiline
              rows={5}
            />
          </AlignedText>
          <AlignedText text="Submitted Time" maxWidth="lg" childrenType="text">
            <Typography variant="body1">{moment(props.grade.time).format('YYYY-MM-DD, HH:mm')}</Typography>
          </AlignedText>
          <div>
            <Button onClick={() => props.handleBack()}>Cancel</Button>
            <Button color="primary" type="submit" onClick={handleSave}>
              Save
            </Button>
          </div>
        </>
      </SimpleBar>
    </div>
  );
}
