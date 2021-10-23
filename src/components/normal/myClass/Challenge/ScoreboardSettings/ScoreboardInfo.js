import React, { useState, useEffect } from 'react';
import { Typography, Button } from '@material-ui/core';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import AlignedText from '../../../../ui/AlignedText';
import SimpleBar from '../../../../ui/SimpleBar';
import SimpleTable from '../../../../ui/SimpleTable';
import PageTitle from '../../../../ui/PageTitle';
import { readProblemInfo } from '../../../../../actions/myClass/problem';
import { fetchTeams } from '../../../../../actions/myClass/team';
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

// TODO: replace with view api to get real data
const mockteam1 = {
  team_id: 4,
  team_name: 'test_modify_name',
  total_score: 40.33,
  target_problem_data: [
    { problem_id: 48, score: 40.1, submission_id: 571 },
    { problem_id: 74, score: 40.2, submission_id: 567 },
  ],
};
const mockteam2 = {
  team_id: 78,
  team_name: 'Team Apple',
  total_score: 70.33,
  target_problem_data: [
    { problem_id: 48, score: 30.1, submission_id: 571 },
    { problem_id: 74, score: 40.2, submission_id: 567 },
  ],
};
const mockteam3 = {
  team_id: 9,
  team_name: 'edit team',
  total_score: 66.33,
  target_problem_data: [
    { problem_id: 48, score: 33.1, submission_id: 571 },
    { problem_id: 74, score: 33.2, submission_id: 567 },
  ],
};

export default function ScoreboardInfo() {
  const {
    courseId, classId, challengeId, scoreboardId,
  } = useParams();
  const dispatch = useDispatch();
  const authToken = useSelector((state) => state.auth.token);
  const problems = useSelector((state) => state.problem.byId);
  const challenges = useSelector((state) => state.challenges);
  // const scoreboards = useSelector((state) => state.scoreboards);
  const teamss = useSelector((state) => state.teams);
  const [scoreboardTitle, setScoreboardTitle] = useState(scoreboardBasicTitle);
  const [teams, setTeams] = useState([]);
  const [hasReadProblem, setHasReadProblem] = useState(false);
  const [edit, setEdit] = useState(false);

  useEffect(() => {
    dispatch(fetchTeams(authToken, classId, ''));
  }, [authToken, classId, dispatch]);

  // useEffect(() => {
  //   dispatch(readScoreboard(authToken, scoreboardId));
  // }, [authToken, dispatch, scoreboardId]);

  useEffect(() => {
    if (teams.length > 0 && !hasReadProblem) {
      teams[0].target_problem_data.map((p) => dispatch(readProblemInfo(authToken, p.problem_id)));
      setHasReadProblem(true);
    }
  }, [authToken, dispatch, hasReadProblem, teams]);

  useEffect(() => {
    // TODO: set tempTeams with view api.
    let tempTeams = [mockteam1, mockteam2, mockteam3];
    tempTeams.sort((a, b) => b.total_score - a.total_score);

    if (tempTeams.length > 0) {
      const scoreColumns = tempTeams[0].target_problem_data.map((p) => {
        const column = {
          id: `problem-${p.problem_id}-score`,
          label: `${problems[p.problem_id]?.challenge_label} Score`,
          minWidth: 100,
          align: 'center',
          width: 200,
          type: 'string',
        };
        if (p.submission_id) {
          column.type = 'link';
          column.link_id = `problem-${p.problem_id}-submission`;
        }
        return column;
      });
      setScoreboardTitle([].concat(scoreboardBasicTitle, scoreColumns));
    }

    tempTeams = tempTeams.map((team, index) => {
      const tempTeam = {
        ...team,
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
    setTeams(tempTeams);
  }, [classId, courseId, problems]);

  const transIdToLabel = (ids) => {
    const labels = ids.map((id) => problems[id].challenge_label);
    return labels.join(', ');
  };

  return (
    <>
      {/* <PageTitle
        text={`${challenges.byId[challengeId] === undefined ? 'error' : challenges.byId[challengeId].title} / ${
          scoreboards.byId[scoreboardId] === undefined ? 'error' : scoreboards.byId[scoreboardId].challenge_label
        }`}
      /> */}
      <PageTitle
        text={`${challenges.byId[challengeId] === undefined ? 'error' : challenges.byId[challengeId].title} / `}
      />
      {!edit ? (
        <SimpleBar
          title="Ranking Configuration"
          buttons={(
            <>
              <Button onClick={() => setEdit(true)}>Edit</Button>
            </>
          )}
        >
          <AlignedText text="Scoreboard Type" childrenType="text">
            <Typography variant="body1">Team Project</Typography>
            {/* <Typography variant="body1">{scoreboards.byId[scoreboardId].scoreboard_type === 'TEAM_PROJECT' ? 'Team Project' : 'Contest'}</Typography> */}
          </AlignedText>
          <AlignedText text="Title" childrenType="text">
            <Typography variant="body1">Scoreboard</Typography>
            {/* <Typography variant="body1">{scoreboards.byId[scoreboardId].title}</Typography> */}
          </AlignedText>
          <AlignedText text="Target Problems" childrenType="text">
            {hasReadProblem && <Typography variant="body1">{transIdToLabel([48, 74])}</Typography>}
            {/* {hasReadProblem && (
              <Typography variant="body1">
                {transIdToLabel(scoreboards.byId[scoreboardId].target_problem_ids)}
              </Typography>
            )} */}
          </AlignedText>
          <AlignedText text="Scoring Formula" childrenType="text">
            <Typography variant="body1">1.5 + 1.5 * (team_score - class_worst) / (class_best - class_worst)</Typography>
            {/* <Typography variant="body1">{scoreboards.byId[scoreboardId].data.scoring_formula}</Typography> */}
          </AlignedText>
          <AlignedText text="Baseline Team" childrenType="text">
            {Object.keys(teamss.byId).length !== 0 && <Typography variant="body1">{teamss.byId[47].name}</Typography>}
            {/* <Typography variant="body1">
              {scoreboards.byId[scoreboardId].data.baseline_team_id
                ? teams.byId[scoreboards.byId[scoreboardId].data.baseline_team_id].name
                : '-'}
            </Typography> */}
          </AlignedText>
          <AlignedText text="Team Label Filter" childrenType="text">
            <Typography variant="body1">
              {/* {scoreboards.byId[scoreboardId].data.team_label_filter
                ? scoreboards.byId[scoreboardId].data.team_label_filter
                : '-'} */}
            </Typography>
          </AlignedText>
        </SimpleBar>
      ) : (
        <ScoreboardEdit setEdit={setEdit} />
      )}

      <SimpleBar title="Scoreboard" noIndent>
        <SimpleTable isEdit={false} hasDelete={false} columns={scoreboardTitle} data={teams} />
      </SimpleBar>
    </>
  );
}
