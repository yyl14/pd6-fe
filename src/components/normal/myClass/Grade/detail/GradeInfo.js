import React, { useState, useEffect } from 'react';
import {
  Button, Typography,
} from '@material-ui/core';
import { Link } from 'react-router-dom';
import moment from 'moment-timezone';
import SimpleBar from '../../../../ui/SimpleBar';
import AlignedText from '../../../../ui/AlignedText';

export default function BasicInfo(props) {
  return (
    <div>
      <SimpleBar
        title="Grade Information"
        buttons={
          props.isManager && (
          <>
            <Button onClick={() => props.handleEdit()}>Edit</Button>
          </>
          )
        }
      >
        <>
          <AlignedText text="Username" maxWidth="lg" childrenType="text">
            <Typography variant="body1">
              <Link to={props.link}>{props.receiver.username}</Link>
            </Typography>
          </AlignedText>
          <AlignedText text="Student ID" maxWidth="lg" childrenType="text">
            <Typography variant="body1">{props.receiver.student_id}</Typography>
          </AlignedText>
          <AlignedText text="Real Name" maxWidth="lg" childrenType="text">
            <Typography variant="body1">{props.receiver.real_name}</Typography>
          </AlignedText>
          <AlignedText text="Challenge Title" maxWidth="lg" childrenType="text">
            <Typography variant="body1">{props.grade.title}</Typography>
          </AlignedText>
          <AlignedText text="Score" maxWidth="lg" childrenType="text">
            <Typography variant="body1">{props.grade.score}</Typography>
          </AlignedText>
          <AlignedText text="Comment" maxWidth="lg" childrenType="text">
            <Typography variant="body1">{props.grade.comment}</Typography>
          </AlignedText>
          <AlignedText text="Submitted Time" maxWidth="lg" childrenType="text">
            <Typography variant="body1">{moment(props.grade.time).format('YYYY-MM-DD, HH:mm')}</Typography>
          </AlignedText>
        </>
      </SimpleBar>
    </div>
  );
}
