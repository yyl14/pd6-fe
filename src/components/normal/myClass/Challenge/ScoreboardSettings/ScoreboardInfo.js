import React, { useState, useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import {
  Typography, Button, Snackbar, Dialog, DialogTitle, DialogContent, DialogActions,
} from '@material-ui/core';
import { useSelector, useDispatch } from 'react-redux';
import AlignedText from '../../../../ui/AlignedText';
import SimpleBar from '../../../../ui/SimpleBar';
import SimpleTable from '../../../../ui/SimpleTable';
import PageTitle from '../../../../ui/PageTitle';
import { readProblemInfo } from '../../../../../actions/myClass/problem';
import { fetchTeams } from '../../../../../actions/myClass/team';
import { readScoreboard, viewTeamProjectScoreboard, deleteScoreboard } from '../../../../../actions/api/scoreboard';
import ScoreboardEdit from './ScoreboardEdit';

const scoreboardBasicTitle = [
  {
    id: 'rank',
    label: 'Rank',
    align: 'center',
    width: 100,
    type: 'string',
  },
  {
    id: 'team_name',
    label: 'Team Name',
    minWidth: 100,
    align: 'center',
    width: 200,
    type: 'link',
    link_id: 'team_path',
  },
  {
    id: 'total_score',
    label: 'Total Score',
    minWidth: 100,
    align: 'center',
    width: 200,
    type: 'string',
  },
];

export default function ScoreboardInfo() {
  const {
    courseId, classId, challengeId, scoreboardId,
  } = useParams();
  const dispatch = useDispatch();
  const history = useHistory();
  const authToken = useSelector((state) => state.auth.token);
  const problems = useSelector((state) => state.problem.byId);
  const challenges = useSelector((state) => state.challenges);
  const scoreboards = useSelector((state) => state.scoreboards);
  const userClasses = useSelector((state) => state.user.classes);
  const courses = useSelector((state) => state.courses);
  const classes = useSelector((state) => state.classes);
  const teams = useSelector((state) => state.teams);
  const loading = useSelector((state) => state.loading.api.scoreboard);
  const error = useSelector((state) => state.error.api.scoreboard);

  const [scoreboardTitle, setScoreboardTitle] = useState(scoreboardBasicTitle);
  const [scoreboardTeams, setScoreboardTeams] = useState([]);
  const [hasReadProblem, setHasReadProblem] = useState(false);
  const [edit, setEdit] = useState(false);
  const [role, setRole] = useState('NORMAL');
  const [showSnackbar, setShowSnackbar] = useState(false);
  const [deletePopup, setDeletePopup] = useState(false);

  useEffect(() => {
    dispatch(fetchTeams(authToken, classId, ''));
  }, [authToken, classId, dispatch]);

  useEffect(() => {
    if (!loading.editTeamProjectScoreboard) {
      dispatch(readScoreboard(authToken, scoreboardId));
      dispatch(viewTeamProjectScoreboard(authToken, scoreboardId, () => setShowSnackbar(true)));
    }
  }, [authToken, dispatch, loading.editTeamProjectScoreboard, scoreboardId]);

  useEffect(() => {
    if (userClasses.filter((item) => item.class_id === Number(classId)).length !== 0) {
      setRole(userClasses.filter((item) => item.class_id === Number(classId))[0].role);
    }
  }, [classId, userClasses]);

  useEffect(() => {
    if (scoreboardTeams.length > 0 && !hasReadProblem) {
      scoreboardTeams[0].target_problem_data.map((p) => dispatch(readProblemInfo(authToken, p.problem_id)));
      setHasReadProblem(true);
    }
  }, [authToken, dispatch, hasReadProblem, scoreboardTeams]);

  useEffect(() => {
    if (scoreboards.byId[scoreboardId] === undefined) return;
    let tempTeams = [...scoreboards.byId[scoreboardId].teams];
    tempTeams.sort((a, b) => b.total_score - a.total_score);

    if (scoreboards.byId[scoreboardId].target_problem_ids) {
      const scoreColumns = scoreboards.byId[scoreboardId].target_problem_ids.map((p) => {
        const column = {
          id: `problem-${p}-score`,
          label: `${problems[p]?.challenge_label} Score`,
          minWidth: 100,
          align: 'center',
          width: 200,
          type: role === 'MANAGER' ? 'link' : 'string',
          link_id: `problem-${p}-submission`,
        };
        return column;
      });
      setScoreboardTitle([].concat(scoreboardBasicTitle, scoreColumns));
    }

    tempTeams = tempTeams.map((team, index) => {
      const tempTeam = {
        ...team,
        id: team.team_id,
        rank: index + 1,
        team_path: `/my-class/${courseId}/${classId}/team/${team.team_id}`,
      };
      for (let i = 0; i < tempTeam.target_problem_data.length; i += 1) {
        const p = tempTeam.target_problem_data[i];
        tempTeam[`problem-${p.problem_id}-score`] = p.score;
        if (p.submission_id) {
          tempTeam[
            `problem-${p.problem_id}-submission`
          ] = `/my-class/${courseId}/${classId}/submission/${p.submission_id}`;
        }
      }
      return tempTeam;
    });
    setScoreboardTeams(tempTeams);
  }, [classId, courseId, problems, role, scoreboardId, scoreboards.byId]);

  const transIdToLabel = (ids) => {
    const labels = ids.map((id) => problems[id]?.challenge_label);
    return labels.join(', ');
  };

  const clickDelete = () => {
    dispatch(deleteScoreboard(authToken, scoreboardId));
    setDeletePopup(false);
    history.push(`/my-class/${courseId}/${classId}/challenge/${challengeId}`);
  };

  return (
    <>
      <PageTitle
        text={`${challenges.byId[challengeId] === undefined ? 'error' : challenges.byId[challengeId].title} / ${
          scoreboards.byId[scoreboardId] === undefined ? 'error' : scoreboards.byId[scoreboardId].challenge_label
        }`}
      />
      {!edit ? (
        <SimpleBar
          title="Ranking Configuration"
          buttons={<>{role === 'MANAGER' && !edit && <Button onClick={() => setEdit(true)}>Edit</Button>}</>}
        >
          <AlignedText text="Scoreboard Type" childrenType="text">
            <Typography variant="body1">
              {scoreboards.byId[scoreboardId] && scoreboards.byId[scoreboardId].type === 'TEAM_PROJECT'
                ? 'Team Project'
                : 'Contest'}
            </Typography>
          </AlignedText>
          <AlignedText text="Title" childrenType="text">
            <Typography variant="body1">
              {scoreboards.byId[scoreboardId] && scoreboards.byId[scoreboardId].title}
            </Typography>
          </AlignedText>
          <AlignedText text="Target Problems" childrenType="text">
            <Typography variant="body1">
              {scoreboards.byId[scoreboardId] && transIdToLabel(scoreboards.byId[scoreboardId].target_problem_ids)}
            </Typography>
          </AlignedText>
          <AlignedText text="Scoring Formula" childrenType="text">
            <Typography variant="body1">
              {scoreboards.byId[scoreboardId] && scoreboards.byId[scoreboardId].data.scoring_formula}
            </Typography>
          </AlignedText>
          <AlignedText text="Baseline Team" childrenType="text">
            {scoreboards.byId[scoreboardId] && teams.byId[scoreboards.byId[scoreboardId].data.baseline_team_id] && (
              <Typography variant="body1">
                {teams.byId[scoreboards.byId[scoreboardId].data.baseline_team_id].name}
              </Typography>
            )}
          </AlignedText>
          <AlignedText text="Team Label Filter" childrenType="text">
            <Typography variant="body1">
              {scoreboards.byId[scoreboardId] && scoreboards.byId[scoreboardId].data.team_label_filter}
            </Typography>
          </AlignedText>
        </SimpleBar>
      ) : (
        <ScoreboardEdit setEdit={setEdit} />
      )}

      <SimpleBar title="Scoreboard" noIndent>
        <SimpleTable isEdit={false} hasDelete={false} columns={scoreboardTitle} data={scoreboardTeams} />
      </SimpleBar>
      {role === 'MANAGER' && (
        <SimpleBar
          title="Delete Scoreboard"
          childrenButtons={(
            <>
              <Button color="secondary" onClick={() => setDeletePopup(true)}>
                Delete
              </Button>
            </>
          )}
        >
          <Typography variant="body1">
            Once you delete a scoreboard, there is no going back. Please be certain.
          </Typography>
        </SimpleBar>
      )}
      <Dialog open={deletePopup} onClose={() => setDeletePopup(false)} maxWidth="md">
        <DialogTitle>
          <Typography variant="h4">Delete Scoreboard</Typography>
        </DialogTitle>
        <DialogContent>
          <AlignedText text="Class" childrenType="text" textColor="secondary">
            <Typography variant="body1">{`${courses.byId[courseId].name} ${classes.byId[classId].name}`}</Typography>
          </AlignedText>
          <AlignedText text="Title" childrenType="text" textColor="secondary">
            <Typography variant="body1">
              {scoreboards.byId[scoreboardId] && scoreboards.byId[scoreboardId].title}
            </Typography>
          </AlignedText>
          <AlignedText text="Label" childrenType="text" textColor="secondary">
            <Typography variant="body1">
              {scoreboards.byId[scoreboardId] && scoreboards.byId[scoreboardId].challenge_label}
            </Typography>
          </AlignedText>
          <Typography variant="body2">
            Once you delete a scoreboard, there is no going back. Please be certain.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeletePopup(false)}>Cancel</Button>
          <Button color="secondary" onClick={clickDelete}>
            Delete
          </Button>
        </DialogActions>
      </Dialog>
      <Snackbar
        message={`Error: ${error.viewTeamProjectScoreboard}`}
        open={showSnackbar}
        autoHideDuration={3000}
        onClose={() => setShowSnackbar(false)}
      />
    </>
  );
}
