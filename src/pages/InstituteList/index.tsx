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

import AlignedText from '@/components/AlignedText';
import CustomTable from '@/components/CustomTable';
import GeneralLoading from '@/components/GeneralLoading';
import PageTitle from '@/components/PageTitle';
import Icon from '@/components/icon/index';
import useInstitutes from '@/lib/institute/useInstitutes';

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

interface TableDataProps {
  id: number;
  abbreviated_name: string;
  full_name: string;
  email_domain: string;
  is_disabled: string;
  path: string;
}

export default function InstituteList() {
  const classes = useStyles();

  const { addInstitute, isLoading, error } = useInstitutes();

  const [tableData, setTableData] = useState<TableDataProps[]>([]);
  const [disabled, setDisabled] = useState(true);
  const [popUp, setPopUp] = useState(false);
  const [inputs, setInputs] = useState({
    fullName: '',
    initialism: '',
    email: '',
    status: false,
  });

  const [showSnackbar, setShowSnackbar] = useState(false);

  useEffect(() => {
    if (inputs.fullName !== '' && inputs.initialism !== '' && inputs.email !== '') {
      setDisabled(false);
    } else setDisabled(true);
  }, [inputs.email, inputs.fullName, inputs.initialism]);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    const { name, value } = e.target;
    setInputs((input) => ({ ...input, [name]: value }));
  };

  const handleChangeStatus = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputs((input) => ({ ...input, [e.target.name]: e.target.checked }));
  };

  const add = async () => {
    try {
      const res = await addInstitute({
        abbreviated_name: inputs.initialism,
        full_name: inputs.fullName,
        email_domain: inputs.email,
        is_disabled: !inputs.status,
      });

      if (!res.ok) {
        setShowSnackbar(true);
      } else {
        setPopUp(false);
        setInputs({
          fullName: '',
          initialism: '',
          email: '',
          status: false,
        });
      }
    } catch {
      setShowSnackbar(true);
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

  const { institutes } = useInstitutes();

  useEffect(() => {
    if (institutes !== undefined) {
      setTableData(
        institutes.map((item) => ({
          id: item.id,
          abbreviated_name: item.abbreviated_name,
          full_name: item.full_name,
          email_domain: item.email_domain,
          path: `/admin/account/institute/${item.id}/setting`,
          is_disabled: item.is_disabled ? 'Disabled' : 'Enabled',
        })),
      );
    }
  }, [institutes]);

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
          <AlignedText text="Status" childrenType="text">
            <FormControlLabel
              control={
                <Switch checked={inputs.status} onChange={(e) => handleChangeStatus(e)} name="status" color="primary" />
              }
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
        message={`Error: ${error.add?.message}`}
      />
    </>
  );
}
