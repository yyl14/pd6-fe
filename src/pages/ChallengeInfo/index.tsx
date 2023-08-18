/* eslint-disable @typescript-eslint/ban-ts-comment */
import { Button, TextField, Typography, makeStyles } from '@material-ui/core';
import { MathpixLoader, MathpixMarkdown } from 'mathpix-markdown-it';
import moment from 'moment';
import { useEffect, useState } from 'react';

import GeneralLoading from '@//components/GeneralLoading';
import NoMatch from '@//components/noMatch';
import AlignedText from '@/components/ui/AlignedText';
import PageTitle from '@/components/ui/PageTitle';
import SimpleBar from '@/components/ui/SimpleBar';
import SimpleTable from '@/components/ui/SimpleTable';
import useReduxStateShape from '@/hooks/useReduxStateShape';
import useChallenge from '@/lib/challenge/useChallenge';
import useProblemScore from '@/lib/problem/useProblemScore';
import useChallengeTasks from '@/lib/task/useChallengeTasks';
import useUserClasses from '@/lib/user/useUserClasses';

interface TableProp {
  challenge_label?: string;
  score?: number;
  id?: string;
}

const useStyles = makeStyles(() => ({
  descriptionField: {
    width: '60vw',
  },
  table: {
    width: '100%',
  },
}));

