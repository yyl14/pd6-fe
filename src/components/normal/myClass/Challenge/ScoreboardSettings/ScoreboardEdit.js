import {
  Typography, Button, makeStyles, TextField, FormControl, Select, MenuItem,
} from '@material-ui/core';
import React, { useState } from 'react';
import AlignedText from '../../../../ui/AlignedText';
import SimpleBar from '../../../../ui/SimpleBar';
import MultiSelect from '../../../../ui/MultiSelect';

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

const problems = ['Q1', 'Q2'];

export default function ScoreboardEdit({ setEdit }) {
  const classNames = useStyles();
  const [target, setTarget] = useState([]);
  const [scoringFormula, setScoringFormula] = useState('');
  const [baselineTeam, setBaselineTeam] = useState('');
  const [teamLabelFilter, setTeamLabelFilter] = useState('');

  const handleCancel = () => {
    setEdit(false);
  };

  const handleSave = () => {
    // const body = {
    //   target_problem_ids: target,
    //   scoring_formula: scoringFormula,
    //   baseline_team_id: baselineTeam,
    //   team_label_filter: teamLabelFilter,
    // };
    setEdit(false);
  };

  return (
    <SimpleBar title="Ranking Configuration">
      <AlignedText text="Scoreboard Type" childrenType="text">
        <Typography variant="body1">Team Project</Typography>
      </AlignedText>
      <AlignedText text="Title" childrenType="text">
        <Typography variant="body1">Scoreboard</Typography>
      </AlignedText>
      <AlignedText text="Target Problems" childrenType="field">
        <MultiSelect options={problems} value={target} setValue={setTarget} />
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
            <MenuItem value="Team id 1">Team name 1</MenuItem>
            <MenuItem value="Team id 2">Team name 2</MenuItem>
            <MenuItem value="Team id 3">Team name 3</MenuItem>
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
