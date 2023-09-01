import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Snackbar,
  Typography,
  makeStyles,
} from '@material-ui/core';
import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';

import AlignedText from '@/components/AlignedText';
import PageTitle from '@/components/PageTitle';
import Icon from '@/components/icon/index';
import useChallenge from '@/lib/challenge/useChallenge';
import useClass from '@/lib/class/useClass';
import useCourse from '@/lib/course/useCourse';
import useProblem from '@/lib/problem/useProblem';
import useProblemRejudge from '@/lib/problem/useProblemRejudge';
import useUserClasses from '@/lib/user/useUserClasses';

import CodingProblemEdit from './CodingProblemEdit';
import CodingProblemInfo from './CodingProblemInfo';

const useStyles = makeStyles(() => ({
  sampleArea: {
    marginTop: '50px',
  },
  generalButtons: {
    display: 'flex',
    justifyContent: 'flex-end',
  },
  managerButtons: {
    display: 'flex',
    justifyContent: 'space-between',
  },
}));

export default function ProblemInfo({
  courseId,
  classId,
  challengeId,
  problemId,
}: {
  courseId: string;
  classId: string;
  challengeId: string;
  problemId: string;
}) {
  const history = useHistory();
  const className = useStyles();
  const { accountClasses } = useUserClasses();
  const { class: classData } = useClass(Number(classId));
  const { course } = useCourse(Number(courseId));
  const { problem } = useProblem(Number(problemId));
  const { challenge } = useChallenge(Number(challengeId));
  const { rejudgeProblem, error } = useProblemRejudge(Number(problemId));

  const [edit, setEdit] = useState(false);
  const [role, setRole] = useState('NORMAL');
  const [rejudgePopUp, setRejudgePopUp] = useState(false);
  const [showSnackbar, setShowSnackbar] = useState<boolean>(false);

  const handleEditSuccess = () => {
    setEdit(false);
  };

  const handleEditCancel = () => {
    setEdit(false);
  };

  const handleRejudge = async () => {
    try {
      const res = rejudgeProblem({ problem_id: Number(problemId) });
      if ((await res).ok) {
        setRejudgePopUp(false);
      }
    } catch {
      setShowSnackbar(true);
    }
  };

  useEffect(() => {
    if (accountClasses?.filter((item) => item.class_id === Number(classId))[0].role === 'MANAGER') {
      setRole('MANAGER');
    } else if (accountClasses?.filter((item) => item.class_id === Number(classId))[0].role === 'GUEST') {
      setRole('GUEST');
    }
  }, [classId, accountClasses]);

  useEffect(() => {
    setEdit(false);
  }, [problemId]);

  return (
    <>
      <PageTitle
        text={`${challenge === undefined ? 'error' : challenge.title} / ${
          problem === undefined ? 'error' : problem.challenge_label
        }`}
      />
      {!edit && role === 'MANAGER' ? (
        <div className={className.managerButtons}>
          <div>
            <Button color="default" onClick={() => setEdit(true)}>
              Edit
            </Button>
            <Button color="default" onClick={() => setRejudgePopUp(true)}>
              Rejudge
            </Button>
          </div>
          <div>
            <Button
              variant="outlined"
              color="primary"
              onClick={() =>
                history.push(
                  `/my-class/${courseId}/${classId}/challenge/${challengeId}/problem/${problemId}/my-submission`,
                )
              }
              startIcon={<Icon.HistoryIcon />}
            >
              My Submission
            </Button>
            <Button
              color="primary"
              onClick={() =>
                history.push(
                  `/my-class/${courseId}/${classId}/challenge/${challengeId}/problem/${problemId}/code-submission`,
                )
              }
            >
              Submit
            </Button>
          </div>
        </div>
      ) : (
        !edit && (
          <div className={className.generalButtons}>
            <Button
              variant="outlined"
              color="primary"
              onClick={() =>
                history.push(
                  `/my-class/${courseId}/${classId}/challenge/${challengeId}/problem/${problemId}/my-submission`,
                )
              }
              startIcon={<Icon.HistoryIcon />}
            >
              My Submission
            </Button>
            <Button
              color="primary"
              onClick={() =>
                history.push(
                  `/my-class/${courseId}/${classId}/challenge/${challengeId}/problem/${problemId}/code-submission`,
                )
              }
            >
              Submit
            </Button>
          </div>
        )
      )}
      {edit ? (
        <CodingProblemEdit handleSuccess={handleEditSuccess} handleCancel={handleEditCancel} problemId={problemId} />
      ) : (
        <CodingProblemInfo courseId={courseId} classId={classId} challengeId={challengeId} problemId={problemId} />
      )}
      <Dialog open={rejudgePopUp} onClose={() => setRejudgePopUp(false)} maxWidth="md">
        <DialogTitle>
          <Typography variant="h4">Rejudge Problem</Typography>
        </DialogTitle>
        <DialogContent>
          <AlignedText text="Class" childrenType="text">
            <Typography>{`${course?.name} ${classData?.name}`}</Typography>
          </AlignedText>
          <AlignedText text="Title" childrenType="text">
            <Typography>{problem === undefined ? 'error' : problem.title}</Typography>
          </AlignedText>
          <AlignedText text="Label" childrenType="text">
            <Typography>{problem === undefined ? 'error' : problem.challenge_label}</Typography>
          </AlignedText>
          <Typography variant="body2" color="textPrimary">
            Once you rejudge a problem, all related submissions will be judged again.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setRejudgePopUp(false)}>Cancel</Button>
          <Button color="secondary" onClick={handleRejudge}>
            Rejudge
          </Button>
        </DialogActions>
      </Dialog>
      <Snackbar
        open={showSnackbar}
        autoHideDuration={3000}
        onClose={() => {
          setShowSnackbar(false);
        }}
        message={`Error: ${error.rejudgeProblem?.message}`}
      />
    </>
  );
}
