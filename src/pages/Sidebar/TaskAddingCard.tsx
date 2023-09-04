import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  MenuItem,
  Select,
  Snackbar,
  TextField,
  Typography,
  makeStyles,
} from '@material-ui/core';
import { useCallback, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';

import AlignedText from '@/components/AlignedText';
import GeneralLoading from '@/components/GeneralLoading';
import MultiSelect from '@/components/MultiSelect';
import Icon from '@/components/icon/index';
import useChallenge from '@/lib/challenge/useChallenge';
import useChallengesUnderClass from '@/lib/challenge/useChallengesUnderClass';
import useClass from '@/lib/class/useClass';
import useCourse from '@/lib/course/useCourse';
import useChallengeEssay from '@/lib/essay/useChallengeEssay';
import useChallengePeerReview from '@/lib/peerReview/useChallengePeerReview';
import useChallengeProblem from '@/lib/problem/useChallengeProblem';
import useChallengeTasks from '@/lib/task/useChallengeTasks';
import useClassTeams from '@/lib/team/useClassTeams';
import useChallengeTeamProjectScoreboard from '@/lib/teamProjectScoreboard/useChallengeTeamProjectScoreboard';

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

interface Props {
  courseId: number;
  classId: number;
  challengeId: number;
  open: boolean;
  setOpen: (open: boolean) => void;
}

export default function TaskAddingCard({ courseId, classId, challengeId, open, setOpen }: Props) {
  const classNames = useStyles();
  const history = useHistory();

  const { course, isLoading: courseIsLoading } = useCourse(courseId);
  const { class: classData, isLoading: classIsLoading } = useClass(classId);
  const { challenge, isLoading: challengeIsLoading } = useChallenge(challengeId);
  const { tasks } = useChallengeTasks(challengeId);
  const { browseTeamUnderClass } = useClassTeams(classId);
  const { browseChallengeUnderClass } = useChallengesUnderClass(classId);

  const [peerReviewChallengeId, setPeerReviewChallengeId] = useState<number>(challengeId);
  const { tasks: peerReviewTasks, mutateTask } = useChallengeTasks(peerReviewChallengeId);

  const { addProblem, error: addProblemError } = useChallengeProblem(challengeId);
  const { addEssay, error: addEssayError } = useChallengeEssay(challengeId);
  const { addPeerReview, error: addPeerReviewError } = useChallengePeerReview(challengeId);
  const { addTeamProjectScoreboard, error: addTeamProjectScoreboardError } =
    useChallengeTeamProjectScoreboard(challengeId);

  const [type, setType] = useState('Coding Problem');
  const [label, setLabel] = useState('');
  const [title, setTitle] = useState('');
  const [disabled, setDisabled] = useState(true);
  const [taskLabelId, setTaskLabelId] = useState('');
  const [maxScore, setMaxScore] = useState<string>('3');
  const [minScore, setMinScore] = useState<string>('1');
  const [peerNumber, setPeerNumber] = useState<string>('2');
  const [showAddProblemErrorSnackbar, setShowAddProblemErrorSnackbar] = useState(false);
  const [showAddEssayErrorSnackbar, setShowAddEssayErrorSnackbar] = useState(false);
  const [showAddPeerReviewErrorSnackbar, setShowAddPeerReviewErrorSnackbar] = useState(false);
  const [showAddScoreboardErrorSnackbar, setShowAddScoreboardErrorSnackbar] = useState(false);
  const [scoreboardType, setScoreboardType] = useState('TEAM_PROJECT');
  const [targetProblems, setTargetProblems] = useState([]);
  const [scoringFormula, setScoringFormula] = useState('');
  const [baselineTeam, setBaselineTeam] = useState<number | null>(null);
  const [teamLabelFilter, setTeamLabelFilter] = useState('');
  const [showErrorSnackbar, setShowErrorSnackbar] = useState(false);
  const [snackbarErrorMessage, setSnackbarErrorMessage] = useState('');

  const validateInput = useCallback((maxTemp: string, minTemp: string, peerNumberTemp: string) => {
    // string
    if (
      Number.isNaN(Number(maxTemp)) === true ||
      Number.isNaN(Number(minTemp)) === true ||
      Number.isNaN(Number(peerNumberTemp)) === true
    ) {
      return 'Error: Max/Min/Assignee is NOT a Number.';
    }

    // float
    if (
      Number.isInteger(Number(maxTemp)) === false ||
      Number.isInteger(Number(minTemp)) === false ||
      Number.isInteger(Number(peerNumberTemp)) === false
    ) {
      return 'Error: Max/Min/Assignee is a Float number.';
    }

    // negative
    if (Number(maxTemp) < 0 || Number(minTemp) < 0 || Number(peerNumberTemp) < 0) {
      return 'Error: Max/Min/Assignee is a Negative number.';
    }

    // max score or peer number = 0
    if (Number(maxTemp) === 0 || Number(peerNumberTemp) === 0) {
      return "Error: Max Score/Assignee can't be 0.";
    }

    // max score <= min score
    if (Number(maxTemp) <= Number(minTemp)) {
      return 'Error: Max Score <= Min Score.';
    }

    return null;
  }, []);

  useEffect(() => {
    if (type === 'Coding Problem' || type === 'Essay(PDF)') {
      if (label !== '' && title !== '') {
        setDisabled(false);
      } else {
        setDisabled(true);
      }
    } else if (type === 'Peer Review') {
      if (
        label !== '' &&
        title !== '' &&
        taskLabelId !== '' &&
        maxScore !== '' &&
        minScore !== '' &&
        peerNumber !== ''
      ) {
        const errorMessage = validateInput(maxScore, minScore, peerNumber);
        if (!errorMessage) {
          // input is correct.
          setShowErrorSnackbar(false);
          setSnackbarErrorMessage('');
          setDisabled(false);
        } else {
          // input is wrong.
          setShowErrorSnackbar(true);
          setSnackbarErrorMessage(errorMessage);
          setDisabled(true);
        }
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
    validateInput,
  ]);

  const transLabelToId = (labels: string[]) => {
    const ids = labels.map((key) => tasks?.problem.filter((item) => item.challenge_label === key)[0]);
    return ids.filter((item) => item !== undefined).map((item) => item?.id) as number[];
  };

  const handleCreate = async () => {
    switch (type) {
      case 'Coding Problem': {
        try {
          const { data } = await addProblem({
            challenge_id: Number(challengeId),
            challenge_label: label,
            title,
          });
          mutateTask();
          history.push(`/my-class/${courseId}/${classId}/challenge/${challengeId}/problem/${data.data.id}`);
        } catch {
          setShowAddProblemErrorSnackbar(true);
        }
        break;
      }
      case 'Essay(PDF)': {
        try {
          const { data } = await addEssay({
            challenge_id: Number(challengeId),
            challenge_label: label,
            title,
          });
          mutateTask();
          history.push(`/my-class/${courseId}/${classId}/challenge/${challengeId}/essay/${data.data.id}`);
        } catch {
          setShowAddEssayErrorSnackbar(true);
        }
        break;
      }
      case 'Peer Review': {
        try {
          const { data } = await addPeerReview({
            challenge_id: Number(challengeId),
            challenge_label: label,
            title,
            target_problem_id: Number(taskLabelId),
            max_score: Number(maxScore),
            min_score: Number(minScore),
            max_review_count: Number(peerNumber),
            description: '',
          });
          setPeerReviewChallengeId(Number(challengeId));
          setTaskLabelId('');
          mutateTask();
          history.push(`/my-class/${courseId}/${classId}/challenge/${challengeId}/peer-review/${data.data.id}`);
        } catch {
          setShowAddPeerReviewErrorSnackbar(true);
        }
        break;
      }
      case 'Scoreboard': {
        const targetProblemIds = transLabelToId(targetProblems);
        try {
          const { data } = await addTeamProjectScoreboard({
            challenge_id: Number(challengeId),
            challenge_label: label,
            title,
            target_problem_ids: targetProblemIds,
            scoring_formula: scoringFormula,
            baseline_team_id: baselineTeam || undefined,
            rank_by_total_score: true,
            team_label_filter: teamLabelFilter,
          });
          setScoreboardType('TEAM_PROJECT');
          setTargetProblems([]);
          setScoringFormula('');
          setBaselineTeam(null);
          setTeamLabelFilter('');
          mutateTask();
          history.push(`/my-class/${courseId}/${classId}/challenge/${challengeId}/scoreboard/${data.data.id}`);
        } catch {
          setShowAddScoreboardErrorSnackbar(true);
        }
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

  if (courseIsLoading.read || classIsLoading.read || challengeIsLoading.read) {
    return <GeneralLoading />;
  }

  return (
    <>
      <Dialog open={open} onClose={() => setOpen(false)} maxWidth="md">
        <DialogTitle>
          <Typography variant="h4">Create New Task</Typography>
        </DialogTitle>
        <DialogContent>
          <AlignedText text="Class" childrenType="text">
            <Typography>{`${course?.name} ${classData?.name}`}</Typography>
          </AlignedText>
          <AlignedText text="Challenge" childrenType="text">
            <Typography>{`${challenge?.title}`}</Typography>
          </AlignedText>
          <AlignedText text="Type" childrenType="field">
            <FormControl variant="outlined">
              <Select
                labelId="sort"
                id="sort"
                value={type}
                onChange={(e) => {
                  setType(String(e.target.value));
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
                    setScoreboardType(String(e.target.value));
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
                    setPeerReviewChallengeId(Number(e.target.value));
                    setTaskLabelId('');
                  }}
                  style={{ width: '350px' }}
                >
                  {browseChallengeUnderClass.data?.data.map((item) => (
                    <MenuItem key={item.id} value={item.id}>
                      {item.title}
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
                    setTaskLabelId(String(e.target.value));
                  }}
                  style={{ width: '350px' }}
                >
                  {peerReviewTasks?.problem.map((item) => (
                    <MenuItem key={item.id} value={item.id}>
                      {item.challenge_label}
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
                  options={tasks?.problem
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
                  <Select
                    value={baselineTeam}
                    label="BaselineTeam"
                    onChange={(e) => setBaselineTeam(Number(e.target.value))}
                  >
                    {browseTeamUnderClass.data?.data.map((item) => (
                      <MenuItem key={item.id} value={item.id}>
                        {item.name}
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
        message={`Error: ${addProblemError.add?.message}`}
        onClose={() => setShowAddProblemErrorSnackbar(false)}
      />
      <Snackbar
        open={showAddEssayErrorSnackbar}
        message={`Error: ${addEssayError.add?.message}`}
        onClose={() => setShowAddEssayErrorSnackbar(false)}
      />
      <Snackbar
        open={showAddPeerReviewErrorSnackbar}
        message={`Error: ${addPeerReviewError.add?.message}. Check whether the input numbers are valid.`}
        onClose={() => setShowAddPeerReviewErrorSnackbar(false)}
      />
      <Snackbar
        open={showAddScoreboardErrorSnackbar}
        message={`Error: ${addTeamProjectScoreboardError.add?.message}`}
        onClose={() => setShowAddScoreboardErrorSnackbar(false)}
      />
      <Snackbar open={showErrorSnackbar} message={snackbarErrorMessage} onClose={() => setShowErrorSnackbar(false)} />
    </>
  );
}
