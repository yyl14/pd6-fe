import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  Typography,
  Button,
  makeStyles,
} from '@material-ui/core';
import { Link } from 'react-router-dom';

import SimpleBar from '../../../../../ui/SimpleBar';
import AlignedText from '../../../../../ui/AlignedText';

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
  const classNames = useStyles();

  const handleClickDelete = () => {
    console.log('delete task');
  };

  return (
    <>
      <SimpleBar title="Title">Peer Review of Hw3 Q1</SimpleBar>
      {role === 'MANAGER' && (
        <SimpleBar title="Description">Description</SimpleBar>
      )}
      <SimpleBar title="Peer Review Information">
        <AlignedText text="Task to be Reviewed" childrenType="text">
          <Typography variant="body1">
            <Link to="/" className={classNames.textLink}>
              <Typography variant="body1">Hw3 / Q1</Typography>
            </Link>
          </Typography>
        </AlignedText>
        <AlignedText text="Max Score" childrenType="text">
          <Typography variant="body1">0</Typography>
        </AlignedText>
        <AlignedText text="Min Score" childrenType="text">
          <Typography variant="body1">0</Typography>
        </AlignedText>
        <AlignedText text="Student is Assigned" childrenType="text">
          <Typography variant="body1">2 Peers Respectively</Typography>
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
