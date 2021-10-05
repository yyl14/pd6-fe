import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  Typography,
  Button,
  makeStyles,
} from '@material-ui/core';
import { useHistory, useParams, Link } from 'react-router-dom';

import SimpleBar from '../../../../../ui/SimpleBar';
import AlignedText from '../../../../../ui/AlignedText';

import { deletePeerReview } from '../../../../../../actions/api/peerReview';
import { readProblemInfo } from '../../../../../../actions/myClass/problem';

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
export default function BasicInfo({ role }) {
  const {
    courseId, classId, challengeId, peerReviewId,
  } = useParams();
  const classNames = useStyles();
  const dispatch = useDispatch();
  const history = useHistory();

  const authToken = useSelector((state) => state.auth.token);
  const peerReviews = useSelector((state) => state.peerReviews.byId);
  const problems = useSelector((state) => state.problem.byId);

  const handleClickDelete = () => {
    console.log('delete task');
    dispatch(deletePeerReview(authToken, peerReviewId));
    history.push(`/my-class/${courseId}/${classId}/challenge/${challengeId}`);
  };

  useEffect(() => {
    dispatch(readProblemInfo(authToken, peerReviews[peerReviewId].target_problem_id));
  }, [authToken, dispatch, peerReviews, peerReviewId]);

  return (
    <>
      <SimpleBar title="Title">{peerReviews[peerReviewId].title}</SimpleBar>
      {role === 'MANAGER' && (
        <SimpleBar title="Description">{peerReviews[peerReviewId].description}</SimpleBar>
      )}
      <SimpleBar title="Peer Review Information">
        <AlignedText text="Task to be Reviewed" childrenType="text">
          <Typography variant="body1">
            <Link to={`/my-class/${courseId}/${classId}/challenge/${challengeId}/${peerReviewId}`} className={classNames.textLink}>
              <Typography variant="body1">{`${peerReviews[peerReviewId].challenge_label} / ${problems[peerReviews[peerReviewId].target_problem_id] && problems[peerReviews[peerReviewId].target_problem_id].title}`}</Typography>
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
          <Typography variant="body1">{`${peerReviews[peerReviewId].max_review_count} ${peerReviews[peerReviewId].max_review_count > 1 ? 'Peers' : 'Peer'} Respectively`}</Typography>
        </AlignedText>
      </SimpleBar>
      {role === 'MANAGER' && (
        <SimpleBar
          title="Delete Task"
          childrenButtons={(
            <>
              <Button color="secondary" onClick={handleClickDelete}>
                Delete
              </Button>
            </>
          )}
        >
          <Typography variant="body1">Once you delete a task, there is no going back. Please be certain.</Typography>
        </SimpleBar>
      )}
    </>
  );
}
