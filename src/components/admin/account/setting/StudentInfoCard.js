import React from 'react';
import { useSelector } from 'react-redux';
import {
  Button, Card, CardContent, Typography, makeStyles,
} from '@material-ui/core';
import AlignedText from '../../../ui/AlignedText';
import Icon from '../../../ui/icon/index';

const useStyles = makeStyles(() => ({
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
    marginRight: ' 8px',
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
  const institutes = useSelector((state) => state.institutes.byId);
  const institutesId = useSelector((state) => state.institutes.allIds);

  const handleClick = () => {
    props.updateStatus(props.studentId, props.id);
  };

  const transform = (instituteId) => {
    const institute = institutesId.filter((id) => id === instituteId);
    if (institute.length !== 0) {
      return institutes[institute[0]].full_name;
    }
    return 'Unknown Institute';
  };

  return (
    <div className={classes.root}>
      <div className={classes.defaultHeader}>
        {props.isDefault ? <Icon.StarIcon style={{ color: 'ffe81e' }} className={classes.defaultStar} /> : <></>}
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
              <Button disabled={disabled} onClick={() => { handleClick(); props.setChanged(true); }}>Set as Default</Button>
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
