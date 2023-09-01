import { Typography, makeStyles } from '@material-ui/core';
import { Link } from 'react-router-dom';

import AlignedText from '@/components/AlignedText';
import SimpleBar from '@/components/SimpleBar';
import useChallenge from '@/lib/challenge/useChallenge';
import usePeerReview from '@/lib/peerReview/usePeerReview';
import useProblem from '@/lib/problem/useProblem';

const useStyles = makeStyles((theme) => ({
  textLink: {
    textDecoration: 'none',
    color: theme.palette.primary.main,
    '&:hover': {
      color: theme.palette.primary?.dark,
    },
    '&:active': {
      color: theme.palette.primary.dark,
    },
  },
}));

export default function BasicInfo({
  courseId,
  classId,
  peerReviewId,
}: {
  courseId: string;
  classId: string;
  peerReviewId: string;
}) {
  const classNames = useStyles();
  const { peerReview } = usePeerReview(Number(peerReviewId));
  const { problem } = useProblem(peerReview?.target_problem_id);
  const { challenge } = useChallenge(problem?.challenge_id);

  return peerReview && challenge && problem ? (
    <SimpleBar title="Peer Review Information">
      <>
        <AlignedText text="Task to be Reviewed" childrenType="text">
          <Typography variant="body1">
            <Link
              to={`/my-class/${courseId}/${classId}/challenge/${problem?.challenge_id}/${peerReview.target_problem_id}`}
              className={classNames.textLink}
            >
              {`${challenge.title} / ${problem.challenge_label}`}
            </Link>
          </Typography>
        </AlignedText>
        <AlignedText text="Max Score" childrenType="text">
          <Typography variant="body1">{peerReview.max_score}</Typography>
        </AlignedText>
        <AlignedText text="Min Score" childrenType="text">
          <Typography variant="body1">{peerReview.min_score}</Typography>
        </AlignedText>
        <AlignedText text="Student is Assigned" childrenType="text">
          <Typography variant="body1">{`${peerReview.max_review_count} ${
            peerReview.max_review_count > 1 ? 'Peers' : 'Peer'
          } Respectively`}</Typography>
        </AlignedText>
      </>
    </SimpleBar>
  ) : null;
}
