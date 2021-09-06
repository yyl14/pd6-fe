import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  makeStyles,
  withStyles,
  Button,
  Typography,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Snackbar,
} from '@material-ui/core';
import { useParams } from 'react-router-dom';
import { MdAdd } from 'react-icons/md';
import AlignedText from '../../../ui/AlignedText';
import CustomTable from '../../../ui/CustomTable';
import FileUploadArea from '../../../ui/FileUploadArea';
import Icon from '../../../ui/icon/index';
import {
  fetchTeams, addTeam, importTeam, downloadTeamFile,
} from '../../../../actions/myClass/team';

import NoMatch from '../../../noMatch';
import GeneralLoading from '../../../GeneralLoading';

const useStyles = makeStyles((theme) => ({
  pageHeader: {
    marginBottom: '50px',
  },
  reminder: {
    color: theme.palette.grey.A400,
    marginLeft: theme.spacing(2),
  },
  templateBtn: {
    marginRight: '115px',
  },
}));

const StyledButton = withStyles({
  outlined: {
    '& path': {
      fill: 'none !important',
    },
  },
})(Button);

/* This is a level 4 component (page component) */
export default function TeamList() {
  const classNames = useStyles();
  const dispatch = useDispatch();
  const { courseId, classId } = useParams();

  const authToken = useSelector((state) => state.auth.token);
  const courses = useSelector((state) => state.courses.byId);
  const classes = useSelector((state) => state.classes.byId);
  const teams = useSelector((state) => state.teams.byId);
  const teamIds = useSelector((state) => state.teams.allIds);
  const loading = useSelector((state) => state.loading.myClass.team);
  const error = useSelector((state) => state.error.myClass.team);

  const user = useSelector((state) => state.user);
  const [isManager, setIsManager] = useState(false);

  const [showImportDialog, setShowImportDialog] = useState(false);
  const [showAddDialog, setShowAddDialog] = useState(false);
  const [disabled, setDisabled] = useState(true);
  const [hasRequest, setHasRequest] = useState(false);
  const [hasError, setHasError] = useState(false);

  const [selectedFile, setSelectedFile] = useState([]);
  const [importInput, setImportInput] = useState('');
  const [addInputs, setAddInputs] = useState({
    label: '',
    teamName: '',
  });

  useEffect(() => {
    user.classes.forEach((item) => {
      if (item.class_id === parseInt(classId, 10)) {
        if (item.role === 'MANAGER') {
          setIsManager(true);
        }
      }
    });
  }, [classId, user.classes]);

  useEffect(() => {
    if (!loading.addTeam && !loading.importTeam) {
      dispatch(fetchTeams(authToken, classId));
    }
  }, [authToken, classId, dispatch, loading.addTeam, loading.importTeam]);

  useEffect(() => {
    if (addInputs.label !== '' && addInputs.teamName !== '') {
      setDisabled(false);
    }
  }, [addInputs.label, addInputs.teamName]);

  useEffect(() => {
    if (importInput !== '' && selectedFile !== []) {
      setDisabled(false);
    }
  }, [importInput, selectedFile]);

  const handleImportChange = (event) => {
    // if (event.target.value === '') {
    //   setDisabled(true);
    //   setImportInput(event.target.value);
    //   return;
    // }
    setImportInput(event.target.value);
  };

  const handleAddChange = (event) => {
    const { name, value } = event.target;
    setAddInputs((input) => ({ ...input, [name]: value }));
  };

  const clearImportInput = () => {
    setImportInput('');
    setSelectedFile([]);
  };

  const clearAddInput = () => {
    setAddInputs({
      label: '',
      teamName: '',
    });
  };

  const submitImport = () => {
    if (importInput !== '' && selectedFile !== []) {
      selectedFile.map((file) => dispatch(importTeam(authToken, classId, file)));
    }
    setHasRequest(true);
  };

  const submitAdd = () => {
    if (addInputs.label !== '' && addInputs.teamName !== '') {
      dispatch(addTeam(authToken, classId, addInputs.teamName, addInputs.label));
    }
    setHasRequest(true);
  };

  useEffect(() => {
    if (hasRequest && showAddDialog && !loading.addTeam) {
      if (error.addTeam === null) {
        clearAddInput();
        setShowAddDialog(false);
        setHasRequest(false);
        setDisabled(true);
      } else {
        setHasError(true);
      }
    } else if (hasRequest && showImportDialog && !loading.importTeam) {
      if (error.importTeam === null) {
        clearImportInput();
        setShowImportDialog(false);
        setHasRequest(false);
        setDisabled(true);
      } else {
        setHasError(true);
      }
    }
  }, [
    error.addTeam,
    error.importTeam,
    hasRequest,
    loading.addTeam,
    loading.importTeam,
    showAddDialog,
    showImportDialog,
  ]);

  const downloadTemplate = () => {
    setShowImportDialog(false);
    dispatch(downloadTeamFile(authToken));
  };

  const handleCloseError = () => {
    setHasError(false);
    setHasRequest(false);
  };

  if (loading.fetchTeams) {
    return <GeneralLoading />;
  }
  if (courses[courseId] === undefined || classes[classId] === undefined) {
    return <NoMatch />;
  }

  return (
    <>
      <Typography variant="h3" className={classNames.pageHeader}>
        {`${courses[courseId].name} ${classes[classId].name} / Team`}
      </Typography>
      <CustomTable
        hasSearch
        buttons={
          isManager && (
            <>
              <Button
                variant="outlined"
                color="primary"
                onClick={() => setShowImportDialog(true)}
                startIcon={<Icon.Folder />}
              >
                Import
              </Button>
              <Button color="primary" onClick={() => setShowAddDialog(true)}>
                <MdAdd />
              </Button>
            </>
          )
        }
        columns={[
          {
            id: 'label',
            label: 'Label',
            minWidth: 50,
            align: 'center',
            width: 150,
            type: 'string',
          },
          {
            id: 'teamName',
            label: 'Team Name',
            minWidth: 50,
            align: 'center',
            width: 150,
            type: 'string',
          },
        ]}
        data={teamIds.map((id) => ({
          id: teams[id].id,
          label: teams[id].label,
          teamName: teams[id].name,
          path: `/my-class/${courseId}/${classId}/team/${id}`,
        }))}
        hasLink
        linkName="path"
      />

      <Dialog open={showImportDialog} onClose={() => setShowImportDialog(false)} fullWidth maxWidth="sm">
        <DialogTitle id="dialog-slide-title">
          <Typography variant="h4">Import Team</Typography>
        </DialogTitle>
        <DialogContent>
          <Typography variant="body2">Team file format:</Typography>
          <Typography variant="body2" className={classNames.reminder}>
            Name: String
          </Typography>
          <Typography variant="body2" className={classNames.reminder}>
            Manager: student id (NTU only) &gt;= institute email &gt; #username
          </Typography>
          <Typography variant="body2" className={classNames.reminder}>
            Member N (N=2~10): Same as Team Manager
          </Typography>
          <Typography variant="body2"> Download template file for more instructions.</Typography>
        </DialogContent>
        <DialogContent>
          <AlignedText text="Class" maxWidth="mg" childrenType="text">
            <Typography variant="body1">{`${courses[courseId].name} ${classes[classId].name}`}</Typography>
          </AlignedText>
          <AlignedText text="Label" maxWidth="mg" childrenType="field">
            <TextField id="title" name="title" value={importInput} onChange={(e) => handleImportChange(e)} />
          </AlignedText>
          <FileUploadArea
            text="Grading File"
            fileAcceptFormat=".csv"
            selectedFile={selectedFile}
            setSelectedFile={setSelectedFile}
          />
        </DialogContent>
        <DialogActions>
          <StyledButton
            className={classNames.templateBtn}
            variant="outlined"
            startIcon={<Icon.Download />}
            onClick={() => {
              downloadTemplate();
            }}
          >
            Template
          </StyledButton>
          <Button
            onClick={() => {
              setShowImportDialog(false);
              setHasRequest(false);
              clearImportInput();
              setDisabled(true);
            }}
            color="default"
          >
            Cancel
          </Button>
          <Button
            onClick={() => {
              submitImport();
              setDisabled(true);
            }}
            color="primary"
            disabled={disabled}
          >
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
      <Snackbar
        severity="error"
        open={showAddDialog && hasError}
        onClose={handleCloseError}
        message={`Error: ${error.addTeam}`}
      />

      <Dialog open={showAddDialog} onClose={() => setShowAddDialog(false)} fullWidth maxWidth="sm">
        <DialogTitle id="dialog-slide-title">
          <Typography variant="h4">Create New Team</Typography>
        </DialogTitle>
        <DialogContent>
          <AlignedText text="Class" maxWidth="lg" childrenType="text">
            <Typography variant="body1">{`${courses[courseId].name} ${classes[classId].name}`}</Typography>
          </AlignedText>
          <AlignedText text="Label" maxWidth="lg" childrenType="field">
            <TextField name="label" value={addInputs.label} onChange={(e) => handleAddChange(e)} />
          </AlignedText>
          <AlignedText text="Team Name" maxWidth="lg" childrenType="field">
            <TextField name="teamName" value={addInputs.teamName} onChange={(e) => handleAddChange(e)} />
          </AlignedText>
        </DialogContent>
        <DialogContent>
          <Typography variant="body2">Visit team page to add team member after creating.</Typography>
        </DialogContent>

        <DialogActions>
          <Button
            onClick={() => {
              setShowAddDialog(false);
              setHasRequest(false);
              clearAddInput();
              setDisabled(true);
            }}
            color="default"
          >
            Cancel
          </Button>
          <Button
            onClick={() => {
              submitAdd();
              setDisabled(true);
            }}
            color="primary"
            disabled={disabled}
          >
            Create
          </Button>
        </DialogActions>
      </Dialog>
      <Snackbar
        severity="error"
        open={showImportDialog && hasError}
        onClose={handleCloseError}
        message={`Error: ${error.importTeam}`}
      />
    </>
  );
}
