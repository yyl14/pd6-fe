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
import { BiFilterAlt } from 'react-icons/bi';
import CustomTable from '../../ui/CustomTable';
import AlignedText from '../../ui/AlignedText';
import TableFilterCard from '../../ui/TableFilterCard';
import { getInstitutes, addInstitute } from '../../../actions/admin/account';
import filterData from '../../../function/filter';
import sortData from '../../../function/sort';

const useStyles = makeStyles((theme) => ({
  pageHeader: {
    marginBottom: '50px',
  },
  popUpLayout: {
    width: '100%',
  },
  // inputField: {
  //   width: 340,
  // },
}));

export default function InstituteList() {
  const classes = useStyles();
  const dispatch = useDispatch();

  const institutes = useSelector((state) => state.institutes.byId);
  const institutesID = useSelector((state) => state.institutes.allIds);
  const authToken = useSelector((state) => state.auth.token);
  const pageError = useSelector((state) => state.error.admin.account);
  const loading = useSelector((state) => state.loading.admin.account);

  const [transformedData, setTransformedData] = useState([]);
  const [tableData, setTableData] = useState([]);
  const [path, setPath] = useState([]);

  const [popUp, setPopUp] = useState(false);
  const [error, setError] = useState(false);
  const [errorText, setErrorText] = useState('');
  const [inputs, setInputs] = useState({
    fullName: '',
    initialism: '',
    email: '',
    status: false,
  });

  const [filter, setFilter] = useState(false);
  const [filterInput, setFilterInput] = useState({
    filter: ['Select all'],
    sort: '(None)',
  });

  useEffect(() => {
    if (!loading.addInstitute) {
      dispatch(getInstitutes(authToken));
    }
  }, [authToken, dispatch, loading.addInstitute]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setInputs((input) => ({ ...input, [name]: value }));
    if (name === 'fullName' && value !== '') {
      setError(false);
      setErrorText('');
    }
  };

  const handleChangeStatus = (event) => {
    setInputs((input) => ({ ...input, [event.target.name]: event.target.checked }));
  };

  const add = () => {
    if (inputs.fullName === '') {
      setError(true);
      setErrorText("Can't be empty");
      return;
    }
    setPopUp(false);
    setInputs({
      fullName: '',
      initialism: '',
      email: '',
      status: false,
    });
    dispatch(addInstitute(authToken, inputs.initialism, inputs.fullName, inputs.email, !inputs.status));
  };

  const filterStatus = () => {
    const tempData = filterData(transformedData, 'is_disabled', filterInput.filter);
    const tempData2 = sortData(tempData, 'is_disabled', filterInput.sort);

    const newPath = [];
    tempData2.forEach((data) => {
      newPath.push(data.path);
    });
    setTableData(tempData2);
    setPath(newPath);
  };

  useEffect(() => {
    const newData = [];
    const newPath = [];
    if (institutesID !== undefined) {
      institutesID.forEach((key) => {
        const item = institutes[key];
        const temp = { ...item };
        if (item.is_disabled === true || item.is_disabled === 'Disabled') {
          temp.is_disabled = 'Disabled';
        } else if (item.is_disabled === false || item.is_disabled === 'Enabled') {
          temp.is_disabled = 'Enabled';
        }
        temp.path = `/admin/account/institute/${temp.id}/setting`;
        newData.push(temp);
        newPath.push(temp.path);
      });
    }
    setTransformedData(newData);
    setTableData(newData);
    setPath(newPath);
  }, [institutes, institutesID]);

  if (loading.fetchInstitutes) {
    return <div>loading...</div>;
  }

  return (
    <>
      <Typography variant="h3" className={classes.pageHeader}>
        Institute
      </Typography>
      <CustomTable
        hasSearch
        searchPlaceholder="Institute / Email"
        buttons={(
          <>
            <Button color="primary" onClick={() => setPopUp(true)}>
              Add Institute
            </Button>
          </>
        )}
        data={tableData}
        columns={[
          {
            id: 'full_name',
            label: 'Institute',
            minWidth: 150,
            align: 'center',
            width: 500,
            type: 'string',
          },
          {
            id: 'email_domain',
            label: 'Email',
            minWidth: 50,
            align: 'center',
            width: 150,
            type: 'string',
          },
          {
            id: 'is_disabled',
            label: 'Status',
            minWidth: 50,
            align: 'center',
            width: 120,
            type: 'string',
          },
        ]}
        columnComponent={[
          null,
          null,
          <TableFilterCard
            key="filter"
            popUp={filter}
            setPopUp={setFilter}
            filterInput={filterInput}
            filterOptions={['Enabled', 'Disabled']}
            setFilterInput={setFilterInput}
            doFilter={filterStatus}
          />,
        ]}
        hasLink
        path={path}
      />
      <Dialog
        open={popUp}
        keepMounted
        onClose={() => setPopUp(false)}
        className={classes.popUpLayout}
        aria-labelledby="dialog-slide-title"
        aria-describedby="dialog-slide-description"
        fullWidth
        maxWidth="sm"
      >
        <DialogTitle id="dialog-slide-title">
          <Typography variant="h4">Add Institute</Typography>
        </DialogTitle>
        <DialogContent>
          <AlignedText text="Full Name" childrenType="field">
            <TextField
              id="fullName"
              name="fullName"
              placeholder="e.g. National Taiwan University"
              value={inputs.fullName}
              onChange={(e) => handleChange(e)}
              error={error}
              helperText={errorText}
              className={classes.inputField}
            />
          </AlignedText>
          <AlignedText text="Initialism" childrenType="field">
            <TextField
              id="initialism"
              name="initialism"
              placeholder="e.g. NTU"
              value={inputs.initialism}
              onChange={(e) => handleChange(e)}
              className={classes.inputField}
            />
          </AlignedText>
          <AlignedText text="Email" childrenType="field">
            <TextField
              id="email"
              name="email"
              placeholder="e.g. ntu.edu.tw"
              value={inputs.email}
              onChange={(e) => handleChange(e)}
              className={classes.inputField}
            />
          </AlignedText>
          <AlignedText text="Status">
            <FormControlLabel
              control={<Switch checked={inputs.status} onChange={handleChangeStatus} name="status" color="primary" />}
              label={inputs.status ? 'Enabled' : 'Disabled'}
            />
          </AlignedText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setPopUp(false)} color="default">
            Cancel
          </Button>
          <Button
            onClick={() => {
              add();
            }}
            color="primary"
          >
            Add
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
