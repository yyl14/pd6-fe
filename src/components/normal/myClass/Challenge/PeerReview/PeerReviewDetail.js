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
// This page is for both normal and manager.
// 依據身分分別給予不同 component 並且依據身分 call 正確的 api
export default function PeerReviewDetail() {
  return (
    <>
      <div>PeerReviewDetail</div>
    </>
  );
}
