import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  Typography,
  Button,
  makeStyles,
} from '@material-ui/core';
import { useParams, Link } from 'react-router-dom';

import NoMatch from '../../../../noMatch';
import GeneralLoading from '../../../../GeneralLoading';

const useStyles = makeStyles(() => ({
}));

/* This is a level 4 component (page component) */
// This page is only for class manager.
export default function GraderSummary() {
  return (
    <>
      <div>PeerReviewGraderSummary</div>
    </>
  );
}
