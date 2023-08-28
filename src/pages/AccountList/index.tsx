import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  InputAdornment,
  Snackbar,
  TextField,
  Typography,
  makeStyles,
  withStyles,
} from '@material-ui/core';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import { ChangeEvent, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

// import { addAccount, downloadAccountFile, importAccount } from '@/actions/admin/account';
// import { browseAccountWithDefaultStudentId } from '@/actions/api/view';
import BrowsingTable from '@/components/ui/6a/BrowsingTable';
import FileUploadArea from '@/components/ui/FileUploadArea';
import PageTitle from '@/components/ui/PageTitle';
import Icon from '@/components/ui/icon/index';
import useAccount from '@/lib/account/useAccount';
import useAccountAdmin from '@/lib/account/useAccountAdmin';
import useAccountTemplate from '@/lib/account/useAccountTemplate';
import useViewAccountsWithDefaultStudentId, {
  AccountsWithDefaultStudentIdSchema,
} from '@/lib/view/useViewAccountsWithDefaultStudentId';

const useStyles = makeStyles((theme) => ({
  addDialogGap: {
    marginTop: '60px',
  },
  reminder: {
    color: theme.palette.grey.A700,
    marginLeft: theme.spacing(2),
  },
  importDialogButtons: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingLeft: '19px',
  },
}));

const StyledButton = withStyles({
  outlined: {
    '& path': {
      fill: 'none !important',
    },
  },
})(Button);

