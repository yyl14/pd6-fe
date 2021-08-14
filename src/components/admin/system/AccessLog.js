import React, { useState, useEffect, useCallback } from 'react';
import {
  Typography, makeStyles, Dialog, DialogActions, DialogContent, DialogTitle, Button,
} from '@material-ui/core';
import { useSelector, useDispatch } from 'react-redux';
import { BiFilterAlt } from 'react-icons/bi';
import moment from 'moment';

/* TODO: Use component/ui/CustomTable to implement access log (remove this import afterwards) */
import CustomTable from '../../ui/CustomTable';
import DateRangePicker from '../../ui/DateRangePicker';
import { fetchAccessLog } from '../../../actions/admin/system';

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
  const dispatch = useDispatch();
  const authToken = useSelector((state) => state.auth.token);
  const loading = useSelector((state) => state.loading.admin.system.fetchAccessLog);

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
    const newData = [];
    logsID.forEach((key) => {
      const item = logs[key];
      item.path = `/admin/account/account/${item.account_id}/setting`;
      newData.push(modifyRawData(item));
    });
    setTableData(newData);
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
    dispatch(fetchAccessLog(authToken, 0, 100));
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
      <CustomTable
        hasSearch
        searchWidthOption={3}
        searchPlaceholder="Student ID / Real Name / Username / IP"
        data={tableData}
        columns={[
          {
            id: 'username',
            label: 'Username',
            align: 'center',
            width: 150,
            type: 'link',
            link_id: 'path',
          },
          {
            id: 'student_id',
            label: 'Student ID',
            align: 'center',
            width: 150,
          },
          {
            id: 'real_name',
            label: 'Real Name',
            align: 'center',
            width: 150,
          },
          {
            id: 'ip',
            label: 'IP',
            align: 'center',
            width: 150,
          },
          {
            id: 'resource_path',
            label: 'Resource Path',
            align: 'center',
            width: 150,
          },
          {
            id: 'request_method',
            label: 'Request Method',
            align: 'center',
            width: 200,
          },
          {
            id: 'access_time',
            label: 'Access Time',
            align: 'center',
            width: 300,
          },
        ]}
        columnComponent={[
          null,
          null,
          null,
          null,
          null,
          null,
          <BiFilterAlt key="filter" onClick={() => setFilterOrNot(true)} />,
        ]}
      />
      <Dialog
        open={filterOrNot}
        keepMounted
        onClose={() => setFilterOrNot(false)}
        classes={{ paper: classes.paper }}
      >
        <DialogTitle id="dialog-slide-title">
          <Typography variant="h4">Access time range</Typography>
        </DialogTitle>
        <DialogContent>
          <DateRangePicker value={dateRange} setValue={setDateRange} />
        </DialogContent>
        <DialogActions>
          <Button onClick={clearFilter} color="default">
            Clear
          </Button>
          <div style={{ flex: '0.95 0 0' }} />
          <Button onClick={() => setFilterOrNot(false)} color="default">
            Cancel
          </Button>
          <Button onClick={filter} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
