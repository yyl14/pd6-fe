import React from 'react';
import { Typography } from '@material-ui/core';
import { useParams } from 'react-router-dom';

function PlaceHolder() {
  const { courseId } = useParams();
  if (courseId) {
    return <Typography variant="h3">Select a class...</Typography>;
  }
  return <Typography variant="h3">Select a course...</Typography>;
}

export default PlaceHolder;
