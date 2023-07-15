import { Typography, makeStyles } from '@material-ui/core';
import { useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';

import AlignedText from '../../../../../ui/AlignedText';
import SimpleBar from '../../../../../ui/SimpleBar';

const useStyles = makeStyles((theme) => ({
  textLink: {
    textDecoration: 'none',
    color: theme.palette.primary.main,
    '&:hover': {
      color: theme.palette.primary.hover,
    },
    '&:active': {
      color: theme.palette.primary.dark,
    },
  },
}));

/* This is a level 4 component (page component) */
// This page is for both normal and manager.
export default function BasicInfo() {
  const { courseId, classId, peerReviewId } = useParams();
  const classNames = useStyles();

  const peerReviews = useSelector((state) => state.peerReviews.byId);
  const problems = useSelector((state) => state.problem.byId);
  const challenges = useSelector((state) => state.challenges.byId);

  return (
    <>
      <SimpleBar title="Peer Review Information">
        <AlignedText text="Task to be Reviewed" childrenType="text">
          <Typography variant="body1">
            <Link
              to={`/my-class/${courseId}/${classId}/challenge/${peerReviews[peerReviewId].target_challenge_id}/${peerReviews[peerReviewId].target_problem_id}`}
              className={classNames.textLink}
            >
              {`${
                peerReviews[peerReviewId].target_challenge_id &&
                challenges[peerReviews[peerReviewId].target_challenge_id] &&
                challenges[peerReviews[peerReviewId].target_challenge_id].title
              } / ${
                peerReviews[peerReviewId] &&
                problems[peerReviews[peerReviewId].target_problem_id] &&
                problems[peerReviews[peerReviewId].target_problem_id] !== undefined &&
                problems[peerReviews[peerReviewId].target_problem_id].challenge_label
              }`}
            </Link>
          </Typography>
        </AlignedText>
        <AlignedText text="Max Score" childrenType="text">
          <Typography variant="body1">{peerReviews[peerReviewId].max_score}</Typography>
        </AlignedText>
        <AlignedText text="Min Score" childrenType="text">
          <Typography variant="body1">{peerReviews[peerReviewId].min_score}</Typography>
        </AlignedText>
        <AlignedText text="Student is Assigned" childrenType="text">
          <Typography variant="body1">{`${peerReviews[peerReviewId].max_review_count} ${
            peerReviews[peerReviewId].max_review_count > 1 ? 'Peers' : 'Peer'
          } Respectively`}</Typography>
        </AlignedText>
      </SimpleBar>
    </>
  );
}
