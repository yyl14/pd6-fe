import {
  Typography, Button, makeStyles, FormControl, Select, MenuItem, TextField,
} from '@material-ui/core';
import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import AlignedText from '../../../../ui/AlignedText';
import SimpleBar from '../../../../ui/SimpleBar';
import MultiSelect from '../../../../ui/MultiSelect';
import { editTeamProjectScoreboard } from '../../../../../actions/api/scoreboard';

const useStyles = makeStyles((theme) => ({
  buttons: {
    marginTop: '6px',
    marginLeft: '-5px',
  },
  divider: {
    width: '540px',
    border: `0.5px solid ${theme.palette.grey[300]}`,
    backgroundColor: theme.palette.grey[300],
  },
  reminder: {
    color: theme.palette.grey.A700,
  },
  instructions: {
    marginBottom: theme.spacing(2),
    marginTop: theme.spacing(2),
  },
}));

export default function ScoreboardEdit({ setEdit }) {
  const {
    courseId, classId, challengeId, scoreboardId,
  } = useParams();
  const dispatch = useDispatch();
  const classNames = useStyles();

  // const scoreboards = useSelector((state) => state.scoreboards);
  const challenges = useSelector((state) => state.challenges);
  const authToken = useSelector((state) => state.auth.token);
  const problems = useSelector((state) => state.problem);
  const classes = useSelector((state) => state.classes);
  const teams = useSelector((state) => state.teams);
  const scoreboards = useSelector((state) => state.scoreboards);
  const [targetLabels, setTargetLabels] = useState([]);
  const [scoringFormula, setScoringFormula] = useState(
    scoreboards.byId[scoreboardId] === undefined ? 'error' : scoreboards.byId[scoreboardId].data.scoring_formula,
  );
  // const [baselineTeam, setBaselineTeam] = useState(46);
  const [baselineTeam, setBaselineTeam] = useState(
    scoreboards.byId[scoreboardId] === undefined ? 'error' : scoreboards.byId[scoreboardId].data.baseline_team_id,
  );
  const [teamLabelFilter, setTeamLabelFilter] = useState(
    scoreboards.byId[scoreboardId] === undefined ? 'error' : scoreboards.byId[scoreboardId].data.team_label_filter,
  );

  useEffect(() => {
    if (scoreboards.byId[scoreboardId] && problems.byId) {
      setTargetLabels(scoreboards.byId[scoreboardId].target_problem_ids.map((id) => problems.byId[id].challenge_label));
    }
  }, [problems.byId, scoreboardId, scoreboards.byId]);

  const transIdToLabel = (ids) => ids.map((id) => problems.byId[id].challenge_label);
  const transLabelToId = (labels) => {
    const ids = labels.map(
      (key) => challenges.byId[challengeId].problemIds.filter((id) => problems.byId[id].challenge_label === key)[0],
    );
    return ids;
  };

  const handleCancel = () => {
    setEdit(false);
  };

  const handleSave = () => {
    const targetIds = transLabelToId(targetLabels);
    const body = {
      challenge_label: scoreboards.byId[scoreboardId].challenge_label,
      title: scoreboards.byId[scoreboardId].title,
      target_problem_ids: targetIds,
      scoring_formula: scoringFormula,
      baseline_team_id: baselineTeam,
      rank_by_total_score: true,
      team_label_filter: teamLabelFilter,
    };
    dispatch(editTeamProjectScoreboard(authToken, scoreboardId, body));
    setEdit(false);
  };

  return (
    <SimpleBar title="Ranking Configuration">
      <AlignedText text="Scoreboard Type" childrenType="text">
        <Typography variant="body1">
          {scoreboards.byId[scoreboardId].type === 'TEAM_PROJECT' ? 'Team Project' : 'Contest'}
        </Typography>
      </AlignedText>
      <AlignedText text="Title" childrenType="text">
        <Typography variant="body1">{scoreboards.byId[scoreboardId].title}</Typography>
      </AlignedText>
      <AlignedText text="Target Problems" childrenType="field">
        <MultiSelect
          options={transIdToLabel(challenges.byId[challengeId].problemIds)}
          value={targetLabels}
          setValue={setTargetLabels}
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
          e.g.1.5 + 1.5 * (team_score - class_worst) / (class_best - class_worst)
        </Typography>
      </div>
      <hr className={classNames.divider} />
      <AlignedText text="Baseline Team (Optional)" childrenType="field">
        <FormControl variant="outlined" style={{ width: '350px' }}>
          <Select value={baselineTeam} label="BaselineTeam" onChange={(e) => setBaselineTeam(e.target.value)}>
            <MenuItem value=""> </MenuItem>
            {classes.byId[classId].teamIds.map((id) => (
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
      <div className={classNames.buttons}>
        <Button onClick={handleCancel}>Cancel</Button>
        <Button color="primary" type="submit" onClick={handleSave}>
          Save
        </Button>
      </div>
    </SimpleBar>
  );
}
