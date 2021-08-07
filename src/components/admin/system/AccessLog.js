import React, { useState, useEffect } from 'react';
import {
  Typography,
  makeStyles,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
} from '@material-ui/core';
import { useSelector, useDispatch } from 'react-redux';
import { BiFilterAlt } from 'react-icons/bi';

/* TODO: Use component/ui/CustomTable to implement access log (remove this import afterwards) */
import CustomTable from '../../ui/CustomTable';
import DateRangePicker from '../../ui/DateRangePicker';
import { fetchAccessLog, fetchAccounts } from '../../../actions/admin/system';

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
  const authToken = useSelector((state) => state.auth.user.token);
  const loading = useSelector((state) => state.admin.system.loading.fetchAccessLog);

  const logs = useSelector((state) => state.admin.system.logs.byId);
  const logsID = useSelector((state) => state.admin.system.logs.allIds);

  const accounts = useSelector((state) => state.admin.system.accounts.byId);
  const [accountsId, setAccountsId] = useState([]);
  const [path, setPath] = useState([]);

  const [tableData, setTableData] = useState([]);
  const [filterOrNot, setFilterOrNot] = useState(false);
  const [dateRange, setDateRange] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: 'selection',
    },
  ]);

  const modifyRawData = (item) => {
    let studentID = item.account_id;
    if (typeof (studentID) === 'number') {
      studentID = studentID.toString();
    }
    const temp = {
      username: accounts[item.account_id].username,
      studentID,
      realName: accounts[item.account_id].real_name,
      IP: item.ip,
      resourcePath: item.resource_path,
      requestMethod: item.request_method,
      accessTime: item.access_time.toISOString().slice(0, 16).replace('T', ' '),
    };
    return temp;
  };

  const filter = () => {
    const newData = [];
    const start = dateRange[0].startDate.getTime();
    const end = dateRange[0].endDate.getTime();
    logsID.forEach((key) => {
      const item = logs[key];
      const accessTime = item.access_time.getTime();
      if (start <= accessTime && accessTime <= end) {
        newData.push(modifyRawData(item));
      }
    });
    setTableData(newData);
    setFilterOrNot(false);
  };

  useEffect(() => {
    if (logsID === null) {
      dispatch(fetchAccessLog(authToken, 0, 100));
      setDateRange([
        {
          startDate: new Date(),
          endDate: new Date(),
          key: 'selection',
        },
      ]);
    } else {
      const newAccountsId = logsID.map((logID) => (logs[logID].account_id));
      setAccountsId(newAccountsId);
    }
  }, [logsID, logs, authToken, dispatch]);

  useEffect(() => {
    if (accountsId.length !== 0) {
      if (accounts === null) {
        dispatch(fetchAccounts(authToken, accountsId));
      } else {
        const newData = [];
        const newPath = [];
        logsID.forEach((key) => {
          const item = logs[key];
          newData.push(modifyRawData(item));
          newPath.push(`account/${item.account_id}/setting`);
        });
        setTableData(newData);
        setPath(newPath);
      }
    }
  }, [accountsId, accounts, logs, logsID, authToken, dispatch]);

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
        searchPlaceholder="Student ID / Real Name / Username / IP"
        data={tableData}
        columns={[
          {
            id: 'username',
            label: 'Username',
            align: 'center',
            width: 150,
          },
          {
            id: 'studentID',
            label: 'Student ID',
            align: 'center',
            width: 150,
          },
          {
            id: 'realName',
            label: 'Real Name',
            align: 'center',
            width: 150,
          },
          {
            id: 'IP',
            label: 'IP',
            align: 'center',
            width: 150,
          },
          {
            id: 'resourcePath',
            label: 'Resource Path',
            align: 'center',
            width: 150,
          },
          {
            id: 'requestMethod',
            label: 'Request Method',
            align: 'center',
            width: 200,
          },
          {
            id: 'accessTime',
            label: 'Access Time',
            align: 'center',
            width: 300,
          },
        ]}
        columnComponent={[null, null, null, null, null, null, (<BiFilterAlt key="filter" onClick={() => setFilterOrNot(true)} />)]}
      />
      <Dialog
        open={filterOrNot}
        keepMounted
        onClose={() => setFilterOrNot(false)}
        aria-labelledby="dialog-slide-title"
        aria-describedby="dialog-slide-description"
        classes={{ paper: classes.paper }}
      >
        <DialogTitle id="dialog-slide-title">
          <Typography variant="h4">Access time range</Typography>
        </DialogTitle>
        <DialogContent>
          <DateRangePicker value={dateRange} setValue={setDateRange} />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setFilterOrNot(false)} color="default">
            Cancel
          </Button>
          <Button onClick={() => { filter(); }} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
