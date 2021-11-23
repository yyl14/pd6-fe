import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import {
  Typography,
  Button,
  makeStyles,
  Dialog,
  DialogTitle,
  DialogActions,
  DialogContent,
  TextField,
  FormControl,
  Select,
  MenuItem,
  Snackbar,
} from '@material-ui/core';
import AlignedText from '../../../ui/AlignedText';
import MultiSelect from '../../../ui/MultiSelect';
import Icon from '../../../ui/icon/index';
import NoMatch from '../../../noMatch';
import { addTeamProjectScoreboardUnderChallenge } from '../../../../actions/api/scoreboard';

import {
  addProblem,
  addEssay,
  addPeerReview,
  browseTasksUnderChallenge,
  peerReviewFetchChallenges,
} from '../../../../actions/myClass/challenge';

import { fetchTeams } from '../../../../actions/myClass/team';

const useStyles = makeStyles((theme) => ({
  selectedIcon: {
    marginRight: '20px',
  },
  divider: {
    height: '1px',
    marginBottom: '10px',
    border: `0.5px solid ${theme.palette.grey[300]}`,
    backgroundColor: theme.palette.grey[300],
  },
  peerReviewCard_display: {
    display: 'block',
  },
  peerReviewCard_hide: {
    display: 'none',
  },
  peerBottomText: {
    marginLeft: '10px',
    marginTop: '18px',
  },
  reminder: {
    color: theme.palette.grey.A700,
  },
  instructions: {
    marginBottom: theme.spacing(2),
    marginTop: theme.spacing(2),
  },
}));

