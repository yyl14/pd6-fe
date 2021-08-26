import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  Typography,
  Button,
  makeStyles,
  Dialog,
  DialogTitle,
  DialogActions,
  DialogContent,
  TextField,
  MenuItem,
  FormControl,
  Select,
} from '@material-ui/core';
import { useHistory, useParams } from 'react-router-dom';

import AlignedText from '../../../ui/AlignedText';

import { readProblemInfo, submitCode } from '../../../../actions/myClass/problem';
import { browseSubmitLang } from '../../../../actions/common/common';

import NoMatch from '../../../noMatch';

const useStyles = makeStyles((theme) => ({
  pageHeader: {
    marginBottom: '50px',
  },
  selectField: {
    width: '300px',
  },
  codingField: {
    width: '60vw',
  },
  bottomButton: {
    display: 'flex-end',
  },
}));

/* This is a level 4 component (page component) */
export default function CodeSubmission() {
  const {
    courseId, classId, challengeId, problemId,
  } = useParams();
  const history = useHistory();
  const classNames = useStyles();

  const dispatch = useDispatch();

  const problems = useSelector((state) => state.problem.byId);
  const challenges = useSelector((state) => state.challenges.byId);
  const submitLang = useSelector((state) => state.submitLangs);
  const authToken = useSelector((state) => state.auth.token);
  // const error = useSelector((state) => state.error);
  const loading = useSelector((state) => state.loading.myClass);

  const [langId, setLangId] = useState(-1);
  const [code, setCode] = useState('');

  const handleSubmit = () => {
    if (langId === -1) {
      return;
    }
    dispatch(submitCode(authToken, problemId, langId, code));
    // history.push(`/my-class/${courseId}/${classId}/challenge/${challengeId}/${problemId}`);
  };

  useEffect(() => {
    dispatch(readProblemInfo(authToken, problemId, challengeId));
  }, [authToken, challengeId, dispatch, problemId]);

  useEffect(() => {
    dispatch(browseSubmitLang(authToken));
  }, [authToken, dispatch]);

  if (problems[problemId] === undefined || challenges[challengeId] === undefined) {
    return <NoMatch />;
  }

  return (
    <>
      <Typography className={classNames.pageHeader} variant="h3">
        {challenges[challengeId].title}
        {' '}
        /
        {' '}
        {problems[problemId].challenge_label}
        / Code Submission
      </Typography>
      <AlignedText text="Language" maxWidth="lg" childrenType="filed">
        <FormControl variant="outlined" className={classNames.selectField}>
          <Select
            labelId="sort"
            id="sort"
            value={langId}
            onChange={(e) => {
              setLangId(e.target.value);
            }}
          >
            <MenuItem key={-1} value="">
              <em>None</em>
            </MenuItem>
            {submitLang.allIds.map((key) => <MenuItem key={submitLang.byId[key].id} value={submitLang.byId[key].id}>{submitLang.byId[key].name}</MenuItem>)}
          </Select>
        </FormControl>
      </AlignedText>
      <AlignedText text="Content" maxWidth="lg" childrenType="filed">
        <TextField
          className={classNames.codingField}
          value={code}
          onChange={(e) => {
            setCode(e.target.value);
          }}
          multiline
          minRows={10}
          maxRows={20}
        />
      </AlignedText>
      <div className={classNames.bottomButton}>
        <Button color="default" onClick={() => history.push(`/my-class/${courseId}/${classId}/challenge/${challengeId}/${problemId}`)}>Cancel</Button>
        <Button color="primary" onClick={handleSubmit}>Submit</Button>
      </div>
    </>
  );
}
