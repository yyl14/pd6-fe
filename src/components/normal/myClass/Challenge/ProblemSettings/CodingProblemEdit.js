import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  Typography,
  Button,
  makeStyles,
  Dialog,
  DialogTitle,
  DialogActions,
  DialogContent,
  TextField,
  FormControlLabel,
  Switch,
} from '@material-ui/core';
import { useHistory, useParams } from 'react-router-dom';
import SimpleBar from '../../../../ui/SimpleBar';
import SimpleTable from '../../../../ui/SimpleTable';
import Icon from '../../../../ui/icon/index';

import SampleUploadCard from './SampleUploadCard';
import AssistingDataUploadCard from './AssistingDataUploadCard';
import TestingDataUploadCard from './TestingDataUploadCard';
import NoMatch from '../../../../noMatch';

import { editProblemInfo } from '../../../../../actions/myClass/problem';

const useStyles = makeStyles((theme) => ({
  pageHeader: {
    marginBottom: '50px',
  },
  sampleArea: {
    marginTop: '50px',
  },
  buttons: {
    display: 'flex',
    justifyContent: 'flex-end',
  },
  textfield: {
    width: '400px',
  },
  textfield2: {
    width: '60vw',
  },
  loadButtons: {
    width: 'max-content',
  },
  statusSwitch: {
    marginTop: '20px',
  },
}));

