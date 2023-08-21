import { Button, FormControl, MenuItem, Select, TextField, Typography, makeStyles } from '@material-ui/core';
import { useState } from 'react';

import AlignedText from '@/components/ui/AlignedText';
import MultiSelect from '@/components/ui/MultiSelect';
import SimpleBar from '@/components/ui/SimpleBar';
import useScoreboard from '@/lib/scoreboard/useScoreboard';
import useChallengeTasks from '@/lib/task/useChallengeTasks';
import useTeamProjectScoreboard from '@/lib/teamProjectScoreboard/useTeamProjectScoreboard';
import useViewTeamProjectScoreboard from '@/lib/view/useViewTeamProjectScoreboard';

const useStyles = makeStyles((theme) => ({
  buttons: {
    marginTop: '6px',
    marginLeft: '-5px',
  },
  divider: {
    width: 400,
    height: 1,
    border: '0px',
    marginBottom: 5,
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

export default function ScoreboardEdit({
  challengeId,
  scoreboardId,
  getScoreboardType,
  setEdit,
  setShowSnackbar,
}: {
  challengeId: string;
  scoreboardId: string;
  getScoreboardType: (scoreboardType: string | undefined) => string;
  setEdit: React.Dispatch<React.SetStateAction<boolean>>;
  setShowSnackbar: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const classNames = useStyles();
  const { scoreboard, mutateScoreboard } = useScoreboard(Number(scoreboardId));
  const { teamProjectScoreboard } = useViewTeamProjectScoreboard(Number(scoreboardId));
  const { editTeamProjectScoreboard } = useTeamProjectScoreboard(Number(scoreboardId));
  const { tasks } = useChallengeTasks(Number(challengeId));

  const [targetLabels, setTargetLabels] = useState(
    scoreboard?.target_problem_ids.map((id) => tasks?.problem.find((problem) => problem.id === id)?.challenge_label),
  );
  const [scoringFormula, setScoringFormula] = useState(scoreboard?.data.scoring_formula ?? 'error');
  const [baselineTeam, setBaselineTeam] = useState(scoreboard?.data.baseline_team_id ?? '');
  const [teamLabelFilter, setTeamLabelFilter] = useState(scoreboard?.data.team_label_filter ?? 'error');

  const handleSave = async () => {
    try {
      const targetIds = targetLabels?.map(
        (label) => tasks?.problem.find((problem) => problem.challenge_label === label)?.id,
      ) as number[];
      await editTeamProjectScoreboard({
        scoreboard_id: Number(scoreboardId),
        challenge_label: scoreboard?.challenge_label,
        target_problem_ids: targetIds,
        scoring_formula: scoringFormula,
        baseline_team_id: baselineTeam ? Number(baselineTeam) : undefined,
        rank_by_total_score: true,
        team_label_filter: teamLabelFilter,
      });
      await mutateScoreboard();
      setEdit(false);
    } catch {
      // the version 6 lacks error handling
      setShowSnackbar(true);
    }
  };

  return (
    <SimpleBar title="Ranking Configuration">
      <AlignedText maxWidth="lg" text="Scoreboard Type" childrenType="text">
        <Typography variant="body1">{getScoreboardType(scoreboard?.type)}</Typography>
      </AlignedText>
      <AlignedText maxWidth="lg" text="Title" childrenType="text">
        <Typography variant="body1">{scoreboard?.title}</Typography>
      </AlignedText>
      <AlignedText maxWidth="lg" text="Target Problems" childrenType="field">
        <MultiSelect
          options={tasks?.problem.map((problem) => problem.challenge_label).sort((a, b) => a.localeCompare(b))}
          value={targetLabels}
          setValue={setTargetLabels}
        />
      </AlignedText>
      <div className={classNames.divider} />
      <AlignedText maxWidth="lg" text="Scoring Formula" childrenType="field">
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
      <div className={classNames.divider} />
      <AlignedText maxWidth="lg" text="Baseline Team (Optional)" childrenType="field">
        <FormControl variant="outlined" style={{ width: '350px' }}>
          <Select value={baselineTeam} label="BaselineTeam" onChange={(e) => setBaselineTeam(e.target.value as number)}>
            <MenuItem value=""> </MenuItem>
            {teamProjectScoreboard?.map(({ team_name, team_id }) => (
              <MenuItem key={team_id} value={team_id}>
                {team_name}
              </MenuItem>
            ))}
            {/* the origin is
             {classes.byId[classId].teamIds.map((id) => (
              <MenuItem key={id} value={id}>
                {teams.byId[id].name}
              </MenuItem>
            ))} */}
          </Select>
        </FormControl>
      </AlignedText>
      <div className={classNames.divider} />
      <AlignedText maxWidth="lg" text="Team Label Filter (Optional)" childrenType="field">
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
        <Button onClick={() => setEdit(false)}>Cancel</Button>
        <Button color="primary" type="submit" onClick={handleSave}>
          Save
        </Button>
      </div>
    </SimpleBar>
  );
}
