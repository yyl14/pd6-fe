import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControlLabel,
  Snackbar,
  Switch,
  TextField,
  Typography,
  makeStyles,
} from '@material-ui/core';
import { useEffect, useState } from 'react';

import filterData from '../../../function/filter';
import sortData from '../../../function/sort';
import useReduxStateShape from '../../../hooks/useReduxStateShape';
import useInstitutes from '../../../lib/institute/useInstitutes';
import GeneralLoading from '../../GeneralLoading';
import AlignedText from '../../ui/AlignedText';
import CustomTable from '../../ui/CustomTable';
import PageTitle from '../../ui/PageTitle';
import TableFilterCard from '../../ui/TableFilterCard';
import Icon from '../../ui/icon/index';

const useStyles = makeStyles(() => ({
  dialogTitle: {
    marginBottom: '-18px',
  },
  statusSwitch: {
    marginTop: '22px',
  },
  dialogButtons: {
    marginTop: '13px',
  },
}));

export default function InstituteList() {
  const classes = useStyles();

  const { institutes, addInstitute, isLoading, error } = useInstitutes();
  const [institutesById, institutesIds] = useReduxStateShape(institutes);

  const [transformedData, setTransformedData] = useState([]);
  const [tableData, setTableData] = useState([]);
  const [disabled, setDisabled] = useState(true);
  const [popUp, setPopUp] = useState(false);
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

  const [showSnackbar, setShowSnackbar] = useState(false);

  useEffect(() => {
    if (inputs.fullName !== '' && inputs.initialism !== '' && inputs.email !== '') {
      setDisabled(false);
    } else setDisabled(true);
  }, [inputs.email, inputs.fullName, inputs.initialism]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setInputs((input) => ({ ...input, [name]: value }));
  };

  const handleChangeStatus = (event) => {
    setInputs((input) => ({ ...input, [event.target.name]: event.target.checked }));
  };

  const add = async () => {
    try {
      const res = addInstitute({
        abbreviated_name: inputs.initialism,
        full_name: inputs.fullName,
        email_domain: inputs.email,
        is_disabled: !inputs.status,
      });

      if (!(await res).ok) {
        setPopUp(false);
        setInputs({
          fullName: '',
          initialism: '',
          email: '',
          status: false,
        });
        setShowSnackbar(true);
      }
    } catch {
      setShowSnackbar(false);
    }
  };

  const cancel = () => {
    setPopUp(false);
    setInputs({
      fullName: '',
      initialism: '',
      email: '',
      status: false,
    });
  };

  const filterStatus = (input) => {
    const tempData = filterData(transformedData, 'is_disabled', input.filter);
    const tempData2 = sortData(tempData, 'is_disabled', input.sort);

    setTableData(tempData2);
  };

  useEffect(() => {
    const newData = [];
    if (institutesIds !== undefined) {
      institutesIds.forEach((key) => {
        const item = institutesById[key];
        const temp = { ...item };
        if (item.is_disabled === true || item.is_disabled === 'Disabled') {
          temp.is_disabled = 'Disabled';
        } else if (item.is_disabled === false || item.is_disabled === 'Enabled') {
          temp.is_disabled = 'Enabled';
        }
        temp.path = `/admin/account/institute/${temp.id}/setting`;
        newData.push(temp);
      });
    }
    setTransformedData(newData);
    setTableData(newData);
  }, [institutesById, institutesIds]);

  if (isLoading.browseAll) {
    return <GeneralLoading />;
  }

  return (
    <>
      <PageTitle text="Institute" />
      <CustomTable
        hasSearch={false}
        buttons={
          <>
            <Button color="primary" onClick={() => setPopUp(true)}>
              <Icon.Add />
            </Button>
          </>
        }
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
        linkName="path"
      />
      <Dialog
        open={popUp}
        keepMounted
        onClose={() => setPopUp(false)}
        aria-labelledby="dialog-slide-title"
        aria-describedby="dialog-slide-description"
        fullWidth
        maxWidth="sm"
      >
        <DialogTitle id="dialog-slide-title" className={classes.dialogTitle}>
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
          <AlignedText text="Status">
            <FormControlLabel
              control={<Switch checked={inputs.status} onChange={handleChangeStatus} name="status" color="primary" />}
              label={inputs.status ? 'Enabled' : 'Disabled'}
              className={classes.statusSwitch}
            />
          </AlignedText>
        </DialogContent>
        <DialogActions className={classes.dialogButtons}>
          <Button
            onClick={() => {
              cancel();
            }}
            color="default"
          >
            Cancel
          </Button>
          <Button
            onClick={() => {
              add();
            }}
            color="primary"
            disabled={disabled}
          >
            Add
          </Button>
        </DialogActions>
      </Dialog>
      <Snackbar
        open={showSnackbar}
        autoHideDuration={3000}
        onClose={() => {
          setShowSnackbar(false);
        }}
        message={`Error: ${error.addInstitute}`}
      />
    </>
  );
}
