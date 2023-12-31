/* eslint-disable @typescript-eslint/ban-ts-comment */
import { Box, Button, TextField, Typography, makeStyles } from '@material-ui/core';
import { MathpixLoader, MathpixMarkdown } from 'mathpix-markdown-it';
import moment from 'moment';
import { useEffect, useState } from 'react';

import AlignedText from '@/components/AlignedText';
import GeneralLoading from '@/components/GeneralLoading';
import PageTitle from '@/components/PageTitle';
import SimpleBar from '@/components/SimpleBar';
import SimpleTable from '@/components/SimpleTable';
import NoMatch from '@/components/noMatch';
import useReduxStateShape from '@/hooks/useReduxStateShape';
import useUserClassRole from '@/hooks/useUserClassRole';
import useChallenge from '@/lib/challenge/useChallenge';
import useProblemScores from '@/lib/problem/useProblemScores';
import useChallengeTasks from '@/lib/task/useChallengeTasks';

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
  const { tasks } = useChallengeTasks(Number(challengeId));
  const [problemsById, problemIds] = useReduxStateShape(tasks?.problem);
  const [essaysById, essayIds] = useReduxStateShape(tasks?.essay);
  const [peerReviewsById, peerReviewIds] = useReduxStateShape(tasks?.peer_review);
  const [scoreboardsById, scoreboardIds] = useReduxStateShape(tasks?.scoreboard);
  const { problemScores } = useProblemScores(problemIds.map((id) => Number(id)));

  const [currentTime] = useState(moment());
  const [status, setStatus] = useState('');
  const role = useUserClassRole(Number(classId));
  const [editMode, setEditMode] = useState(false);
  const [descriptionInputValue, setDescriptionInputValue] = useState('');
  const [showDescription, setShowDescription] = useState<boolean>(true);
  const [tableData, setTableData] = useState<TableProp[]>([]);

  const [hasInitialized, setHasInitialized] = useState(false);

  useEffect(() => {
    if (challenge !== undefined) {
      if (currentTime.isBefore(moment(challenge.start_time))) {
        setStatus('Not Yet');
      } else if (currentTime.isBefore(moment(challenge.end_time))) {
        setStatus('Opened');
      } else {
        setStatus('Closed');
      }
      if (!hasInitialized) {
        setDescriptionInputValue(challenge.description);
        setHasInitialized(true);
      }
    }
  }, [challenge, currentTime, hasInitialized]);

  useEffect(() => {
    if (challenge?.description === '' && (isProblemSet || role !== 'MANAGER')) {
      setShowDescription(false);
    } else {
      setShowDescription(true);
    }
  }, [challenge, role, isProblemSet]);

  useEffect(() => {
    async function settingTableData() {
      const problemData: TableProp[] = (problemIds || [])
        .map((id) => problemsById[id])
        .sort((a, b) => a.challenge_label.localeCompare(b.challenge_label))
        .map(({ id }) => ({
          challenge_label: problemsById[id]?.challenge_label,
          score: problemScores?.find((score) => score.id === id)?.score ?? undefined,
          id: `coding-${id}`,
        }));

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
    problemsById,
    problemIds,
    essaysById,
    essayIds,
    peerReviewsById,
    peerReviewIds,
    problemScores,
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
    setDescriptionInputValue(challenge.description);
  };

  const handleSave = async () => {
    try {
      await editChallenge({
        challenge_id: Number(challengeId),
        description: descriptionInputValue,
      });
      setEditMode(false);
    } catch {
      setDescriptionInputValue(challenge.description);
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
            <>
              <TextField
                placeholder="(Text, LaTeX, Markdown and HTML supported)"
                className={className.descriptionField}
                value={descriptionInputValue}
                onChange={(e) => setDescriptionInputValue(e.target.value)}
                multiline
                minRows={10}
                maxRows={10}
                variant="outlined"
              />
              <Box>
                <Button onClick={handleCancel}>Cancel</Button>
                <Button onClick={handleSave} color="primary">
                  Save
                </Button>
              </Box>
            </>
          ) : (
            // @ts-ignore
            <MathpixLoader>
              {
                // @ts-ignore
                <MathpixMarkdown text={challenge?.description ?? ''} htmlTags />
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
