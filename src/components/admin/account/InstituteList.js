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
import { accountActions } from '../../../actions/index';

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

export default function InstituteList() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { addInstitute, getInstitutes } = bindActionCreators(accountActions, dispatch);

  const institutes = useSelector((state) => state.admin.account.institutes.byId);
  const institutesID = useSelector((state) => state.admin.account.institutes.allIds);
  const authToken = useSelector((state) => state.auth.user.token);

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
    filter: '(None)',
    sort: '(None)',
  });

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
    addInstitute('authToken', inputs.initialism, inputs.fullName, inputs.email, inputs.status);
    console.log('hello');
  };

  const filterStatus = () => {
    const newData = [];
    const newPath = [];

    if (filterInput.filter === 'Disabled') {
      console.log('hello');
      institutesID.forEach((key) => {
        const item = institutes[key];
        if (item.is_disabled === true || item.is_disabled === 'Disabled') {
          item.is_disabled = 'Disabled';
          newData.push(item);
          newPath.push(`institute/${item.id}/setting`);
        }
      });
    } else if (filterInput.filter === 'Enabled') {
      institutesID.forEach((key) => {
        const item = institutes[key];
        if (item.is_disabled === false || item.is_disabled === 'Enabled') {
          item.is_disabled = 'Enabled';
          newData.push(item);
          newPath.push(`institute/${item.id}/setting`);
        }
      });
    } else {
      institutesID.forEach((key) => {
        const item = institutes[key];
        if (item.is_disabled === true) {
          item.is_disabled = 'Disabled';
        } else if (item.is_disabled === false) {
          item.is_disabled = 'Enabled';
        }
        newData.push(item);
        newPath.push(`institute/${item.id}/setting`);
      });
    }

    // sort
    if (filterInput.filter === '(None)' || filterInput.filter === 'Select all') {
      if (filterInput.sort === 'A to Z') {
        newPath.splice(0, newPath.length);
        newData.sort((a, b) => {
          const statusA = a.is_disabled;
          const statusB = b.is_disabled;
          if (statusA > statusB) {
            return -1;
          }
          if (statusA < statusB) {
            return 1;
          }
          return 0;
        });
        newData.forEach((data) => {
          newPath.push(`institute/${data.id}/setting`);
        });
      } else if (filterInput.sort === 'Z to A') {
        newPath.splice(0, newPath.length);
        newData.sort((a, b) => {
          const statusA = a.is_disabled;
          const statusB = b.is_disabled;
          if (statusA < statusB) {
            return -1;
          }
          if (statusA > statusB) {
            return 1;
          }
          return 0;
        });
        newData.forEach((data) => {
          newPath.push(`institute/${data.id}/setting`);
        });
      }
    }

    setTableData(newData);
    setPath(newPath);
  };

  const filterClear = () => {
    setFilterInput({
      filter: '(None)',
      sort: '(None)',
    });
  };

  useEffect(() => {
    const newData = [];
    const newPath = [];

    institutesID.forEach((key) => {
      const item = institutes[key];
      if (item.is_disabled === true) {
        item.is_disabled = 'Disabled';
      } else if (item.is_disabled === false) {
        item.is_disabled = 'Enabled';
      }
      newData.push(item);
      newPath.push(`institute/${item.id}/setting`);
    });
    setTableData(newData);
    setPath(newPath);
  }, [institutes, institutesID]);

  // useEffect(() => {
  //   getInstitutes(authToken);
  // });

  return (
    <>
      <Typography variant="h3" className={classes.pageHeader}>
        Institute
      </Typography>
      <CustomTable
        hasSearch
        searchPlaceholder="Institute/Email"
        buttons={(
          <>
            <Button color="primary" onClick={() => setPopUp(true)}>Add Institute</Button>
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
          },
          {
            id: 'email_domain',
            label: 'Email',
            minWidth: 50,
            align: 'center',
            width: 150,
          },
          {
            id: 'is_disabled',
            label: 'Status',
            minWidth: 50,
            align: 'center',
            width: 120,
          },
        ]}
        columnComponent={[null, null, (<BiFilterAlt key="filter" onClick={() => { setFilter(true); }} />)]}
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
            />
          </AlignedText>
          <AlignedText text="Initialism" childrenType="field">
            <TextField
              id="initialism"
              name="initialism"
              placeholder="e.g. NTU"
              value={inputs.initialism}
              onChange={(e) => handleChange(e)}
            />
          </AlignedText>
          <AlignedText text="Email" childrenType="field">
            <TextField
              id="email"
              name="email"
              placeholder="e.g. ntu.edu.tw"
              value={inputs.email}
              onChange={(e) => handleChange(e)}
            />
          </AlignedText>
          <AlignedText text="Initialism">
            <FormControlLabel
              control={
                <Switch checked={inputs.status} onChange={handleChangeStatus} name="status" color="primary" />
            }
              label={inputs.status ? 'Enabled' : 'Disabled'}
            />
          </AlignedText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setPopUp(false)} color="default">
            Cancel
          </Button>
          <Button onClick={() => { add(); }} color="primary">
            Add
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog
        open={filter}
        keepMounted
        onClose={() => setFilter(false)}
        className={classes.popUpLayout}
        aria-labelledby="dialog-slide-title"
        aria-describedby="dialog-slide-description"
      >
        <DialogTitle id="dialog-slide-title">
          <Typography variant="h4">Filter: Status</Typography>
        </DialogTitle>
        <DialogContent>
          <AlignedText text="Filter by" childrenType="field">
            <FormControl variant="outlined" className={classes.selectField}>
              <Select
                labelId="status"
                id="status"
                value={filterInput.filter}
                onChange={(e) => {
                  setFilterInput((input) => ({ ...input, filter: e.target.value }));
                }}
              >
                <MenuItem value="(None)">(None)</MenuItem>
                <MenuItem value="Select all">Select all</MenuItem>
                <MenuItem value="Enabled">Enabled</MenuItem>
                <MenuItem value="Disabled">Disabled</MenuItem>
              </Select>
            </FormControl>
          </AlignedText>
          <AlignedText text="Sort by">
            <FormControl variant="outlined" className={classes.selectField}>
              <Select
                labelId="sort"
                id="sort"
                value={filterInput.sort}
                onChange={(e) => {
                  setFilterInput((input) => ({ ...input, sort: e.target.value }));
                }}
              >
                <MenuItem value="(None)">(None)</MenuItem>
                <MenuItem value="A to Z">A to Z</MenuItem>
                <MenuItem value="Z to A">Z to A</MenuItem>
              </Select>
            </FormControl>
          </AlignedText>
        </DialogContent>
        <DialogActions className={classes.filterButton}>
          <div>
            <Button onClick={() => filterClear()} className={classes.clearButton}>
              Clear
            </Button>
          </div>
          <div>
            <Button onClick={() => setFilter(false)} color="default">
              Cancel
            </Button>
            <Button onClick={() => { setFilter(false); filterStatus(); }} color="primary">
              Save
            </Button>
          </div>
        </DialogActions>
      </Dialog>
    </>
  );
}
