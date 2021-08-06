import React, { useState, useEffect } from 'react';
import { Typography, makeStyles } from '@material-ui/core';
import { useSelector, useDispatch } from 'react-redux';

/* TODO: Use component/ui/CustomTable to implement access log (remove this import afterwards) */
import CustomTable from '../../ui/CustomTable';
import { fetchAccessLog, fetchAccounts } from '../../../actions/admin/system';

const useStyles = makeStyles((theme) => ({
  pageHeader: {
    marginBottom: '50px',
  },
  popUpLayout: {
    width: '100%',
  },
  selectField: {
    minWidth: 300,
  },
  filterButton: {
    justifyContent: 'space-between',
  },
  clearButton: {
    backgroundColor: '#FFFFFF',
    border: 'solid',
    borderColor: '#DDDDDD',
  },
}));

/* This is a level 4 component (page component) */
export default function AccessLog() {
  const classes = useStyles();
  const [tableData, setTableData] = useState([]);

  const dispatch = useDispatch();
  const authToken = useSelector((state) => state.auth.user.token);
  const loading = useSelector((state) => state.admin.system.loading.fetchAccessLog);

  const logs = useSelector((state) => state.admin.system.logs.byId);
  const logsID = useSelector((state) => state.admin.system.logs.allIds);

  const accounts = useSelector((state) => state.admin.system.accounts.byId);
  const [accountsId, setAccountsId] = useState([]);
  const [path, setPath] = useState([]);

  useEffect(() => {
    if (Object.keys(logsID).length === 0) {
      dispatch(fetchAccessLog(authToken, 0, 10));
      console.log('call fetchAccessLog');
    } else {
      console.log('logsID : ', logsID);
      console.log('logs : ', logs);

      const newAccountsId = logsID.map((logID) => (logs[logID].account_id));

      setAccountsId(newAccountsId);
    }
  }, [logsID, logs, authToken, dispatch]);

  useEffect(() => {
    if (accountsId.length !== 0) {
      if (Object.keys(accounts).length === 0) {
        dispatch(fetchAccounts(authToken, accountsId));
        console.log('call fetchAccounts');
      } else {
        console.log('accounts : ', accounts);
        const newData = logsID.map((logID) => {
          const log = logs[logID];
          return ({
            id: log.id,
            username: accounts[log.account_id].username,
            studentID: log.account_id,
            realName: accounts[log.account_id].real_name,
            IP: log.ip,
            resourcePath: log.resource_path,
            requestMethod: log.request_method,
            accessTime: log.access_time,
          });
        });
        setTableData(newData);
        const newPath = [];

        accountsId.forEach((key) => {
          const item = accounts[key];
          newPath.push(`account/${item.id}/setting`);
        });
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
            width: '130px',
          },
          {
            id: 'studentID',
            label: 'Student ID',
            align: 'center',
            width: '150px',
          },
          {
            id: 'realName',
            label: 'Real Name',
            align: 'center',
            width: '150px',
          },
          {
            id: 'IP',
            label: 'IP',
            align: 'center',
            width: '150px',
          },
          {
            id: 'resourcePath',
            label: 'Resource Path',
            align: 'center',
            width: '150px',
          },
          {
            id: 'requestMethod',
            label: 'Request Method',
            align: 'center',
            width: '200px',
          },
          {
            id: 'accessTime',
            label: 'Access Time',
            align: 'center',
            width: '200px',
          },
        ]}
      />
    </>
  );
}
