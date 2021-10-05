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

import { readPeerReview } from '../../../../../actions/api/peerReview';

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
  const userClasses = useSelector((state) => state.user.classes);
  const challenges = useSelector((state) => state.challenges.byId);
  const peerReviews = useSelector((state) => state.peerReviews.byId);
  const loading = useSelector((state) => state.loading.myClass.peerReview);

  const [role, setRole] = useState('Normal');
  const [edit, setEdit] = useState(false);

  const clickViewPeerReview = () => {
    history.push(
      `/my-class/${courseId}/${classId}/challenge/${challengeId}/peer-review/${peerReviewId}/receiver-summary`,
    );
  };

  const clickReceivedPeerReviews = () => {
    console.log('Received Peer Reviews');
    // history.push(`/my-class/${courseId}/${classId}/challenge/${challengeId}/peer-review/${peerReviewId}/receive/:accountId/:recordId`);
  };

  const clickPeerReview = () => {
    console.log('Peer Review');
    // console.log('peerReviews', peerReviews);
    // history.push(`/my-class/${courseId}/${classId}/challenge/${challengeId}/peer-review/${peerReviewId}/review/:accountId/:recordId`);
  };

  useEffect(() => {
    if (userClasses.filter((item) => item.class_id === Number(classId)).length !== 0) {
      setRole(userClasses.filter((item) => item.class_id === Number(classId))[0].role);
    }
  }, [classId, userClasses]);

  useEffect(() => {
    if (!loading.editPeerReview) {
      dispatch(readPeerReview(authToken, peerReviewId));
    }
  }, [authToken, dispatch, loading.editPeerReview, peerReviewId]);

  if (peerReviews[peerReviewId] === undefined) {
    return <NoMatch />;
  }

  return (
    <>
      <PageTitle text={challenges[challengeId] === undefined ? 'error' : `${challenges[challengeId].title} / PR`} />
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
