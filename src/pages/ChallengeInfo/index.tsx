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
import useUserClasses from '@/lib/user/useUserClasses';
import useChallengeTasks from '@/lib/task/useChallengeTasks';
import useChallenge from '@/lib/challenge/useChallenge';
import useProblemScore from '@/lib/problem/useProblemScore';

interface TableProp{
    challenge_label?: string;
    score?: Promise<number>;
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

/* This is a level 4 component (page component) */
export default function ChallengeInfo({ courseId, classId, challengeId }: { courseId: string; classId: string; challengeId: string }) {
  const className = useStyles();
  const { challenge, isLoading: challengeLoading, editChallenge, mutateChallenge } = useChallenge(Number(challengeId));
  const { accountClasses } = useUserClasses();
  const { readScore } = useProblemScore();

  const { tasks } = useChallengeTasks(Number(challengeId));
  const problems = tasks?.problem;
  const essays = tasks?.essay;
  const peerReviews = tasks?.peer_review;
  const scoreboards = tasks?.scoreboard;

  const [currentTime] = useState(moment());
  const [status, setStatus] = useState('');
  const [role, setRole] = useState('NORMAL');
  const [editMode, setEditMode] = useState(false);
  const [inputs, setInputs] = useState('');
  const [tableData, setTableData] = useState<TableProp[]>([]);

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
    const getScore = async (id: number) => {
      const data = await readScore({problem_id: id});
      return data.data.data.score;
    }

    if (challenge) {
      if (problems?.reduce((acc, item) => acc && item !== undefined, true)) {
        const problemData: TableProp[] | undefined =
          problems?.sort((a, b) => a.challenge_label.localeCompare(b.challenge_label))
          .map(({ id }) => ({  
            challenge_label: problems[id]?.challenge_label,
            score: getScore(id), 
            id: `coding-${id}`,
          }))
        // problems are complete
        if (role === 'MANAGER' || role === 'NORMAL') {
          const essayData: TableProp[] | undefined = 
            essays?.sort((a, b) => a.challenge_label.localeCompare(b.challenge_label))
            .map(({ id }) => ({
              challenge_label: essays[id]?.challenge_label,
              id: `essay-${id}`,
            }))
  
          const peerReviewData: TableProp[] | undefined =
            peerReviews?.sort((a, b) => a.challenge_label.localeCompare(b.challenge_label))
            .map(({ id }) => ({
              challenge_label: peerReviews[id]?.challenge_label,
              id: `peer-${id}`,
            }))

           const scoreboardData: TableProp[] | undefined =
            scoreboards?.sort((a, b) => a.challenge_label.localeCompare(b.challenge_label))
            .map(({ id }) => ({
              challenge_label: scoreboards[id]?.challenge_label,
              id: `scoreboard-${id}`,
            }))

          if(problemData && essayData && peerReviewData && scoreboardData){
            const newData: TableProp[] = 
              peerReviewData.concat(
                essayData,
                peerReviewData,
                scoreboardData
              )
            setTableData(newData);
          }
        } else {
          setTableData(problemData);
        }
      }
    }
  }, [challenge, problems, essays, peerReviews, scoreboards, role, readScore]);

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
    const res = editChallenge({
      challenge_id: Number(challengeId),
    });
    if((await res).ok){
      mutateChallenge();
    }
    setEditMode(false);
    setInputs(challenge.description);
  };

  return (
    <>
      <PageTitle text={`${challenge.title} / Info`} />
      <SimpleBar
        title="Description"
        buttons={<>{role === 'MANAGER' && !editMode && <Button onClick={handleEdit}>Edit</Button>}</>}
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
          <MathpixLoader>
            <MathpixMarkdown text={challenge.description} htmlTags />
          </MathpixLoader>
        )}
      </SimpleBar>
      <SimpleBar title="Challenge Information">
        <>
          <AlignedText text="Scored by" childrenType="text">
            <Typography variant="body1">
              {challenge.selection_type === 'LAST' ? 'Last Score' : 'Best Score'}
            </Typography>
          </AlignedText>
          <AlignedText text="Status" childrenType="text">
            <Typography variant="body1">{status}</Typography>
          </AlignedText>
          <AlignedText text="Start time" childrenType="text">
            <Typography variant="body1">
              {moment(challenge.start_time).format('YYYY-MM-DD, HH:mm')}
            </Typography>
          </AlignedText>
          <AlignedText text="End time" childrenType="text">
            <Typography variant="body1">
              {moment(challenge.end_time).format('YYYY-MM-DD, HH:mm')}
            </Typography>
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