export default function AccountList({ accountId }: { accountId: string }) {
  const classNames = useStyles();
  const dispatch = useDispatch();
  const [showAddDialog, setShowAddDialog] = useState(false);
  const [showImportDialog, setShowImportDialog] = useState(false);
  const [addInputs, setAddInputs] = useState({
    realName: '',
    username: '',
    password1: '',
    password2: '',
    altMail: '',
  });
  const [showPassword, setShowPassword] = useState({ pw1: false, pw2: false });
  const [selectedFile, setSelectedFile] = useState([]);
  const [isDisabled, setIsDisabled] = useState(false);
  const [pwError, setPwError] = useState(false);
  const [errorText, setErrorText] = useState('');
  const [showSnackBar, setShowSnackBar] = useState(false);
  const [showSnackBar1, setShowSnackBar1] = useState(false);
  // const { studentCards: browseAccountWithDefaultStudentId } = useAccountStudentCards(Number(accountId));
  const { isLoading: browseAllAccountsIsLoading } = useAccount(Number(accountId));
  const { account: browseAccountWithDefaultStudentId, error: viewError } = useViewAccountsWithDefaultStudentId();
  const { getAccountTemplateFile: downloadAccountFile } = useAccountTemplate();
  const { addNormalAccount: addAccount, importAccount, error } = useAccountAdmin();

  useEffect(() => {
    if (showImportDialog) {
      setIsDisabled(selectedFile.length === 0);
    } else if (showAddDialog) {
      setIsDisabled(
        addInputs.realName === '' ||
          addInputs.username === '' ||
          addInputs.password1 === '' ||
          addInputs.password2 === '',
      );
    }
  }, [
    addInputs.password1,
    addInputs.password2,
    addInputs.realName,
    addInputs.username,
    selectedFile.length,
    showAddDialog,
    showImportDialog,
  ]);

  const handleChange = (event: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    const { name, value } = event.target;
    setAddInputs((input) => ({ ...input, [name]: value }));

    if (name === 'password1') {
      if (value === addInputs.password2) {
        setPwError(false);
        setErrorText('');
      }
    }

    if (name === 'password2') {
      if (value === addInputs.password1) {
        setPwError(false);
        setErrorText('');
      }
    }
  };

  const handleCancel = () => {
    setShowAddDialog(false);
    setShowImportDialog(false);
    setAddInputs({
      realName: '',
      username: '',
      password1: '',
      password2: '',
      altMail: '',
    });
    setShowPassword({ pw1: false, pw2: false });
    setSelectedFile([]);
    setPwError(false);
    setErrorText('');
  };

  const addAccountSuccess = () => {
    setShowAddDialog(false);
    setAddInputs({
      realName: '',
      username: '',
      password1: '',
      password2: '',
      altMail: '',
    });
    setPwError(false);
    setErrorText('');
    setShowPassword({ pw1: false, pw2: false });
  };

  const importAccountSuccess = () => {
    setSelectedFile([]);
    setShowImportDialog(false);
  };

  const handleSubmit = () => {
    if (showImportDialog) {
      // dispatch(importAccount(authToken, selectedFile, importAccountSuccess, () => setShowSnackBar(true)));
      if (selectedFile.length !== 0) {
        try {
          Promise.all(
            selectedFile.map((file) =>
              importAccount({
                file,
              }),
            ),
          );
          dispatch(importAccountSuccess());
        } catch {
          setShowSnackBar(true);
        }
      }
    } else if (showAddDialog) {
      if (addInputs.password1 !== addInputs.password2) {
        setPwError(true);
        setErrorText("Passwords don't match");
        return;
      }
      if (addInputs.username === null) {
        setErrorText("Username can't be empty");
        return;
      }
      try {
        addAccount({
          real_name: addInputs.realName,
          username: addInputs.username,
          password: addInputs.password1,
          nickname: addInputs.password2,
          alternative_email: addInputs.altMail,
        });
        dispatch(addAccountSuccess());
      } catch {
        setShowSnackBar1(true);
      }
    }
  };

  const downloadTemplate = () => {
    dispatch(downloadAccountFile());
    setShowImportDialog(false);
  };

  return (
    <>
      <PageTitle text="Account" />
      <BrowsingTable<
        AccountsWithDefaultStudentIdSchema,
        {
          id: string;
          Username: string;
          'Student ID': string;
          'Real Name': string;
        }
      >
        columnsConfig={[
          {
            name: 'Username',
            width: 200,
            align: 'center',
            type: 'string',
            // sortable: 'username',
          },
          {
            name: 'Student ID',
            width: 200,
            align: 'center',
            type: 'string',
            // sortable: 'student_id',
          },
          {
            name: 'Real Name',
            width: 200,
            align: 'center',
            type: 'string',
            // sortable: 'real_name',
          },
        ]}
        filterConfig={[
          {
            dataColumn: 'username',
            label: 'Username',
            type: 'TEXT',
            operator: 'LIKE',
          },
          {
            dataColumn: 'student_id',
            label: 'Student ID',
            type: 'TEXT',
            operator: 'LIKE',
          },
          {
            dataColumn: 'real_name',
            label: 'Real Name',
            type: 'TEXT',
            operator: 'LIKE',
          },
        ]}
        data={browseAccountWithDefaultStudentId.data?.data}
        dataToRow={({ id, username, real_name, student_id }) => ({
          id: String(id),
          Username: username,
          'Student ID': student_id,
          'Real Name': real_name,
          link: `/admin/account/account/${id}/setting`,
        })}
        isLoading={browseAllAccountsIsLoading.account}
        error={viewError.browse}
        pagination={browseAccountWithDefaultStudentId.pagination}
        filter={browseAccountWithDefaultStudentId.filter}
        sort={browseAccountWithDefaultStudentId.sort}
        buttons={
          <>
            <Button variant="outlined" color="primary" onClick={() => setShowAddDialog(true)}>
              <Icon.Add />
            </Button>
            <Button color="primary" onClick={() => setShowImportDialog(true)} startIcon={<Icon.Folder />}>
              Import
            </Button>
          </>
        }
        hasLink
      />
      <Dialog open={showAddDialog} onClose={() => setShowAddDialog(false)} maxWidth="sm">
        <DialogTitle id="dialog-slide-title">
          <Typography variant="h4">Create Account</Typography>
        </DialogTitle>
        <DialogContent>
          <TextField
            name="realName"
            value={addInputs.realName}
            placeholder="Real Name"
            onChange={(e) => handleChange(e)}
          />
          <TextField
            name="username"
            value={addInputs.username}
            placeholder="Username"
            className={classNames.addDialogGap}
            onChange={(e) => handleChange(e)}
          />
          <TextField
            name="password1"
            value={addInputs.password1}
            placeholder="Password"
            className={classNames.addDialogGap}
            onChange={(e) => handleChange(e)}
            type={showPassword.pw1 ? 'text' : 'password'}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={() => {
                      setShowPassword({ ...showPassword, pw1: !showPassword.pw1 });
                    }}
                    edge="end"
                  >
                    {showPassword.pw1 ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          <TextField
            name="password2"
            value={addInputs.password2}
            placeholder="Confirm Password"
            className={classNames.addDialogGap}
            onChange={(e) => handleChange(e)}
            type={showPassword.pw2 ? 'text' : 'password'}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={() => {
                      setShowPassword({ ...showPassword, pw2: !showPassword.pw2 });
                    }}
                    edge="end"
                  >
                    {showPassword.pw2 ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
            error={pwError}
            helperText={errorText}
          />
          <TextField
            name="altMail"
            value={addInputs.altMail}
            placeholder="Alternative Email"
            className={classNames.addDialogGap}
            onChange={(e) => handleChange(e)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCancel} color="default">
            Cancel
          </Button>
          <Button disabled={isDisabled} onClick={handleSubmit} color="primary">
            Create
          </Button>
        </DialogActions>
      </Dialog>
      <Snackbar
        open={showSnackBar1}
        autoHideDuration={3000}
        onClose={() => {
          setShowSnackBar1(false);
        }}
        message={`Error: ${viewError.browse}`}
      />

      <Dialog open={showImportDialog} onClose={() => setShowImportDialog(false)} maxWidth="md">
        <DialogTitle id="dialog-slide-title">
          <Typography variant="h4">Import Account</Typography>
        </DialogTitle>
        <DialogContent>
          <Typography variant="body2">Account file format:</Typography>
          <Typography variant="body2" className={classNames.reminder}>
            Real Name: String
          </Typography>
          <Typography variant="body2" className={classNames.reminder}>
            Username: String (Not repeatable)
          </Typography>
          <Typography variant="body2" className={classNames.reminder}>
            Password: String
          </Typography>
          <Typography variant="body2" className={classNames.reminder}>
            AlternativeEmail: String
          </Typography>
          <Typography variant="body2" className={classNames.reminder}>
            Nickname: String (Optional)
          </Typography>
          <Typography variant="body2">
            Notice that PDOGS only accept files encoded in <b>ASCII / UTF-8</b> charset.
          </Typography>
        </DialogContent>
        <DialogContent>
          <FileUploadArea
            text="File"
            fileAcceptFormat=".csv"
            selectedFile={selectedFile}
            setSelectedFile={setSelectedFile}
          />
        </DialogContent>
        <DialogActions className={classNames.importDialogButtons}>
          <StyledButton
            variant="outlined"
            startIcon={<Icon.Download />}
            onClick={() => {
              downloadTemplate();
            }}
          >
            Template
          </StyledButton>
          <div>
            <Button onClick={handleCancel} color="default">
              Cancel
            </Button>
            <Button disabled={isDisabled} onClick={handleSubmit} color="primary">
              Confirm
            </Button>
          </div>
        </DialogActions>
      </Dialog>
      <Snackbar
        open={showSnackBar}
        autoHideDuration={3000}
        onClose={() => {
          setShowSnackBar(false);
        }}
        message={`Error: ${error.importAccount}`}
      />
    </>
  );
}
