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

import { readProblem } from '../../../../actions/myClass/problem';
import { browseSubmitLang } from '../../../../actions/common/common';

const useStyles = makeStyles((theme) => ({
  pageHeader: {
    marginBottom: '50px',
  },
  selectField: {
    width: '300px',
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

  const problem = useSelector((state) => state.problem.byId);
  const submitLang = useSelector((state) => state.submitLangs);
  const authToken = useSelector((state) => state.auth.token);
  // const error = useSelector((state) => state.error);
  const loading = useSelector((state) => state.loading.myClass);

  const [lang, setLang] = useState('');

  useEffect(() => {
    dispatch(readProblem(authToken, problemId));
  }, [authToken, dispatch, problemId]);

  useEffect(() => {
    dispatch(browseSubmitLang(authToken));
  }, [authToken, dispatch]);
  // if (courses.byId[courseId] === undefined || courses.byId[courseId].name === undefined) {

  //   return <NoMatch />;
  // }

  return (
    <>
      <Typography className={classNames.pageHeader} variant="h3">
        HW4 /
        {' '}
        {problem.challenge_label}
        / Code Submission
      </Typography>
      <AlignedText text="Language" maxWidth="lg" childrenType="filed">
        <FormControl variant="outlined" className={classNames.selectField}>
          <Select
            labelId="sort"
            id="sort"
            value={lang}
            onChange={(e) => {
              setLang(e.target.value);
            }}
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            {submitLang.allIds.map((key) => <MenuItem key={submitLang.byId[key].id} value={submitLang.byId[key].name}>{submitLang.byId[key].name}</MenuItem>)}
          </Select>
        </FormControl>
      </AlignedText>
      <div>
        <Button color="default" onClick={() => history.push(`/my-class/${courseId}/${classId}/challenge/${challengeId}/${problemId}`)}>Cancel</Button>
        <Button color="primary" onClick={() => history.push(`/my-class/${courseId}/${classId}/challenge/${challengeId}/${problemId}`)}>Submit</Button>
      </div>
    </>
  );
}
