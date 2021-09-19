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
import AutoTable from '../../../ui/AutoTable';
import FileUploadArea from '../../../ui/FileUploadArea';
import PageTitle from '../../../ui/PageTitle';
import Icon from '../../../ui/icon/index';
import {
  fetchTeams, addTeam, importTeam, downloadTeamFile,
} from '../../../../actions/myClass/team';

import NoMatch from '../../../noMatch';
import GeneralLoading from '../../../GeneralLoading';

const useStyles = makeStyles((theme) => ({
  reminder: {
    color: theme.palette.grey.A700,
    marginLeft: theme.spacing(2),
  },
  importDialogButtons: {
    paddingLeft: '19px',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
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
  const teams = useSelector((state) => state.teams);
  const loading = useSelector((state) => state.loading);
  const error = useSelector((state) => state.error);

  const user = useSelector((state) => state.user);

  const [isManager, setIsManager] = useState(false);

  const [showImportDialog, setShowImportDialog] = useState(false);
  const [showAddDialog, setShowAddDialog] = useState(false);
  const [hasRequest, setHasRequest] = useState(false);
  const [hasError, setHasError] = useState(false);

  const [selectedFile, setSelectedFile] = useState([]);
  const [importInput, setImportInput] = useState('');
  const [addInputs, setAddInputs] = useState({
    label: '',
    teamName: '',
  });

  useEffect(() => {
    if (user.classes) {
      if (user.classes.filter((item) => item.class_id === Number(classId))[0].role === 'MANAGER') setIsManager(true);
    }
  }, [classId, user.classes]);

  const handleImportChange = (event) => {
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

  const addTeamSuccess = () => {
    clearAddInput();
    setShowAddDialog(false);
    setHasRequest(false);
  };

  const importTeamSuccess = () => {
    clearImportInput();
    setShowImportDialog(false);
    setHasRequest(false);
  };

  const submitImport = () => {
    if (importInput !== '' && selectedFile !== []) {
      selectedFile.map((file) => dispatch(importTeam(authToken, classId, importInput, file, importTeamSuccess, () => setHasError(true))));
    }
    setHasRequest(true);
  };

  const submitAdd = () => {
    if (addInputs.label !== '' && addInputs.teamName !== '') {
      dispatch(
        addTeam(authToken, classId, addInputs.teamName, addInputs.label, addTeamSuccess, () => setHasError(true)),
      );
    }
    setHasRequest(true);
  };

  const downloadTemplate = () => {
    setShowImportDialog(false);
    dispatch(downloadTeamFile(authToken));
  };

  const handleCloseError = () => {
    setHasError(false);
    setHasRequest(false);
  };

  if (courses[courseId] === undefined || classes[classId] === undefined) {
    if (loading.common.common.fetchCourse || loading.common.common.fetchClass || loading.myClass.team.fetchTeams) {
      return <GeneralLoading />;
    }
    return <NoMatch />;
  }

  return (
    <>
      <PageTitle text={`${courses[courseId].name} ${classes[classId].name} / Team`} />
      <AutoTable
        ident={`Team list ${classId}`}
        buttons={
          isManager && (
            <>
              <Button variant="outlined" color="primary" onClick={() => setShowAddDialog(true)}>
                <MdAdd />
              </Button>
              <Button color="primary" onClick={() => setShowImportDialog(true)} startIcon={<Icon.Folder />}>
                Import
              </Button>
            </>
          )
        }
        hasFilter
        filterConfig={[
          {
            reduxStateId: 'name',
            label: 'Team Name',
            type: 'TEXT',
            operation: 'LIKE',
          },
          {
            reduxStateId: 'label',
            label: 'Label',
            type: 'TEXT',
            operation: 'LIKE',
          },
        ]}
        refetch={(browseParams, ident) => {
          dispatch(fetchTeams(authToken, classId, browseParams, ident));
        }}
        refetchErrors={[error.myClass.team.fetchTeams]}
        refreshLoadings={[loading.myClass.team.addTeam, loading.myClass.team.importTeam, loading.myClass.team.editTeam]}
        columns={[
          {
            name: 'Team Name',
            align: 'center',
            minWidth: 150,
            width: 200,
            type: 'link',
          },
          {
            name: 'Label',
            align: 'center',
            minWidth: 50,
            width: 180,
            type: 'string',
          },
        ]}
        reduxData={teams}
        reduxDataToRows={(item) => ({
          'Team Name': {
            text: item.name,
            path: `/my-class/${courseId}/${classId}/team/${item.id}`,
          },
          Label: item.label,
          link: `/my-class/${courseId}/${classId}/team/${item.id}`,
        })}
        hasLink
      />
      <Dialog open={showImportDialog} onClose={() => setShowImportDialog(false)} maxWidth="md">
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
          <Typography variant="body2">
            Notice that PDOGS only accept files encoded in
            {' '}
            <b>ASCII / UTF-8</b>
            {' '}
            charset.
          </Typography>
        </DialogContent>
        <DialogContent>
          <AlignedText text="Class" maxWidth="md" childrenType="text">
            <Typography variant="body1">{`${courses[courseId].name} ${classes[classId].name}`}</Typography>
          </AlignedText>
          <AlignedText text="Label" maxWidth="md" childrenType="field">
            <TextField id="title" name="title" value={importInput} onChange={(e) => handleImportChange(e)} />
          </AlignedText>
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
            <Button
              onClick={() => {
                setShowImportDialog(false);
                setHasRequest(false);
                clearImportInput();
              }}
              color="default"
            >
              Cancel
            </Button>
            <Button
              onClick={() => {
                submitImport();
              }}
              color="primary"
              disabled={!(importInput !== '' && Object.keys(selectedFile).length !== 0)}
            >
              Confirm
            </Button>
          </div>
        </DialogActions>
      </Dialog>
      <Snackbar
        open={showAddDialog && hasError}
        onClose={handleCloseError}
        message={`Error: ${error.myClass.team.addTeam}`}
      />

      <Dialog open={showAddDialog} onClose={() => setShowAddDialog(false)} maxWidth="md">
        <DialogTitle id="dialog-slide-title">
          <Typography variant="h4">Create New Team</Typography>
        </DialogTitle>
        <DialogContent>
          <AlignedText text="Class" maxWidth="md" childrenType="text">
            <Typography variant="body1">{`${courses[courseId].name} ${classes[classId].name}`}</Typography>
          </AlignedText>
          <AlignedText text="Label" maxWidth="md" childrenType="field">
            <TextField name="label" value={addInputs.label} onChange={(e) => handleAddChange(e)} />
          </AlignedText>
          <AlignedText text="Team Name" maxWidth="md" childrenType="field">
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
            }}
            color="default"
          >
            Cancel
          </Button>
          <Button
            onClick={() => {
              submitAdd();
            }}
            color="primary"
            disabled={!(addInputs.label !== '' && addInputs.teamName !== '')}
          >
            Create
          </Button>
        </DialogActions>
      </Dialog>
      <Snackbar
        open={showImportDialog && hasError}
        onClose={handleCloseError}
        message={`Error: ${error.myClass.team.importTeam}`}
      />
    </>
  );
}
