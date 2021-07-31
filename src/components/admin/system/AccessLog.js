import React from 'react';
import { Typography, Button, makeStyles } from '@material-ui/core';

/* TODO: Use component/ui/CustomTable to implement access log (remove this import afterwards) */
// import CustomTable from './accessLog/CustomTable
import { fetchAccessLog } from '../../../actions/admin/system';

const useStyles = makeStyles((theme) => ({
  pageHeader: {
    marginBottom: '50px',
  },
}));

/* This is a level 4 component (page component) */
export default function AccessLog() {
  const classes = useStyles();
  return (
    <>
      <Typography variant="h3" className={classes.pageHeader}>
        Access Log
      </Typography>
      {/* TODO: Use component/ui/CustomTable to implement access log */}
      <Typography variant="h4">This is Access Log</Typography>
    </>
  );
}
