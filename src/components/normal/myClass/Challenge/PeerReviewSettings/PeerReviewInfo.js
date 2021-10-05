import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Button, makeStyles } from '@material-ui/core';
import { useParams, useHistory } from 'react-router-dom';

import BasicInfo from './Element/BasicInfo';
import Overview from './Element/Overview';
import NoMatch from '../../../../noMatch';
import GeneralLoading from '../../../../GeneralLoading';
import PeerReviewEdit from './PeerReviewEdit';
import PageTitle from '../../../../ui/PageTitle';

import { readProblemInfo } from '../../../../../actions/myClass/problem';
import { fetchChallenge } from '../../../../../actions/common/common';
import { readPeerReview } from '../../../../../actions/api/peerReview';
import {
  browseAccountAllPeerReviewRecordWithReading,
  assignPeerReviewRecordAndPush,
  getTargetProblemChallengeId,
} from '../../../../../actions/myClass/peerReview';

const useStyles = makeStyles(() => ({
  generalButtons: {
    display: 'flex',
    justifyContent: 'flex-end',
  },
  managerButtons: {
    display: 'flex',
    justifyContent: 'flex-start',
  },
}));

// http://localhost:3000/my-class/1/1/challenge/1/peer-review/1

/* This is a level 4 component (page component) */
// This page is for both normal and manager.
// Render different component according to role and call correct api (PeerReviewEdit, BasicInfo, Overview)
export default function PeerReviewInfo() {
  const {
    courseId, classId, challengeId, peerReviewId,
  } = useParams();
  const classNames = useStyles();
  const dispatch = useDispatch();
  const history = useHistory();

  const authToken = useSelector((state) => state.auth.token);
  const accountId = useSelector((state) => state.user.id);
  const userClasses = useSelector((state) => state.user.classes);
  const challenges = useSelector((state) => state.challenges.byId);
  const peerReviews = useSelector((state) => state.peerReviews.byId);
  const peerReviewRecords = useSelector((state) => state.peerReviewRecords);
  const apiLoading = useSelector((state) => state.loading.api.peerReview);
  const problemLoading = useSelector((state) => state.loading.myClass.problem);
  const challengeLoading = useSelector((state) => state.loading.common);

  const [role, setRole] = useState('Normal');
  const [edit, setEdit] = useState(false);

  const clickViewPeerReview = () => {
    history.push(
      `/my-class/${courseId}/${classId}/challenge/${challengeId}/peer-review/${peerReviewId}/receiver-summary`,
    );
  };

  const clickReceivedPeerReviews = () => {
    const receivedPeerReviewRecordIds = peerReviewRecords.allIds.filter((id) => {
      if (peerReviewRecords.byId[id].receiver_id === accountId) {
        return true;
      }
      return false;
    });
    const targetRecordId = receivedPeerReviewRecordIds[0];
    history.push(
      `/my-class/${courseId}/${classId}/challenge/${challengeId}/peer-review/${peerReviewId}/receive/${accountId}/${targetRecordId}`,
    );
  };

  const clickPeerReview = () => {
    const reviewPeerReviewRecordIds = peerReviewRecords.allIds.filter((id) => {
      if (peerReviewRecords.byId[id].grader_id === accountId) {
        return true;
      }
      return false;
    });
    if (reviewPeerReviewRecordIds.length === 0) {
      dispatch(
        assignPeerReviewRecordAndPush(authToken, courseId, classId, challengeId, peerReviewId, accountId, history),
      );
    } else {
      const targetRecordId = reviewPeerReviewRecordIds[0];
      history.push(
        `/my-class/${courseId}/${classId}/challenge/${challengeId}/peer-review/${peerReviewId}/review/${accountId}/${targetRecordId}`,
      );
    }
  };

  useEffect(() => {
    if (userClasses.filter((item) => item.class_id === Number(classId)).length !== 0) {
      setRole(userClasses.filter((item) => item.class_id === Number(classId))[0].role);
    }
  }, [classId, userClasses]);

  useEffect(() => {
    if (!apiLoading.editPeerReview) {
      dispatch(readPeerReview(authToken, peerReviewId));
    }
  }, [authToken, dispatch, apiLoading.editPeerReview, peerReviewId]);

  useEffect(() => {
    if (!apiLoading.assignPeerReviewRecord) {
      dispatch(browseAccountAllPeerReviewRecordWithReading(authToken, peerReviewId, accountId));
    }
  }, [authToken, dispatch, peerReviewId, accountId, apiLoading.assignPeerReviewRecord]);

  useEffect(() => {
    dispatch(getTargetProblemChallengeId(authToken, peerReviewId, peerReviews[peerReviewId].target_problem_id));
    dispatch(readProblemInfo(authToken, peerReviews[peerReviewId].target_problem_id));
  }, [authToken, dispatch, peerReviews, peerReviewId]);

  useEffect(() => {
    if (peerReviews[peerReviewId].target_challenge_id !== null) {
      fetchChallenge(fetchChallenge(authToken, peerReviews[peerReviewId].target_challenge_id));
    }
  }, [authToken, peerReviews, peerReviewId]);

  if (peerReviews[peerReviewId] === undefined) {
    if (
      apiLoading.editPeerReview
      || apiLoading.assignPeerReviewRecord
      || problemLoading.readProblem
      || challengeLoading.fetchChallenge
    ) {
      return <GeneralLoading />;
    }
    return <NoMatch />;
  }

  return (
    <>
      <PageTitle
        text={`${challenges[challengeId] === undefined ? 'error' : challenges[challengeId].title} / ${
          peerReviews[peerReviewId] === undefined ? 'error' : peerReviews[peerReviewId].challenge_label
        }`}
      />
      {role === 'MANAGER' ? (
        <>
          {!edit && (
            <div className={classNames.managerButtons}>
              <Button onClick={() => setEdit(true)}>Edit</Button>
              <Button onClick={clickViewPeerReview}>View Peer Review</Button>
            </div>
          )}
        </>
      ) : (
        <div className={classNames.generalButtons}>
          <Button variant="outlined" onClick={clickReceivedPeerReviews}>
            Received Peer Reviews
          </Button>
          <Button color="primary" onClick={clickPeerReview}>
            Peer Review
          </Button>
        </div>
      )}
      {edit ? (
        <PeerReviewEdit setEdit={setEdit} />
      ) : (
        <>
          <BasicInfo role={role} />
          {role !== 'MANAGER' && <Overview />}
        </>
      )}
    </>
  );
}
