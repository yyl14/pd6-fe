import React, { useEffect, useState } from 'react';
import {
  Button, Card, CardContent, Divider, Grid, Typography, makeStyles,
} from '@material-ui/core';
import StarIcon from '@material-ui/icons/Star';
import { yellow } from '@material-ui/core/colors';
import AlignedText from '../../../ui/AlignedText';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '600px',
  },
  defaultHeader: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: '10px',
  },
  defaultStar: {
    marginRight: '5px',
  },
  cardContent: {
    height: '106px',
    display: 'flex',
    flexDirection: 'column',
    padding: 0,
    '&:last-child': {
      padding: '20px 0px 20px 30px',
    },
  },
  editCardContent: {
    height: '168px',
    display: 'flex',
    flexDirection: 'column',
    padding: 0,
    '&:last-child': {
      padding: '20px 0px 20px 30px',
    },
  },
  defaultButton: {
    alignSelf: 'flex-end',
    marginRight: '23px',
  },
}));

export default function StudentInfoCard(props) {
  const classes = useStyles();
  const disabled = props.isDefault;

  const handleClick = () => {
    props.updateStatus(props.studentId, props.id);
  };

  const transform = (instituteId) => {
    switch (instituteId) {
      case 1:
        return ('National Taiwan University');
      case 2:
        return ('National Taiwan Normal University');
      case 3:
        return ('National Taiwan University of Science and Technology');
      default: return ('National Taiwan University');
    }
  };

  return (
    <div className={classes.root}>
      <div className={classes.defaultHeader}>
        {props.isDefault ? <StarIcon style={{ color: 'ffe81e' }} className={classes.defaultStar} /> : <></>}
        <Typography variant="body1">
          {transform(props.instituteId)}
        </Typography>
      </div>
      <Card variant="outlined">
        {props.editMode ? (
          <CardContent className={classes.editCardContent}>
            <div>
              <AlignedText text="Student ID" childrenType="text">
                <Typography variant="body1">{props.studentId}</Typography>
              </AlignedText>
            </div>
            <div>
              <AlignedText text="Email" childrenType="text">
                <Typography variant="body1">{props.email}</Typography>
              </AlignedText>
            </div>
            <div className={classes.defaultButton}>
              <Button disabled={disabled || props.isNew} onClick={() => { handleClick(); props.setDisabledSave(false); }}>Set as Default</Button>
            </div>
          </CardContent>
        ) : (
          <CardContent className={classes.cardContent}>
            <div>
              <AlignedText text="Student ID" childrenType="text">
                <Typography variant="body1">{props.studentId}</Typography>
              </AlignedText>
            </div>
            <div>
              <AlignedText text="Email" childrenType="text">
                <Typography variant="body1">{props.email}</Typography>
              </AlignedText>
            </div>
          </CardContent>
        )}
      </Card>
    </div>
  );
}