/* This is a level 4 component (page component) */
export default function TaskAddingCard({ open, setOpen }) {
  const { courseId, classId, challengeId } = useParams();
  const classNames = useStyles();
  const history = useHistory();
  const dispatch = useDispatch();

  const classes = useSelector((state) => state.classes.byId);
  const courses = useSelector((state) => state.courses.byId);
  const challenges = useSelector((state) => state.challenges);
  const teams = useSelector((state) => state.teams);
  const authToken = useSelector((state) => state.auth.token);
  const problems = useSelector((state) => state.problem);
  const error = useSelector((state) => state.error);
  const loading = useSelector((state) => state.loading.myClass.problem);
  const commonLoading = useSelector((state) => state.loading.common);
  const scoreboardsLoading = useSelector((state) => state.loading.api.scoreboard);

  const [type, setType] = useState('Coding Problem');
  const [label, setLabel] = useState('');
  const [title, setTitle] = useState('');
  const [disabled, setDisabled] = useState(true);
  const [peerReviewChallengeId, setPeerReviewChallengeId] = useState('');
  const [peerReviewChallengeIds, setPeerReviewChallengeIds] = useState([]);
  const [taskLabelId, setTaskLabelId] = useState('');
  const [maxScore, setMaxScore] = useState(3);
  const [minScore, setMinScore] = useState(1);
  const [peerNumber, setPeerNumber] = useState(2);
  const [showAddProblemErrorSnackbar, setShowAddProblemErrorSnackbar] = useState(false);
  const [showAddEssayErrorSnackbar, setShowAddEssayErrorSnackbar] = useState(false);
  const [showAddPeerReviewErrorSnackbar, setShowAddPeerReviewErrorSnackbar] = useState(false);
  const [showAddScoreboardErrorSnackbar, setShowAddScoreboardErrorSnackbar] = useState(false);
  const [scoreboardType, setScoreboardType] = useState('TEAM_PROJECT');
  const [targetProblems, setTargetProblems] = useState([]);
  const [scoringFormula, setScoringFormula] = useState('');
  const [baselineTeam, setBaselineTeam] = useState(null);
  const [teamLabelFilter, setTeamLabelFilter] = useState('');

  useEffect(() => {
    if (
      !loading.addProblem
      && !loading.addEssay
      && !loading.addPeerReview
      && !scoreboardsLoading.addTeamProjectScoreboardUnderChallenge
    ) {
      dispatch(browseTasksUnderChallenge(authToken, challengeId));
    }
  }, [
    authToken,
    challengeId,
    dispatch,
    loading.addEssay,
    loading.addPeerReview,
    loading.addProblem,
    scoreboardsLoading.addTeamProjectScoreboardUnderChallenge,
  ]);

  useEffect(() => {
    dispatch(fetchTeams(authToken, classId, ''));
  }, [authToken, classId, dispatch]);

  useEffect(() => {
    if (type === 'Coding Problem' || type === 'Essay(PDF)') {
      if (label !== '' && title !== '') {
        setDisabled(false);
      } else {
        setDisabled(true);
      }
    } else if (type === 'Peer Review') {
      if (
        label !== ''
        && title !== ''
        && peerReviewChallengeId !== ''
        && taskLabelId !== ''
        && maxScore !== ''
        && minScore !== ''
        && peerNumber !== ''
      ) {
        if (
          Number(maxScore) <= Number(minScore)
          || Number(maxScore) < 0
          || Number(minScore) < 0
          || Number(peerNumber) < 0
        ) {
          setDisabled(true);
        } else {
          setDisabled(false);
        }
      } else {
        setDisabled(true);
      }
    } else if (type === 'Scoreboard') {
      if (label !== '' && title !== '' && targetProblems.length !== 0 && scoringFormula !== '') {
        setDisabled(false);
      } else setDisabled(true);
    }
  }, [
    baselineTeam,
    label,
    maxScore,
    minScore,
    peerNumber,
    peerReviewChallengeId,
    scoringFormula,
    targetProblems,
    taskLabelId,
    teamLabelFilter,
    title,
    type,
  ]);

  useEffect(() => {
    dispatch(peerReviewFetchChallenges(authToken, classId));
  }, [authToken, classId, dispatch]);

  useEffect(() => {
    const temp = challenges.allIds.filter((id) => challenges.byId[id].class_id === Number(classId));
    setPeerReviewChallengeIds(temp);
  }, [challenges.allIds, challenges.byId, classId]);

  useEffect(() => {
    if (peerReviewChallengeId !== undefined && peerReviewChallengeId !== '') {
      dispatch(browseTasksUnderChallenge(authToken, peerReviewChallengeId));
    }
  }, [authToken, dispatch, peerReviewChallengeId]);

  const transLabelToId = (labels) => {
    const ids = labels.map(
      (key) => challenges.byId[challengeId].problemIds.filter((id) => problems.byId[id].challenge_label === key)[0],
    );
    return ids;
  };

  const addScoreboardSuccess = (scoreboardId) => {
    history.push(`/my-class/${courseId}/${classId}/challenge/${challengeId}/scoreboard/${scoreboardId}`);
  };

  const handleCreate = () => {
    switch (type) {
      case 'Coding Problem': {
        dispatch(
          addProblem(authToken, challengeId, label, title, history, courseId, classId, () => {
            setShowAddProblemErrorSnackbar(true);
          }),
        );
        break;
      }
      case 'Essay(PDF)': {
        dispatch(
          addEssay(authToken, challengeId, label, title, history, courseId, classId, () => {
            setShowAddEssayErrorSnackbar(true);
          }),
        );
        break;
      }
      case 'Peer Review': {
        dispatch(
          addPeerReview(
            authToken,
            challengeId,
            label,
            title,
            taskLabelId,
            minScore,
            maxScore,
            peerNumber,
            history,
            courseId,
            classId,
            () => {
              setShowAddPeerReviewErrorSnackbar(true);
            },
          ),
        );
        setPeerReviewChallengeId('');
        setPeerReviewChallengeIds([]);
        setTaskLabelId('');
        break;
      }
      case 'Scoreboard': {
        const targetProblemIds = transLabelToId(targetProblems);
        const body = {
          challenge_label: label,
          title,
          target_problem_ids: targetProblemIds,
          scoring_formula: scoringFormula,
          baseline_team_id: baselineTeam === '' ? null : baselineTeam,
          rank_by_total_score: true,
          team_label_filter: teamLabelFilter,
        };
        dispatch(
          addTeamProjectScoreboardUnderChallenge(authToken, challengeId, body, addScoreboardSuccess, () => {
            setShowAddScoreboardErrorSnackbar(true);
          }),
        );
        setScoreboardType('TEAM_PROJECT');
        setTargetProblems([]);
        setScoringFormula('');
        setBaselineTeam(null);
        setTeamLabelFilter('');
        break;
      }
      default: {
        break;
      }
    }
    setType('Coding Problem');
    setTitle('');
    setLabel('');
    setDisabled(true);
    setOpen(false);
  };

  const handleCancel = () => {
    setType('Coding Problem');
    setTitle('');
    setLabel('');
    setDisabled(true);
    setOpen(false);

    setScoreboardType('TEAM_PROJECT');
    setTargetProblems([]);
    setScoringFormula('');
    setBaselineTeam(null);
    setTeamLabelFilter('');
  };

  if (loading.readChallenge || commonLoading.fetchCourse || commonLoading.fetchClass) {
    return <></>;
  }

  if (classes[classId] === undefined || courses[courseId] === undefined || challenges.byId[challengeId] === undefined) {
    return <NoMatch />;
  }

  return (
    <>
      <Dialog open={open} onClose={() => setOpen(false)} maxWidth="md">
        <DialogTitle>
          <Typography variant="h4">Create New Task</Typography>
        </DialogTitle>
        <DialogContent>
          <AlignedText text="Class" childrenType="text">
            <Typography>{`${courses[courseId].name} ${classes[classId].name}`}</Typography>
          </AlignedText>
          <AlignedText text="Challenge" childrenType="text">
            <Typography>{`${challenges.byId[challengeId].title}`}</Typography>
          </AlignedText>
          <AlignedText text="Type" childrenType="field">
            <FormControl variant="outlined">
              <Select
                labelId="sort"
                id="sort"
                value={type}
                onChange={(e) => {
                  setType(e.target.value);
                }}
                style={{ width: '350px' }}
              >
                <MenuItem value="Coding Problem">
                  <Icon.Code className={classNames.selectedIcon} />
                  Coding Problem
                </MenuItem>
                <MenuItem value="Essay(PDF)">
                  <Icon.Paper className={classNames.selectedIcon} />
                  Essay (PDF)
                </MenuItem>
                <MenuItem value="Peer Review">
                  <Icon.Peerreview className={classNames.selectedIcon} />
                  Peer Review
                </MenuItem>
                <MenuItem value="Scoreboard">
                  <Icon.Scoreboard className={classNames.selectedIcon} />
                  Scoreboard
                </MenuItem>
              </Select>
            </FormControl>
          </AlignedText>
          {type === 'Scoreboard' && (
            <AlignedText text="Scoreboard Type" childrenType="field">
              <FormControl variant="outlined">
                <Select
                  labelId="sort"
                  id="sort"
                  value={scoreboardType}
                  onChange={(e) => {
                    setScoreboardType(e.target.value);
                  }}
                  style={{ width: '350px' }}
                >
                  <MenuItem value="TEAM_PROJECT">Team Project</MenuItem>
                  {/* <MenuItem value="TEAM_CONTEST">Contest</MenuItem> */}
                </Select>
              </FormControl>
            </AlignedText>
          )}
          <AlignedText text="Label" childrenType="field">
            <TextField
              id="label"
              value={label}
              onChange={(e) => {
                setLabel(e.target.value);
              }}
            />
          </AlignedText>
          <AlignedText text="Title" childrenType="field">
            <TextField
              id="title"
              value={title}
              onChange={(e) => {
                setTitle(e.target.value);
              }}
            />
          </AlignedText>
          <div className={type === 'Peer Review' ? classNames.peerReviewCard_display : classNames.peerReviewCard_hide}>
            <hr className={classNames.divider} />
            <Typography variant="h4">Peer Review Task</Typography>
            <AlignedText text="Challenge" childrenType="field">
              <FormControl variant="outlined">
                <Select
                  labelId="sort"
                  id="sort"
                  value={peerReviewChallengeId}
                  onChange={(e) => {
                    setPeerReviewChallengeId(e.target.value);
                    setTaskLabelId('');
                  }}
                  style={{ width: '350px' }}
                >
                  {peerReviewChallengeIds.map((id) => (
                    <MenuItem key={id} value={id}>
                      {challenges.byId[id].title}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </AlignedText>
            <AlignedText text="Task Label" childrenType="field">
              <FormControl variant="outlined">
                <Select
                  labelId="sort"
                  id="sort"
                  value={taskLabelId}
                  onChange={(e) => {
                    setTaskLabelId(e.target.value);
                  }}
                  style={{ width: '350px' }}
                >
                  {peerReviewChallengeId !== undefined
                    && peerReviewChallengeId !== ''
                    && challenges.byId[peerReviewChallengeId].problemIds.map((id) => (
                      <MenuItem key={id} value={id}>
                        {problems.byId[id].challenge_label}
                      </MenuItem>
                    ))}
                </Select>
              </FormControl>
            </AlignedText>
            <AlignedText text="Max Score" childrenType="field">
              <TextField
                id="maxScore"
                value={maxScore}
                style={{ width: '150px' }}
                onChange={(e) => {
                  setMaxScore(e.target.value);
                }}
              />
            </AlignedText>
            <AlignedText text="Min Score" childrenType="field">
              <TextField
                id="minScore"
                value={minScore}
                style={{ width: '150px' }}
                onChange={(e) => {
                  setMinScore(e.target.value);
                }}
              />
            </AlignedText>
            <AlignedText text="Student is Assigned" childrenType="field">
              <TextField
                id="peerNumbers"
                value={peerNumber}
                style={{ width: '150px' }}
                onChange={(e) => {
                  setPeerNumber(e.target.value);
                }}
              />
              <Typography className={classNames.peerBottomText}>Peers Respectively</Typography>
            </AlignedText>
          </div>
          {type === 'Scoreboard' && (
            <div>
              <hr className={classNames.divider} />
              <Typography variant="h4">Scoreboard</Typography>
              <AlignedText text="Target Problems" childrenType="field">
                <MultiSelect
                  options={challenges.byId[challengeId].problemIds
                    .map((id) => problems.byId[id])
                    .sort((a, b) => a.challenge_label.localeCompare(b.challenge_label))
                    .map(({ challenge_label }) => challenge_label)}
                  value={targetProblems}
                  setValue={setTargetProblems}
                />
              </AlignedText>
              <hr className={classNames.divider} />
              <AlignedText text="Scoring Formula" childrenType="field">
                <TextField
                  value={scoringFormula}
                  onChange={(e) => {
                    setScoringFormula(e.target.value);
                  }}
                />
              </AlignedText>
              <div className={classNames.instructions}>
                <Typography variant="body2">A self-defined pattern; content format/specs</Typography>
                <Typography variant="body2" className={classNames.reminder}>
                  e.g. 3 * (baseline - team_score) / (class_max - class_min)
                </Typography>
              </div>
              <hr className={classNames.divider} />
              <AlignedText text="Baseline Team (Optional)" childrenType="field">
                <FormControl variant="outlined" style={{ width: '350px' }}>
                  <Select value={baselineTeam} label="BaselineTeam" onChange={(e) => setBaselineTeam(e.target.value)}>
                    {classes[classId].teamIds.map((id) => (
                      <MenuItem key={id} value={id}>
                        {teams.byId[id].name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </AlignedText>
              <hr className={classNames.divider} />
              <AlignedText text="Team Label Filter (Optional)" childrenType="field">
                <TextField
                  value={teamLabelFilter}
                  onChange={(e) => {
                    setTeamLabelFilter(e.target.value);
                  }}
                />
              </AlignedText>
              <div className={classNames.instructions}>
                <Typography variant="body2">To filter teams with label, support regex</Typography>
              </div>
            </div>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCancel}>Cancel</Button>
          <Button disabled={disabled} color="primary" onClick={handleCreate}>
            Create
          </Button>
        </DialogActions>
      </Dialog>
      <Snackbar
        open={showAddProblemErrorSnackbar}
        message={`Error: ${error.myClass.challenge.addProblem}`}
        onClose={() => setShowAddProblemErrorSnackbar(false)}
      />
      <Snackbar
        open={showAddEssayErrorSnackbar}
        message={`Error: ${error.myClass.challenge.addEssay}`}
        onClose={() => setShowAddEssayErrorSnackbar(false)}
      />
      <Snackbar
        open={showAddPeerReviewErrorSnackbar}
        message={`Error: ${error.myClass.challenge.addPeerReview}. Check whether the input numbers are valid.`}
        onClose={() => setShowAddPeerReviewErrorSnackbar(false)}
      />
      <Snackbar
        open={showAddScoreboardErrorSnackbar}
        message={`Error: ${error.api.scoreboard.addTeamProjectScoreboardUnderChallenge}`}
        onClose={() => setShowAddScoreboardErrorSnackbar(false)}
      />
    </>
  );
}
