import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  makeStyles,
  Button,
  Typography,
  Dialog,
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

  const accounts = useSelector((state) => state.accounts.byId);
  const accountsID = useSelector((state) => state.accounts.allIds);
  const authToken = useSelector((state) => state.auth.token);
  // const error = useSelector((state) => state.admin.account.error);
  const loading = useSelector((state) => state.loading.admin.account);
  const [tableData, setTableData] = useState([]);
  const [path, setPath] = useState([]);

  useEffect(() => {
    if (!loading.editAccount && !loading.deleteAccount && !loading.makeStudentCardDefault) {
      dispatch(fetchAccounts(authToken));
    }
  }, [authToken, dispatch, loading.deleteAccount, loading.editAccount, loading.makeStudentCardDefault]);

  useEffect(() => {
    const newData = [];
    const newPath = [];

    accountsID.forEach((key) => {
      const item = accounts[key];
      const temp = { ...item };
      temp.path = `/admin/account/account/${temp.id}/setting`;
      newData.push(temp);
      newPath.push(`/admin/account/account/${temp.id}/setting`);
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
        searchWidthOption={3}
        searchPlaceholder="Student ID / Real Name / Username"
        data={tableData}
        columns={[
          {
            id: 'username',
            label: 'Username',
            minWidth: 50,
            align: 'center',
            width: 120,
            type: 'link',
            link_id: 'path',
          },
          {
            id: 'student_id',
            label: 'Student ID',
            minWidth: 50,
            align: 'center',
            width: 120,
            type: 'string',
          },
          {
            id: 'real_name',
            label: 'Real Name',
            minWidth: 50,
            align: 'center',
            width: 120,
            type: 'string',
          },
        ]}
        hasLink
        path={path}
      />
    </>
  );
}