export default function ChallengeInfo({
  classId,
  challengeId,
  isProblemSet,
}: {
  classId: string;
  challengeId: string;
  isProblemSet: boolean;
}) {
  const className = useStyles();
  const { challenge, isLoading: challengeLoading, editChallenge } = useChallenge(Number(challengeId));
  const { accountClasses } = useUserClasses();
  const { readScore } = useProblemScore();

  const { tasks } = useChallengeTasks(Number(challengeId));

  const [currentTime] = useState(moment());
  const [status, setStatus] = useState('');
  const [role, setRole] = useState('NORMAL');
  const [editMode, setEditMode] = useState(false);
  const [inputs, setInputs] = useState('');
  const [showDescription, setShowDescription] = useState<boolean>(true);
  const [tableData, setTableData] = useState<TableProp[]>([]);
  const [problemsById, problemIds] = useReduxStateShape(tasks?.problem);
  const [essaysById, essayIds] = useReduxStateShape(tasks?.essay);
  const [peerReviewsById, peerReviewIds] = useReduxStateShape(tasks?.peer_review);
  const [scoreboardsById, scoreboardIds] = useReduxStateShape(tasks?.scoreboard);

  useEffect(() => {
    if (challenge) {
      if (currentTime.isBefore(moment(challenge.start_time))) {
        setStatus('Not Yet');
      } else if (currentTime.isBefore(moment(challenge.end_time))) {
        setStatus('Opened');
      } else {
        setStatus('Closed');
      }
      setInputs(challenge.description);
    }
  }, [challenge, currentTime]);

  useEffect(() => {
    if (accountClasses?.filter((item) => item.class_id === Number(classId))[0].role === 'MANAGER') {
      setRole('MANAGER');
    } else if (accountClasses?.filter((item) => item.class_id === Number(classId))[0].role === 'GUEST') {
      setRole('GUEST');
    }
  }, [classId, accountClasses]);

  useEffect(() => {
    if (challenge?.description === '' && (isProblemSet || role !== 'MANAGER')) {
      setShowDescription(false);
    } else {
      setShowDescription(true);
    }
  }, [challenge, role, isProblemSet]);

  useEffect(() => {
    async function getScore(id: number) {
      try {
        const { data } = await readScore({ problem_id: id });
        return data?.data?.score;
      } catch (err) {
        return 0;
      }
    }

    async function settingTableData() {
      const problemDataPromises = (problemIds || [])
        .map((id) => problemsById[id])
        .sort((a, b) => a.challenge_label.localeCompare(b.challenge_label))
        .map(async ({ id }) => ({
          challenge_label: problemsById[id]?.challenge_label,
          score: await getScore(id),
          id: `coding-${id}`,
        }));

      const problemData: TableProp[] = await Promise.all(problemDataPromises);

      if ((role === 'MANAGER' || role === 'NORMAL') && !isProblemSet) {
        const essayData: TableProp[] | undefined = essayIds
          ?.map((id) => essaysById[id])
          .sort((a, b) => a.challenge_label.localeCompare(b.challenge_label))
          .map(({ id }) => ({
            challenge_label: essaysById[id]?.challenge_label,
            id: `essay-${id}`,
          }));

        const peerReviewData: TableProp[] | undefined = peerReviewIds
          ?.map((id) => peerReviewsById[id])
          .sort((a, b) => a.challenge_label.localeCompare(b.challenge_label))
          .map(({ id }) => ({
            challenge_label: peerReviewsById[id]?.challenge_label,
            id: `peer-${id}`,
          }));

        const scoreboardData: TableProp[] | undefined = scoreboardIds
          ?.map((id) => scoreboardsById[id])
          .sort((a, b) => a.challenge_label.localeCompare(b.challenge_label))
          .map(({ id }) => ({
            challenge_label: scoreboardsById[id]?.challenge_label,
            id: `scoreboard-${id}`,
          }));
        const newData: TableProp[] = problemData.concat(essayData, peerReviewData, scoreboardData);
        setTableData(newData);
      } else {
        setTableData(problemData);
      }
    }

    if (challenge) {
      settingTableData();
    }
  }, [
    challenge,
    role,
    readScore,
    problemsById,
    problemIds,
    essaysById,
    essayIds,
    peerReviewsById,
    peerReviewIds,
    scoreboardsById,
    scoreboardIds,
    isProblemSet,
  ]);

  if (challenge === undefined) {
    if (challengeLoading.read) {
      return <GeneralLoading />;
    }
    return <NoMatch />;
  }

  const handleEdit = () => {
    setEditMode(true);
  };

  const handleCancel = () => {
    setEditMode(false);
    setInputs(challenge.description);
  };

  const handleSave = async () => {
    try {
      await editChallenge({
        challenge_id: Number(challengeId),
        description: inputs,
      });
      setEditMode(false);
    } catch {
      setInputs(challenge.description);
    }
  };

  return (
    <>
      <PageTitle text={`${challenge.title} / Info`} />
      {showDescription && (
        <SimpleBar
          title="Description"
          buttons={
            <>{role === 'MANAGER' && !isProblemSet && !editMode && <Button onClick={handleEdit}>Edit</Button>}</>
          }
        >
          {editMode ? (
            <div>
              <TextField
                placeholder="(Text, LaTeX, Markdown and HTML supported)"
                className={className.descriptionField}
                value={inputs}
                onChange={(e) => setInputs(e.target.value)}
                multiline
                minRows={10}
                maxRows={10}
                variant="outlined"
              />
              <Button onClick={handleCancel}>Cancel</Button>
              <Button onClick={handleSave} color="primary">
                Save
              </Button>
            </div>
          ) : (
            // @ts-ignore
            <MathpixLoader>
              {
                // @ts-ignore
                <MathpixMarkdown text={challenge.description} htmlTags />
              }
            </MathpixLoader>
          )}
        </SimpleBar>
      )}
      <SimpleBar title="Challenge Information">
        <>
          <AlignedText text="Scored by" childrenType="text">
            <Typography variant="body1">{challenge.selection_type === 'LAST' ? 'Last Score' : 'Best Score'}</Typography>
          </AlignedText>
          <AlignedText text="Status" childrenType="text">
            <Typography variant="body1">{status}</Typography>
          </AlignedText>
          <AlignedText text="Start time" childrenType="text">
            <Typography variant="body1">{moment(challenge.start_time).format('YYYY-MM-DD, HH:mm')}</Typography>
          </AlignedText>
          <AlignedText text="End time" childrenType="text">
            <Typography variant="body1">{moment(challenge.end_time).format('YYYY-MM-DD, HH:mm')}</Typography>
          </AlignedText>
        </>
      </SimpleBar>
      <SimpleBar title="Overview" noIndent>
        <SimpleTable
          isEdit={false}
          hasDelete={false}
          buttons={false}
          columns={[
            {
              id: 'challenge_label',
              label: 'Label',
              minWidth: 30,
              align: 'center',
              width: 300,
              type: 'string',
            },
            {
              id: 'score',
              label: 'Score',
              minWidth: 50,
              align: 'center',
              width: 600,
              type: 'string',
            },
          ]}
          data={tableData}
          setData={false}
        />
      </SimpleBar>
    </>
  );
}
