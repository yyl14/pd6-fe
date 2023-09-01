import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Snackbar, Typography } from '@material-ui/core';
import { useEffect, useMemo, useState } from 'react';
import { useHistory } from 'react-router-dom';

import NoMatch from '@/components/noMatch';
import AlignedText from '@/components/ui/AlignedText';
import PageTitle from '@/components/ui/PageTitle';
import SimpleBar from '@/components/ui/SimpleBar';
import SimpleTable from '@/components/ui/SimpleTable';
import useChallenge from '@/lib/challenge/useChallenge';
import useClass from '@/lib/class/useClass';
import useCourse from '@/lib/course/useCourse';
import type { DataType } from '@/lib/scoreboard/useScoreboard';
import useScoreboard from '@/lib/scoreboard/useScoreboard';
import useChallengeTasks from '@/lib/task/useChallengeTasks';
import useTeam from '@/lib/team/useTeam';
import useUserClasses from '@/lib/user/useUserClasses';
import useViewTeamProjectScoreboard from '@/lib/view/useViewTeamProjectScoreboard';
import ScoreboardEdit from '@/pages/Scoreboard/components/ScoreboardEdit';

type ColumnType = {
  id: string;
  label: string;
  align: string;
  width: number;
  type: string;
  minWidth?: number;
  link_id?: string;
};

