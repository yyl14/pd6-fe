import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams, Link } from 'react-router-dom';
import {
  Button, Typography,
} from '@material-ui/core';
import SimpleBar from '../../../../ui/SimpleBar';
import AlignedText from '../../../../ui/AlignedText';

export default function Grader(props) {
  return (
    <>
      <SimpleBar title="Grader">
        <AlignedText text="Username" maxWidth="lg" childrenType="text">
          <Typography variant="body1">
            <Link to={props.link}>{props.grader.username}</Link>
          </Typography>
        </AlignedText>
        <AlignedText text="Student ID" maxWidth="lg" childrenType="text">
          <Typography variant="body1">{props.grader.student_id}</Typography>
        </AlignedText>
        <AlignedText text="Real Name" maxWidth="lg" childrenType="text">
          <Typography variant="body1">{props.grader.real_name}</Typography>
        </AlignedText>
      </SimpleBar>
    </>
  );
}
