import { Button, FormControl, MenuItem, Select, Snackbar, makeStyles } from '@material-ui/core';
import moment from 'moment';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';

import AlignedText from '../../../ui/AlignedText';
import PageTitle from '../../../ui/PageTitle';

import { readProblemInfo, submitCode } from '../../../../actions/myClass/problem';
import useSubmitLang from '../../../../lib/submitLang/useSubmitLang';

import useReduxStateShape from '../../../../hooks/useReduxStateShape';
import NoMatch from '../../../noMatch';
import CodeField from '../../../ui/CodeField';

const useStyles = makeStyles(() => ({
  selectField: {
    width: '300px',
  },
  bottomButton: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: '35px',
    marginRight: '-5px',
  },
  snackbarWidth: {
    width: '650px',
  },
}));

/* This is a level 4 component (page component) */
export default function CodeSubmission() {
  const { courseId, classId, challengeId, problemId } = useParams();
  const history = useHistory();
  const classNames = useStyles();

  const dispatch = useDispatch();

  const problems = useSelector((state) => state.problem.byId);
  const challenges = useSelector((state) => state.challenges.byId);
  // const submitLang = useSelector((state) => state.submitLangs);
  const submitLang = useSubmitLang();
  const [submitLangById, submitLangId] = useReduxStateShape(submitLang);
  const [lang, setLang] = useState([]);
  const authToken = useSelector((state) => state.auth.token);
  const errors = useSelector((state) => state.error.myClass.problem);

  const [langId, setLangId] = useState('');
  const [code, setCode] = useState('');

  const [warningPopup, setWarningPopup] = useState(false);
  const [currentTime] = useState(moment());

  const [showSnackbar, setShowSnackbar] = useState(false);

  useEffect(() => {
    if (challenges[challengeId] !== undefined) {
      if (currentTime.isAfter(moment(challenges[challengeId].end_time))) {
        setWarningPopup(true);
      }
    }
  }, [challengeId, challenges, currentTime]);

  useEffect(() => {
    const enabledIds = submitLangId.filter((id) => !submitLangId[id].is_disabled);
    setLang(enabledIds);
    if (localStorage.getItem('langId')) {
      if (enabledIds.includes(Number(localStorage.getItem('langId')))) {
        setLangId(Number(localStorage.getItem('langId')));
      } else if (enabledIds.length !== 0) {
        setLangId(enabledIds[0]);
      }
    } else if (enabledIds.length !== 0) {
      setLangId(enabledIds[0]);
    }
  }, [submitLangId, submitLangById]);

  const onSubmitSuccess = () => {
    history.push(`/my-class/${courseId}/${classId}/challenge/${challengeId}/${problemId}/my-submission`);
  };

  const handleSubmit = () => {
    if (langId === '') {
      return;
    }
    dispatch(
      submitCode(authToken, problemId, langId, code, onSubmitSuccess, () => {
        setShowSnackbar(true);
      }),
    );

    localStorage.setItem('langId', langId);
  };

  useEffect(() => {
    dispatch(readProblemInfo(authToken, problemId));
  }, [authToken, dispatch, problemId]);

  if (problems[problemId] === undefined || challenges[challengeId] === undefined) {
    return <NoMatch />;
  }

  return (
    <>
      <PageTitle text={`${challenges[challengeId].title} / ${problems[problemId].challenge_label} / Code Submission`} />
      <AlignedText text="Language" maxWidth="lg" childrenType="field">
        <FormControl variant="outlined" className={classNames.selectField}>
          <Select
            labelId="lang"
            id="lang"
            value={langId}
            onChange={(e) => {
              setLangId(e.target.value);
            }}
          >
            {lang.map((key) => (
              <MenuItem key={submitLangById[key].id} value={submitLangById[key].id}>
                {`${submitLangById[key].name} ${submitLangById[key].version}`}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </AlignedText>
      <AlignedText text="Content" maxWidth="lg" childrenType="field">
        <CodeField
          value={code}
          onChange={(e) => {
            setCode(e.target.value);
          }}
        />
      </AlignedText>
      <div className={classNames.bottomButton}>
        <Button
          color="default"
          onClick={() => history.push(`/my-class/${courseId}/${classId}/challenge/${challengeId}/${problemId}`)}
        >
          Cancel
        </Button>
        <Button color="primary" onClick={handleSubmit} disabled={code === '' || langId === -1}>
          Submit
        </Button>
      </div>
      <Snackbar
        open={warningPopup}
        ContentProps={{
          className: classNames.snackbarWidth,
        }}
        message="Submission over deadline will not be considered in score calculation."
        onClose={() => setWarningPopup(false)}
      />
      <Snackbar
        open={showSnackbar}
        autoHideDuration={3000}
        onClose={() => {
          setShowSnackbar(false);
        }}
        message={`Error: ${errors.submitCode}`}
      />
    </>
  );
}