const scoreboardBasicTitle: ColumnType[] = [
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

export default function ScoreboardInfo({
  courseId,
  classId,
  challengeId,
  scoreboardId,
}: {
  courseId: string;
  classId: string;
  challengeId: string;
  scoreboardId: string;
}) {
  const { challenge } = useChallenge(Number(challengeId));
  const history = useHistory();
  const { scoreboard, deleteScoreboard } = useScoreboard(Number(scoreboardId));
  const { class: classes } = useClass(Number(classId));
  const { course } = useCourse(Number(courseId));
  const { accountClasses: userClasses } = useUserClasses();
  const { team } = useTeam(scoreboard?.data.baseline_team_id);
  const { teamProjectScoreboard, error } = useViewTeamProjectScoreboard(Number(scoreboardId));
  const { tasks } = useChallengeTasks(Number(challengeId));

  const [edit, setEdit] = useState(false);
  const [role, setRole] = useState('GUEST');
  const [scoreboardTitle, setScoreboardTitle] = useState<ColumnType[]>(scoreboardBasicTitle);
  const [scoreboardTeams, setScoreboardTeams] = useState<DataType[]>([]);
  const [showSnackbar, setShowSnackbar] = useState(false);
  const [deletePopup, setDeletePopup] = useState(false);
  const labels = useMemo(
    () =>
      scoreboard?.target_problem_ids.map((id) => tasks?.problem.find((problem) => problem.id === id)?.challenge_label),
    [scoreboard?.target_problem_ids, tasks?.problem],
  );

  useEffect(() => {
    if (scoreboard) {
      if (teamProjectScoreboard) {
        setScoreboardTeams(
          teamProjectScoreboard
            .sort((a, b) => b.total_score - a.total_score)
            .map((teamInfo, index) =>
              teamInfo.target_problem_data.reduce(
                (acc, curr) => ({
                  ...acc,
                  [`problem-${curr.problem_id}-score`]: curr.score,
                  ...(curr.submission_id && {
                    [`problem-${curr.problem_id}-submission`]: `/my-class/${courseId}/${classId}/submission/${curr.submission_id}`,
                  }),
                }),
                {
                  ...teamInfo,
                  id: teamInfo.team_id,
                  rank: index + 1,
                  team_path: `/6a/my-class/${courseId}/${classId}/team/${teamInfo.team_id}`,
                },
              ),
            ),
        );
      }
      // set scoreboard column
      setScoreboardTitle([
        ...scoreboardBasicTitle,
        ...scoreboard.target_problem_ids.map((problem, index) => ({
          id: `problem-${problem}-score`,
          label: `${labels?.[index]} Score`,
          minWidth: 100,
          align: 'center',
          width: 200,
          type: role === 'MANAGER' ? 'link' : 'string',
          link_id: `problem-${problem}-submission`,
        })),
      ]);
    }
  }, [classId, courseId, labels, role, scoreboard, scoreboardId, teamProjectScoreboard]);

  useEffect(() => {
    if (userClasses?.filter((item) => item.class_id === Number(classId))?.[0]?.role) {
      setRole(userClasses?.filter((item) => item.class_id === Number(classId))[0].role);
    }
  }, [classId, userClasses]);

  if (role === 'GUEST') {
    return <NoMatch />;
  }

  const handleDeleteClick = async () => {
    try {
      await deleteScoreboard();
      setDeletePopup(false);
      history.push(`/6a/my-class/${courseId}/${classId}/challenge/${challengeId}`);
    } catch {
      setShowSnackbar(true);
    }
  };

  const getScoreboardType = (scoreboardType: string | undefined) => {
    switch (scoreboardType) {
      case 'TEAM_PROJECT':
        return 'Team Project';
      case 'TEAM_CONTEST':
        return 'Contest';
      default:
        return 'Unknown';
    }
  };
  return (
    <>
      <PageTitle text={`${challenge?.title ?? 'error'} / ${scoreboard?.challenge_label ?? 'error'}`} />
      {edit ? (
        <ScoreboardEdit
          scoreboardId={scoreboardId}
          challengeId={challengeId}
          getScoreboardType={getScoreboardType}
          setEdit={setEdit}
          setShowSnackbar={setShowSnackbar}
        />
      ) : (
        <SimpleBar
          title="Ranking Configuration"
          buttons={<>{role === 'MANAGER' && !edit && <Button onClick={() => setEdit(true)}>Edit</Button>}</>}
        >
          <AlignedText text="Scoreboard Type" childrenType="text">
            <Typography variant="body1">{getScoreboardType(scoreboard?.type)}</Typography>
          </AlignedText>
          <AlignedText text="Title" childrenType="text">
            <Typography variant="body1">{scoreboard?.title}</Typography>
          </AlignedText>
          <AlignedText text="Target Problems" childrenType="text">
            <Typography variant="body1">{labels?.join(', ')}</Typography>
          </AlignedText>
          <AlignedText text="Scoring Formula" childrenType="text">
            <Typography variant="body1">{scoreboard?.data.scoring_formula}</Typography>
          </AlignedText>
          <AlignedText text="Baseline Team" childrenType="text">
            <Typography variant="body1">{team?.name}</Typography>
          </AlignedText>
          <AlignedText text="Team Label Filter" childrenType="text">
            <Typography variant="body1">{scoreboard?.data.team_label_filter}</Typography>
          </AlignedText>
        </SimpleBar>
      )}
      <SimpleBar title="Scoreboard" noIndent>
        <SimpleTable
          // TODO: remove after refactor SimpleTable
          setData={null}
          //
          isEdit={false}
          hasDelete={false}
          columns={scoreboardTitle}
          data={scoreboardTeams}
        />
      </SimpleBar>
      {role === 'MANAGER' && (
        <SimpleBar
          title="Delete Scoreboard"
          childrenButtons={
            <>
              <Button color="secondary" onClick={() => setDeletePopup(true)}>
                Delete
              </Button>
            </>
          }
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
            <Typography variant="body1">{`${course?.name} ${classes?.name}`}</Typography>
          </AlignedText>
          <AlignedText text="Title" childrenType="text" textColor="secondary">
            <Typography variant="body1">{scoreboard?.title}</Typography>
          </AlignedText>
          <AlignedText text="Label" childrenType="text" textColor="secondary">
            <Typography variant="body1">{scoreboard?.challenge_label}</Typography>
          </AlignedText>
          <Typography variant="body2">
            Once you delete a scoreboard, there is no going back. Please be certain.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeletePopup(false)}>Cancel</Button>
          <Button color="secondary" onClick={handleDeleteClick}>
            Delete
          </Button>
        </DialogActions>
      </Dialog>
      <Snackbar
        message={`Error: ${error.browse}`}
        open={showSnackbar}
        autoHideDuration={3000}
        onClose={() => setShowSnackbar(false)}
      />
    </>
  );
}
