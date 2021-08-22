import React, { useState, useEffect, useCallback } from 'react';
import {
  Typography, makeStyles, Dialog, DialogActions, DialogContent, DialogTitle, Button,
} from '@material-ui/core';
import { useSelector, useDispatch } from 'react-redux';
import { BiFilterAlt } from 'react-icons/bi';
import moment from 'moment';

/* TODO: Use component/ui/CustomTable to implement access log (remove this import afterwards) */
import { nanoid } from 'nanoid';
import CustomTable from '../../ui/CustomTable';
import DateRangePicker from '../../ui/DateRangePicker';
import { fetchAccessLog } from '../../../actions/admin/system';
import AutoTable from '../../ui/AutoTable';

const useStyles = makeStyles((theme) => ({
  pageHeader: {
    marginBottom: '50px',
  },
  paper: {
    minWidth: '800px',
    minHeight: '550px',
  },
}));

/* This is a level 4 component (page component) */
export default function AccessLog() {
  const classes = useStyles();
  const authToken = useSelector((state) => state.auth.token);
  const loading = useSelector((state) => state.loading.admin.system.fetchAccessLog);
  const dispatch = useDispatch();
  const logs = useSelector((state) => state.accessLogs);
  const accounts = useSelector((state) => state.accounts);

  return (
    <>
      <Typography variant="h3" className={classes.pageHeader}>
        Access Log
      </Typography>
      <AutoTable
        ident="Access Log Table"
        hasFilter
        filterConfig={[
          {
            reduxStateId: 'access_time',
            label: 'Access Time',
            type: 'DATE',
            operation: 'LIKE',
          },
          {
            reduxStateId: 'request_method',
            label: 'Request Method',
            type: 'ENUM',
            operation: 'IN',
            options: [
              { value: 'GET', label: 'GET' },
              { value: 'POST', label: 'POST' },
              { value: 'PUT', label: 'PUT' },
              { value: 'PATCH', label: 'PATCH' },
              { value: 'DELETE', label: 'DELETE' },
            ],
          },
          {
            reduxStateId: 'resource_path',
            label: 'Resource Path',
            type: 'TEXT',
            operation: 'LIKE',
          },
          {
            reduxStateId: 'ip',
            label: 'IP',
            type: 'TEXT',
            operation: 'LIKE',
          },

          // TODO account id ?
        ]}
        refetch={(browseParams, ident) => {
          dispatch(fetchAccessLog(authToken, browseParams, ident));
        }}
        columns={[
          {
            name: 'Username',
            align: 'center',
            type: 'link',
          },
          {
            name: 'Student ID',
            align: 'center',
            type: 'string',
          },
          {
            name: 'Real Name',
            align: 'center',
            type: 'string',
          },
          {
            name: 'IP',
            align: 'center',
            type: 'string',
          },
          {
            name: 'Resource Path',
            align: 'center',
            type: 'string',
          },
          {
            name: 'Request Method',
            align: 'center',
            type: 'string',
          },
          {
            name: 'Access Time',
            align: 'center',
            type: 'string',
          },
        ]}
        reduxData={logs}
        reduxDataToRows={(item) => ({
          Username: {
            text: accounts.byId[item.account_id] ? accounts.byId[item.account_id].username : '',
            path: `/admin/account/account/${item.account_id}/setting`,
          },
          'Student ID': accounts.byId[item.account_id] ? accounts.byId[item.account_id].student_id : '',
          'Real Name': accounts.byId[item.account_id] ? accounts.byId[item.account_id].real_name : '',
          IP: item.ip,
          'Resource Path': item.resource_path,
          'Request Method': item.request_method,
          'Access Time': moment(item.access_time).format('YYYY-MM-DD, HH:mm:ss'),
        })}
      />
    </>
  );
}
