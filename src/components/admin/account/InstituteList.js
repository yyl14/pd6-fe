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
} from '@material-ui/core';
import { useParams } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import CustomTable from '../../ui/CustomTable';
import AlignedText from '../../ui/AlignedText';
import { accountActions } from '../../../actions/index';

const useStyles = makeStyles((theme) => ({
  pageHeader: {
    marginBottom: '50px',
  },
}));

export default function InstituteList() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { addInstitute } = bindActionCreators(accountActions, dispatch);

  const institutes = useSelector((state) => state.admin.account.institutes.byId);
  const institutesID = useSelector((state) => state.admin.account.institutes.allIds);
  const cookies = useSelector((state) => state.cookies);

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

  const handleChange = (event) => {
    const { name, value } = event.target;
    setInputs((input) => ({ ...input, [name]: value }));
  };

  const handleChangeStatus = (event) => {
    setInputs((input) => ({ ...input, [event.target.name]: event.target.checked }));
  };

  const add = () => {
    addInstitute('', inputs.initialism, inputs.fullName, inputs.email, inputs.status);
    console.log('hello');
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

  return (
    <>
      <Typography variant="h3" className={classes.pageHeader}>
        Institute
      </Typography>
      <CustomTable
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
            minWidth: 120,
            align: 'center',
          },
          {
            id: 'email_domain',
            label: 'Email',
            minWidth: 100,
            align: 'center',
          },
          {
            id: 'is_disabled',
            label: 'Status',
            minWidth: 100,
            align: 'center',
          },
        ]}
        hasFilter={[false, false, false]}
        dataColumnName={['full_name', 'email_domain', 'is_disabled']}
        hasLink
        path={path}
      />
      <Dialog
        open={popUp}
        keepMounted
        onClose={() => setPopUp(false)}
        aria-labelledby="dialog-slide-title"
        aria-describedby="dialog-slide-description"
      >
        <DialogTitle id="dialog-slide-title">
          <Typography variant="h4">Add Institute</Typography>
        </DialogTitle>
        <DialogContent>
          <AlignedText text="Full Name">
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
          <AlignedText text="Initialism">
            <TextField
              id="initialism"
              name="initialism"
              placeholder="e.g. NTU"
              value={inputs.initialism}
              onChange={(e) => handleChange(e)}
            />
          </AlignedText>
          <AlignedText text="Email">
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
          <Button onClick={() => setPopUp(false)} color="disabled">
            Cancel
          </Button>
          <Button onClick={() => { setPopUp(false); add(); }} color="primary">
            Add
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
