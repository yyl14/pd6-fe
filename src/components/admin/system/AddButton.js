import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import { Link, useHistory } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
    },
  },
}));

export default function ContainedButtons() {
  const classes = useStyles();
  const history = useHistory();
  const add = () => {
    history.push('/admin/system/announcement/add');
  };

  return (
    <div className={classes.root}>
      <Button variant="contained" color="primary" onClick={add}>
        Add Announcement
      </Button>
    </div>
  );
}
