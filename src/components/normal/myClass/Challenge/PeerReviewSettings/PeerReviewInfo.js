import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  Button,
  makeStyles,
} from '@material-ui/core';
import { useParams } from 'react-router-dom';

import BasicInfo from './Element/BasicInfo';
import Overview from './Element/Overview';
import NoMatch from '../../../../noMatch';
import GeneralLoading from '../../../../GeneralLoading';
import PeerReviewEdit from './PeerReviewEdit';

import PageTitle from '../../../../ui/PageTitle';

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
  const { classId, challengeId } = useParams();
  const classNames = useStyles();

  const userClasses = useSelector((state) => state.user.classes);
  const challenges = useSelector((state) => state.challenges.byId);

  const [role, setRole] = useState('Normal');
  const [edit, setEdit] = useState(false);

  const handleView = () => {
    console.log('View Peer Review');
  };

  useEffect(() => {
    if (userClasses.filter((item) => item.class_id === Number(classId)).length !== 0) {
      setRole(userClasses.filter((item) => item.class_id === Number(classId))[0].role);
    }
  }, [classId, userClasses]);

  return (
    <>
      <PageTitle text={challenges[challengeId] === undefined ? 'error' : `${challenges[challengeId].title} / PR`} />
      {role === 'MANAGER' ? (
        <>
          {!edit && (
            <div className={classNames.managerButtons}>
              <Button onClick={() => setEdit(true)}>Edit</Button>
              <Button onClick={handleView}>View Peer Review</Button>
            </div>
          )}
        </>
      ) : (
        <div className={classNames.generalButtons}>
          <Button variant="outlined" onClick={handleView}>My Peer Reviews</Button>
          <Button color="primary" onClick={handleView}>Peer Review</Button>
        </div>
      )}
      {edit ? (
        <PeerReviewEdit />
      ) : (
        <>
          <BasicInfo role={role} />
          {role !== 'MANAGER' && (
            <Overview />
          )}
        </>
      )}
    </>
  );
}
