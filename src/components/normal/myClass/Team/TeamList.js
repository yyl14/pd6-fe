import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  makeStyles,
  Button,
  Typography,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Card,
  CardContent,
  Select,
  MenuItem,
  FormControl,
} from '@material-ui/core';
import { useParams } from 'react-router-dom';
import { MdAdd } from 'react-icons/md';
import moment from 'moment-timezone';
import AlignedText from '../../../ui/AlignedText';
import CustomTable from '../../../ui/CustomTable';
import FileUploadArea from '../../../ui/FileUploadArea';
import Icon from '../../../ui/icon/index';
import {
  fetchTeams, addTeam, importTeam, downloadTeamFile,
} from '../../../../actions/myClass/team';
import { fetchCourse, fetchClass, downloadFile } from '../../../../actions/common/common';

import NoMatch from '../../../noMatch';

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

/* This is a level 4 component (page component) */

// TODO: member edit needs check

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
  const commonLoading = useSelector((state) => state.loading.common);

  const user = useSelector((state) => state.user);
  const [isManager, setIsManager] = useState(false);

  const [tableData, setTableData] = useState([]);
  const [showImportDialog, setShowImportDialog] = useState(false);
  const [showAddDialog, setShowAddDialog] = useState(false);

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

  dispatch(downloadTeamFile(authToken));

  useEffect(() => {
    dispatch(fetchCourse(authToken, courseId));
    dispatch(fetchClass(authToken, classId));
  }, [authToken, classId, courseId, dispatch]);

  useEffect(() => {
    if (!loading.addTeam) {
      dispatch(fetchTeams(authToken, classId));
    }
  }, [authToken, classId, dispatch, loading.addTeam]);

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

  const submitImport = () => {
    setShowImportDialog(false);
    clearImportInput();
    setSelectedFile([]);
    if (importInput !== '' && selectedFile !== []) {
      dispatch(importTeam(authToken, classId, selectedFile));
    }
  };

  const submitAdd = () => {
    if (addInputs.label !== '' && addInputs.teamName !== '') {
      dispatch(addTeam(authToken, classId, addInputs.teamName, addInputs.label));
    }
    setShowAddDialog(false);
    clearAddInput();
  };

  const downloadTemplate = () => {
    setShowImportDialog(false);
    dispatch(downloadFile(authToken, teams.template));
  };

  useEffect(() => {
    setTableData(
      teamIds.map((id) => ({
        label: teams[id].label,
        teamName: teams[id].name,
        path: `/my-class/${courseId}/${classId}/team/${id}`,
        team_path: '/team_path',
      })),
    );
  }, [classId, courseId, teamIds, teams]);

  if (courses[courseId] === undefined || classes[classId] === undefined || teams[classId] === undefined) {
    if (loading.fetchTeams || commonLoading.fetchCourse || commonLoading.fetchClass) {
      return <div>loading...</div>;
    }
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
              <Button variant="outlined" color="primary" onClick={() => setShowImportDialog(true)} startIcon={<Icon.Folder />}>
                Import
              </Button>
              <Button color="primary" onClick={() => setShowAddDialog(true)}>
                <MdAdd />
              </Button>
            </>
          )
        }
        data={tableData}
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
            type: 'link',
            link_id: 'team_path',
          },
        ]}
        hasLink
        linkName="path"
      />

      <Dialog
        open={showImportDialog}
        onClose={() => setShowImportDialog(false)}
        fullWidth
        maxWidth="sm"
      >
        <DialogTitle id="dialog-slide-title">
          <Typography variant="h4">Import Team</Typography>
        </DialogTitle>
        <DialogContent>
          <Typography variant="body2">Team file format:</Typography>
          <Typography variant="body2" className={classNames.reminder}>Name: String</Typography>
          <Typography variant="body2" className={classNames.reminder}>Manager: student id (NTU only) &gt;= institute email &gt; #username</Typography>
          <Typography variant="body2" className={classNames.reminder}>Member N (N=2~10): Same as Team Manager</Typography>
          <Typography variant="body2"> Download template file for more instructions.</Typography>
        </DialogContent>
        <DialogContent>
          <AlignedText text="Class" maxWidth="mg" childrenType="text">
            <Typography variant="body1">{`${courses[courseId].name} ${classes[classId].name}`}</Typography>
          </AlignedText>
          <AlignedText text="Title" maxWidth="mg" childrenType="field">
            <TextField id="title" name="title" value={importInput} onChange={(e) => handleImportChange(e)} />
          </AlignedText>
          <FileUploadArea text="Grading File" fileAcceptFormat=".csv" selectedFile={selectedFile} setSelectedFile={setSelectedFile} />
        </DialogContent>
        <DialogActions>
          <Button className={classNames.templateBtn} variant="outlined" startIcon={<Icon.Download />} onClick={() => { downloadTemplate(); }}>
            Template
          </Button>
          <Button onClick={() => { setShowImportDialog(false); clearImportInput(); }} color="default">
            Cancel
          </Button>
          <Button onClick={() => { submitImport(); }} color="primary">
            Confirm
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog
        open={showAddDialog}
        onClose={() => setShowAddDialog(false)}
        fullWidth
        maxWidth="sm"
      >
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
          <Button onClick={() => { setShowAddDialog(false); clearAddInput(); }} color="default">
            Cancel
          </Button>
          <Button onClick={() => { submitAdd(); }} color="primary">
            Create
          </Button>
        </DialogActions>
      </Dialog>

      {/* <Dialog
        open={showAddDialog}
        keepMounted
        onClose={() => setShowAddDialog(false)}
        className={classNames.popUpLayout}
        fullWidth
        maxWidth="sm"
      >
        <DialogTitle id="dialog-slide-title">
          <Typography variant="h4">Create New Team</Typography>
        </DialogTitle>
        <DialogContent>
          <AlignedText text="Class" maxWidth="lg" childrenType="text">
            <Typography variant="body1">
              {`${courses[courseId].name} ${classes[classId].name}`}
            </Typography>
          </AlignedText>
          <AlignedText text="Label" maxWidth="lg" childrenType="field">
            <TextField name="label" value={addInputs.label} onChange={(e) => handleAddChange(e)} />
          </AlignedText>
          <AlignedText text="Team Name" maxWidth="lg" childrenType="field">
            <TextField name="teamName" value={addInputs.teamName} onChange={(e) => handleAddChange(e)} />
          </AlignedText>
          <AlignedText text="Team Member" />
          <Card variant="outlined">
            <CardContent>
              <AlignedText text="Student" maxWidth="mg" childrenType="field">
                <TextField name="student" placeholder="Student ID / Email / Username" value={addInputs.student} onChange={(e) => handleAddChange(e)} />
              </AlignedText>
              <AlignedText text="Role" maxWidth="mg" childrenType="field">
                <FormControl variant="outlined" className={classNames.select}>
                  <Select name="role" value={addInputs.role} onChange={(e) => handleAddChange(e)}>
                    <MenuItem value="Normal">Normal</MenuItem>
                    <MenuItem value="Manager">Manager</MenuItem>
                  </Select>
                </FormControl>
              </AlignedText>
              <Button className={classNames.addTeamBtn} variant="text" color="primary" startIcon={<Icon.Newadd />}>
                Add Team Member
              </Button>
            </CardContent>
          </Card>
        </DialogContent>

        <DialogActions>
          <Button onClick={() => { setShowAddDialog(false); clearAddInput(); }} color="default">
            Cancel
          </Button>
          <Button onClick={() => { submitAdd(); }} color="primary">
            Create
          </Button>
        </DialogActions>
      </Dialog> */}
    </>
  );
}
