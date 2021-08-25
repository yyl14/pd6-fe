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
  const loading = useSelector((state) => state.loading.admin.system.fetchAccessLog);
  const authToken = useSelector((state) => state.auth.token);
  const accounts = useSelector((state) => state.accounts);
  const dispatch = useDispatch();

  const logs = useSelector((state) => state.accessLogs.byId);
  const logsID = useSelector((state) => state.accessLogs.allIds);

  const [tableData, setTableData] = useState([]);
  const [filterOrNot, setFilterOrNot] = useState(false);
  const [dateRange, setDateRange] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: 'selection',
    },
  ]);

  const modifyRawData = useCallback((item) => {
    let studentID = item.account_id;
    if (typeof studentID === 'number') {
      studentID = studentID.toString();
    }
    const temp = {
      username: item.username,
      student_id: studentID,
      real_name: item.real_name,
      ip: item.ip,
      resource_path: item.resource_path,
      request_method: item.request_method,
      access_time: moment(item.access_time).format('YYYY-MM-DD, HH:mm'),
      path: item.path,
    };
    return temp;
  }, []);

  const storeAllAccessLog = useCallback(() => {
    setDateRange([
      {
        startDate: new Date(),
        endDate: new Date(),
        key: 'selection',
      },
    ]);
    setTableData(logsID.map((key) => ({
      ...modifyRawData(logs[key]),
      path: `/admin/account/account/${logs[key].account_id}/setting`,
    })));
  }, [logsID, logs, modifyRawData]);

  const filter = () => {
    const newData = [];
    const start = dateRange[0].startDate.getTime();
    const end = dateRange[0].endDate.getTime();
    logsID.forEach((key) => {
      const item = logs[key];
      item.path = `/admin/account/account/${item.account_id}/setting`;
      const accessTime = moment(item.access_time).valueOf();
      if (start <= accessTime && accessTime <= end) {
        newData.push(modifyRawData(item));
      }
    });
    setTableData(newData);
    setFilterOrNot(false);
  };

  const clearFilter = () => {
    storeAllAccessLog();
    setFilterOrNot(false);
  };

  useEffect(() => {
    dispatch(fetchAccessLog(authToken, 0, 30));
  }, [authToken, dispatch]);

  useEffect(() => {
    storeAllAccessLog();
  }, [storeAllAccessLog]);

  if (loading) {
    return <div>loading...</div>;
  }

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
