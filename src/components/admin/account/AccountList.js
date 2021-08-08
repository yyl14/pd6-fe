import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  makeStyles, Button, Typography, Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
  FormControlLabel,
  Switch,
  FormControl,
  Select,
  MenuItem,
} from '@material-ui/core';
import { useParams } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { BiFilterAlt } from 'react-icons/bi';
import CustomTable from '../../ui/CustomTable';
import AlignedText from '../../ui/AlignedText';
import { fetchAccounts } from '../../../actions/admin/account';

const useStyles = makeStyles((theme) => ({
  pageHeader: {
    marginBottom: '50px',
  },
  popUpLayout: {
    width: '100%',
  },
  selectField: {
    minWidth: 210,
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

export default function AccountList() {
  const classes = useStyles();
  const dispatch = useDispatch();

  const accounts = useSelector((state) => state.admin.account.accounts.byId);
  const accountsID = useSelector((state) => state.admin.account.accounts.allIds);
  const authToken = useSelector((state) => state.auth.user.token);
  const error = useSelector((state) => state.admin.account.error);
  const loading = useSelector((state) => state.admin.account.loading);

  const [tableData, setTableData] = useState([]);
  const [path, setPath] = useState([]);

  useEffect(() => {
    dispatch(fetchAccounts(authToken));
  }, [authToken, dispatch]);

  useEffect(() => {
    const newData = [];
    const newPath = [];

    accountsID.forEach((key) => {
      const item = accounts[key];
      newData.push(item);
      newPath.push(`account/${item.id}/setting`);
    });
    setTableData(newData);
    setPath(newPath);
  }, [accounts, accountsID]);

  if (loading.fetchAccounts) {
    return <div>loading...</div>;
  }

  return (
    <>
      <Typography variant="h3" className={classes.pageHeader}>
        Account
      </Typography>
      <CustomTable
        hasSearch
        searchPlaceholder="Student Id / Real Name / Username"
        data={tableData}
        columns={[
          {
            id: 'username',
            label: 'Username',
            minWidth: 50,
            align: 'center',
            width: 120,
          },
          {
            id: 'student_id',
            label: 'Student ID',
            minWidth: 50,
            align: 'center',
            width: 120,
          },
          {
            id: 'real_name',
            label: 'Real Name',
            minWidth: 50,
            align: 'center',
            width: 120,
          },
        ]}
        hasLink
        path={path}
      />
    </>
  );
}