/* This is a level 4 component (page component) */
export default function CodingProblemEdit({ closeEdit, role = 'NORMAL' }) {
  const {
    courseId, classId, challengeId, problemId,
  } = useParams();
  const history = useHistory();
  const classNames = useStyles();

  const dispatch = useDispatch();

  const problems = useSelector((state) => state.problem.byId);
  const authToken = useSelector((state) => state.auth.token);

  const assistingData = useSelector((state) => state.assistingData.byId);
  const testcases = useSelector((state) => state.testcases.byId);
  const sampleDataIds = problems[problemId] === undefined ? [] : problems[problemId].testcaseIds.filter((id) => testcases[id].is_sample);
  const testcaseDataIds = problems[problemId] === undefined ? [] : problems[problemId].testcaseIds.filter((id) => !testcases[id].is_sample);
  // const error = useSelector((state) => state.error);
  const loading = useSelector((state) => state.loading.myClass.problem);

  const [label, setLabel] = useState(problems[problemId] === undefined ? 'error' : problems[problemId].challenge_label);
  const [title, setTitle] = useState(problems[problemId] === undefined ? 'error' : problems[problemId].title);
  const [description, setDescription] = useState(problems[problemId] === undefined ? 'error' : problems[problemId].description);
  const [ioDescription, setIoDescription] = useState(problems[problemId] === undefined ? 'error' : problems[problemId].io_description);
  const [status, setStatus] = useState(problems[problemId] !== undefined && testcaseDataIds.length !== 0 ? !testcases[testcaseDataIds[0]].is_disabled : false);

  const [selectedFileS, setSelectedFileS] = useState([]);
  const [selectedFileT, setSelectedFileT] = useState([]);
  const [selectedFileA, setSelectedFileA] = useState([]);

  const [samplePopUp, setSamplePopUp] = useState(false);
  const [assistPopUp, setAssistPopUp] = useState(false);
  const [testingPopUp, setTestingPopUp] = useState(false);

  const handleClosePopUp = () => {
    setSamplePopUp(false);
    setAssistPopUp(false);
    setTestingPopUp(false);
  };

  const handleSave = () => {
    dispatch(editProblemInfo(authToken, problemId, title, problems[problemId].full_score, !status, description, ioDescription, '', ''));
    closeEdit();
  };

  return (
    <>
      <SimpleBar title="Label">
        <TextField
          value={label}
          variant="outlined"
          onChange={(e) => {
            setLabel(e.target.value);
          }}
          className={classNames.textfield}
        />
      </SimpleBar>
      <SimpleBar title="Title">
        <TextField
          value={title}
          variant="outlined"
          onChange={(e) => {
            setTitle(e.target.value);
          }}
          className={classNames.textfield}
        />
      </SimpleBar>
      <SimpleBar title="Description">
        <TextField
          value={description}
          variant="outlined"
          onChange={(e) => {
            setDescription(e.target.value);
          }}
          multiline
          minRows={10}
          maxRows={10}
          className={classNames.textfield2}
        />
      </SimpleBar>
      <SimpleBar title="About Input and Output">
        <TextField
          value={ioDescription}
          variant="outlined"
          onChange={(e) => {
            setIoDescription(e.target.value);
          }}
          multiline
          minRows={10}
          maxRows={10}
          className={classNames.textfield2}
        />
      </SimpleBar>
      <SimpleBar title="Sample">
        <div className={classNames.loadButtons}>
          <Button variant="outlined" color="primary" startIcon={<Icon.Upload />} onClick={() => setSamplePopUp(true)}>Upload</Button>
          <Button variant="outlined" color="inherit" startIcon={<Icon.Download />}>Download All Files</Button>
        </div>
        <SimpleTable
          isEdit
          hasDelete
          columns={[
            {
              id: 'id',
              label: 'No.',
              minWidth: 40,
              align: 'center',
              width: 50,
              type: 'string',
            },
            {
              id: 'time_limit',
              label: 'Max Time(ms)',
              minWidth: 50,
              align: 'center',
              width: 150,
              type: 'string',
              editType: 'input',
            },
            {
              id: 'memory_limit',
              label: 'Max Memory(kb)',
              minWidth: 50,
              align: 'center',
              width: 150,
              type: 'string',
              editType: 'input',
            },
            {
              id: 'input_filename',
              label: 'Input File',
              minWidth: 50,
              align: 'center',
              width: 150,
              type: 'string',
            },
            {
              id: 'output_filename',
              label: 'Output File',
              minWidth: 50,
              align: 'center',
              width: 150,
              type: 'string',
            },
          ]}
          data={
            sampleDataIds.map((id) => ({
              id: testcases[id].id,
              time_limit: testcases[id].time_limit,
              memory_limit: testcases[id].memory_limit,
              input_filename: testcases[id].input_filename,
              output_filename: testcases[id].output_filename,
            }))
          }
        />
      </SimpleBar>
      <SimpleBar
        title="Testing Data"
        buttons={(
          <FormControlLabel
            control={<Switch checked={status} onChange={() => setStatus(!status)} name="status" color="primary" />}
            label={status ? 'Enabled' : 'Disabled'}
            className={classNames.statusSwitch}
          />
        )}
      >
        <div className={classNames.loadButtons}>
          <Button variant="outlined" color="primary" startIcon={<Icon.Upload />} onClick={() => setTestingPopUp(true)}>Upload</Button>
          <Button variant="outlined" color="inherit" startIcon={<Icon.Download />}>Download All Files</Button>
        </div>
        <SimpleTable
          isEdit
          hasDelete
          columns={[
            {
              id: 'id',
              label: 'No.',
              minWidth: 40,
              align: 'center',
              width: 50,
              type: 'string',
            },
            {
              id: 'time_limit',
              label: 'Max Time(ms)',
              minWidth: 50,
              align: 'center',
              width: 150,
              type: 'string',
              editType: 'input',
            },
            {
              id: 'memory_limit',
              label: 'Max Memory(kb)',
              minWidth: 50,
              align: 'center',
              width: 150,
              type: 'string',
              editType: 'input',
            },
            {
              id: 'score',
              label: 'score',
              minWidth: 50,
              align: 'center',
              width: 80,
              type: 'string',
              editType: 'input',
            },
            {
              id: 'input_filename',
              label: 'Input File',
              minWidth: 50,
              align: 'center',
              width: 150,
              type: 'string',
            },
            {
              id: 'output_filename',
              label: 'Output File',
              minWidth: 50,
              align: 'center',
              width: 150,
              type: 'string',
            },
          ]}
          data={
            testcaseDataIds.map((id) => ({
              id: testcases[id].id,
              time_limit: testcases[id].time_limit,
              memory_limit: testcases[id].memory_limit,
              score: testcases[id].score,
              input_filename: testcases[id].input_filename,
              output_filename: testcases[id].output_filename,
            }))
          }
        />
      </SimpleBar>
      <SimpleBar title="Assisting Data (Optional)">
        <div className={classNames.loadButtons}>
          <Button variant="outlined" color="primary" startIcon={<Icon.Upload />} onClick={() => setAssistPopUp(true)}>Upload</Button>
          <Button variant="outlined" color="inherit" startIcon={<Icon.Download />}>Download All Files</Button>
        </div>
        <SimpleTable
          isEdit
          hasDelete
          columns={[
            {
              id: 'filename',
              label: 'File Name',
              minWidth: 40,
              align: 'center',
              width: 200,
              type: 'string',
            },
          ]}
          data={
            problems[problemId] !== undefined
              ? problems[problemId].assistingDataIds.map((id) => ({
                filename: assistingData[id].filename,
              }))
              : []
          }
        />
      </SimpleBar>
      <div className={classNames.buttons}>
        <Button color="default" onClick={() => closeEdit()}>Cancel</Button>
        <Button color="primary" onClick={handleSave}>Save</Button>
      </div>
      <SampleUploadCard popUp={samplePopUp} closePopUp={handleClosePopUp} selectedFile={selectedFileS} setSelectedFile={setSelectedFileS} />
      <AssistingDataUploadCard popUp={assistPopUp} closePopUp={handleClosePopUp} selectedFile={selectedFileA} setSelectedFile={setSelectedFileA} />
      <TestingDataUploadCard popUp={testingPopUp} closePopUp={handleClosePopUp} selectedFile={selectedFileT} setSelectedFile={setSelectedFileT} />
    </>
  );
}
