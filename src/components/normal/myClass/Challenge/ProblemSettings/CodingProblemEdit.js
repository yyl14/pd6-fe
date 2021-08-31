import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  Typography,
  Button,
  makeStyles,
  withStyles,
  Dialog,
  DialogTitle,
  DialogActions,
  DialogContent,
  TextField,
  FormControlLabel,
  Switch,
} from '@material-ui/core';
import { useParams } from 'react-router-dom';
import SimpleBar from '../../../../ui/SimpleBar';
import SimpleTable from '../../../../ui/SimpleTable';
import Icon from '../../../../ui/icon/index';

import SampleUploadCard from './SampleUploadCard';
import AssistingDataUploadCard from './AssistingDataUploadCard';
import TestingDataUploadCard from './TestingDataUploadCard';

import {
  editProblemInfo,
  deleteAssistingData,
  editAssistingData,
  addAssistingData,
  deleteTestcase,
  editTestcase,
  uploadTestcaseInput,
  uploadTestcaseOutput,
  addTestcaseWithFile,
} from '../../../../../actions/myClass/problem';

const useStyles = makeStyles(() => ({
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
  clearButton: {
    marginLeft: '24px',
    backgroundColor: '#FFFFFF',
    border: 'solid',
    borderColor: '#DDDDDD',
  },
  filterButton: {
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
export default function CodingProblemEdit({ closeEdit, role = 'NORMAL' }) {
  const { problemId } = useParams();
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

  const [hasChange, setHasChange] = useState(false);

  const [label, setLabel] = useState(problems[problemId] === undefined ? 'error' : problems[problemId].challenge_label);
  const [title, setTitle] = useState(problems[problemId] === undefined ? 'error' : problems[problemId].title);
  const [description, setDescription] = useState(
    problems[problemId] === undefined ? 'error' : problems[problemId].description,
  );
  const [ioDescription, setIoDescription] = useState(
    problems[problemId] === undefined ? 'error' : problems[problemId].io_description,
  );
  const [source, setSource] = useState(problems[problemId] === undefined ? 'error' : problems[problemId].source);
  const [hint, setHint] = useState(problems[problemId] === undefined ? 'error' : problems[problemId].hint);
  const [status, setStatus] = useState(
    problems[problemId] !== undefined && testcaseDataIds.length !== 0
      ? !testcases[testcaseDataIds[0]].is_disabled
      : false,
  );

  const sampleTrans2no = (id) => {
    if (testcases[id].input_filename !== null) {
      return parseInt(testcases[id].input_filename.slice(6, testcases[id].input_filename.indexOf('.')), 10);
    }
    if (testcases[id].output_filename !== null) {
      return parseInt(testcases[id].output_filename.slice(6, testcases[id].output_filename.indexOf('.')), 10);
    }
    return 0;
  };

  const testcaseTrans2no = (id) => {
    if (testcases[id].input_filename !== null) {
      return parseInt(testcases[id].input_filename.slice(0, testcases[id].input_filename.indexOf('.')), 10);
    }
    if (testcases[id].output_filename !== null) {
      return parseInt(testcases[id].output_filename.slice(0, testcases[id].output_filename.indexOf('.')), 10);
    }
    return 0;
  };

  const [sampleTableData, setSampleTableData] = useState(
    sampleDataIds.map((id) => ({
      id: testcases[id].id,
      no: sampleTrans2no(id),
      time_limit: testcases[id].time_limit,
      memory_limit: testcases[id].memory_limit,
      input_filename: testcases[id].input_filename,
      output_filename: testcases[id].output_filename,
      in_file: null,
      out_file: null,
      new: false,
    })),
  );
  const [testcaseTableData, setTestcaseTableData] = useState(
    testcaseDataIds.map((id) => ({
      id: testcases[id].id,
      no: testcaseTrans2no(id),
      time_limit: testcases[id].time_limit,
      memory_limit: testcases[id].memory_limit,
      score: testcases[id].score,
      input_filename: testcases[id].input_filename,
      output_filename: testcases[id].output_filename,
      in_file: null,
      out_file: null,
      new: false,
    })),
  );
  const [assistTableData, setAssistTableData] = useState(
    problems[problemId] !== undefined
      ? problems[problemId].assistingDataIds.map((id) => ({
        id: assistingData[id].filename,
        filename: assistingData[id].filename,
      }))
      : [],
  );

  const [tempSelectedFileS, setTempSelectedFileS] = useState([]);
  const [tempSelectedFileT, setTempSelectedFileT] = useState([]);
  const [tempSelectedFileA, setTempSelectedFileA] = useState([]);
  const [selectedFileA, setSelectedFileA] = useState([]);

  const [samplePopUp, setSamplePopUp] = useState(false);
  const [assistPopUp, setAssistPopUp] = useState(false);
  const [testingPopUp, setTestingPopUp] = useState(false);
  const [warningPopUp, setWarningPopUp] = useState(false);

  const [hasRequest, setHasRequest] = useState(false);
  const [disabled, setDisabled] = useState(false);

  const handleClosePopUp = () => {
    setSamplePopUp(false);
    setAssistPopUp(false);
    setTestingPopUp(false);
  };

  const handleSampleTempUpload = (newSelectedFiles) => {
    // console.log(newSelectedFiles);
    const newTableData = sampleTableData.reduce((acc, data) => {
      const selectedData = newSelectedFiles.filter((file) => data.no === file.no);
      if (selectedData.length === 0) {
        return [...acc, data];
      }
      return [
        ...acc,
        {
          id: data.id,
          no: data.no,
          time_limit: selectedData[0].time_limit,
          memory_limit: selectedData[0].memory_limit,
          input_filename: selectedData[0].in === null ? data.input_filename : selectedData[0].in.name,
          output_filename: selectedData[0].out === null ? data.output_filename : selectedData[0].out.name,
          in_file: selectedData[0].in === null ? data.in_file : selectedData[0].in,
          out_file: selectedData[0].out === null ? data.out_file : selectedData[0].out,
          new: data.new,
        },
      ];
    }, []);

    newSelectedFiles.map((item) => {
      const selectedData = sampleTableData.filter((data) => data.no === item.no);
      if (selectedData.length === 0) {
        newTableData.push({
          id: -item.no,
          no: item.no,
          time_limit: item.time_limit,
          memory_limit: item.memory_limit,
          input_filename: item.in === null ? null : item.in.name,
          output_filename: item.out === null ? null : item.out.name,
          in_file: item.in,
          out_file: item.out,
          new: true,
        });
      }
      return item;
    });
    // console.log(newTableData);
    // setSelectedFileS(tempSelectedFileS);
    setSampleTableData(newTableData);
    setTempSelectedFileS([]);
    setHasChange(true);
  };

  const handleTestingTempUpload = (newSelectedFiles) => {
    const newTableData = testcaseTableData.reduce((acc, data) => {
      const selectedData = newSelectedFiles.filter((file) => data.no === file.no);
      if (selectedData.length === 0) {
        return [...acc, data];
      }
      return [
        ...acc,
        {
          id: data.id,
          no: data.no,
          score: data.score,
          time_limit: selectedData[0].time_limit,
          memory_limit: selectedData[0].memory_limit,
          input_filename: selectedData[0].in === null ? data.input_filename : selectedData[0].in.name,
          output_filename: selectedData[0].out === null ? data.output_filename : selectedData[0].out.name,
          in_file: selectedData[0].in === null ? data.in_file : selectedData[0].in,
          out_file: selectedData[0].out === null ? data.out_file : selectedData[0].out,
          new: data.new,
        },
      ];
    }, []);

    newSelectedFiles.map((item) => {
      const selectedData = testcaseTableData.filter((data) => data.no === item.no);
      if (selectedData.length === 0) {
        newTableData.push({
          id: -item.no,
          no: item.no,
          score: item.score,
          time_limit: item.time_limit,
          memory_limit: item.memory_limit,
          input_filename: item.in === null ? null : item.in.name,
          output_filename: item.out === null ? null : item.out.name,
          in_file: item.in,
          out_file: item.out,
          new: true,
        });
      }
      return item;
    });
    // console.log(newTableData);
    setTestcaseTableData(newTableData);
    // setSelectedFileT(tempSelectedFileT);
    setTempSelectedFileT([]);
    setHasChange(true);
  };

  const handleAssistTempUpload = () => {
    // add file name to table;
    const newData = assistTableData;
    tempSelectedFileA.forEach((file) => {
      let flag = false;
      assistTableData.every((item) => {
        if (item.filename === file.name) {
          flag = true;
          return false;
        }
        return true;
      });
      if (flag === false) {
        newData.push({ id: file.name, filename: file.name });
      }
    });
    setAssistTableData(newData);
    setSelectedFileA(tempSelectedFileA);
    setTempSelectedFileA([]);
    setHasChange(true);
  };

  const handleSave = () => {
    dispatch(
      editProblemInfo(
        authToken,
        problemId,
        title,
        problems[problemId].full_score,
        !status,
        description,
        ioDescription,
        source,
        hint,
      ),
    );

    // handle sample file
    sampleDataIds.map((id) => {
      const data = sampleTableData.filter((item) => item.id === id);
      if (data.length === 0) {
        // delete data
        // console.log(testcases[id].input_filename, ' should be deleted');
        dispatch(deleteTestcase(authToken, id));
      }
      return id;
    });

    sampleTableData.map((data) => {
      if (data.new) {
        // add testcase with file
        // console.log(data.no, ' should be added.');
        dispatch(
          addTestcaseWithFile(
            authToken,
            problemId,
            true,
            0,
            data.time_limit,
            data.memory_limit,
            false,
            data.in_file,
            data.out_file,
          ),
        );
      } else {
        // console.log(data.no, ' is original testcase');
        // check basic info
        const id = sampleDataIds.filter((item) => item === data.id);
        if (
          testcases[id[0]].time_limit !== data.time_limit
          || testcases[id[0]].memory_limit !== data.memory_limit
          || testcases[id[0]].is_disabled !== !status
        ) {
          dispatch(editTestcase(authToken, data.id, true, 0, data.time_limit, data.memory_limit, !status));
        }
        // upload file
        if (data.in_file !== null) {
          dispatch(uploadTestcaseInput(authToken, data.id, data.in_file));
        }
        if (data.out_file !== null) {
          dispatch(uploadTestcaseOutput(authToken, data.id, data.out_file));
        }
      }
      return data;
    });

    // handle testcase file
    testcaseDataIds.map((id) => {
      const data = testcaseTableData.filter((item) => item.id === id);
      if (data.length === 0) {
        // delete data
        // console.log(testcases[id].input_filename, ' should be deleted');
        dispatch(deleteTestcase(authToken, id));
      }
      return id;
    });

    testcaseTableData.map((data) => {
      if (data.new) {
        // add testcase with file
        // console.log(data.no, ' should be added.');
        dispatch(
          addTestcaseWithFile(
            authToken,
            problemId,
            false,
            data.score,
            data.time_limit,
            data.memory_limit,
            !status,
            data.in_file,
            data.out_file,
          ),
        );
      } else {
        // console.log(data.no, ' is original testcase');
        // check basic info
        const id = testcaseDataIds.filter((item) => item === data.id);
        if (
          testcases[id[0]].time_limit !== data.time_limit
          || testcases[id[0]].memory_limit !== data.memory_limit
          || testcases[id[0]].score !== data.score
          || testcases[id[0]].is_disabled !== !status
        ) {
          dispatch(editTestcase(authToken, data.id, false, data.score, data.time_limit, data.memory_limit, !status));
        }
        // upload file
        if (data.in_file !== null) {
          dispatch(uploadTestcaseInput(authToken, data.id, data.in_file));
        }
        if (data.out_file !== null) {
          dispatch(uploadTestcaseOutput(authToken, data.id, data.out_file));
        }
      }
      return data;
    });

    // handle assisting file
    let selectedFileABackUp = [...selectedFileA];
    problems[problemId].assistingDataIds.forEach((id) => {
      let flag = false;
      assistTableData.every((item) => {
        if (assistingData[id].filename === item.filename) {
          // check exist in selectedFile or not
          // if true, then edit and delete in selectedFileA
          selectedFileA.every((file) => {
            if (file.name === assistingData[id].filename) {
              dispatch(editAssistingData(authToken, id, file));
              selectedFileABackUp = selectedFileABackUp.filter((newFile) => !file);
              return false;
            }
            return true;
          });
          flag = true;
          return false;
        }
        return true;
      });
      if (flag === false) {
        dispatch(deleteAssistingData(authToken, id));
      }
    });

    selectedFileABackUp.forEach((file) => {
      dispatch(addAssistingData(authToken, problemId, file));
    });

    setHasRequest(true);
    setDisabled(true);
    // wait for 3 secs because uploading many files waste time
    // setTimeout(() => {
    //   closeEdit();
    // }, 3000);
  };

  const handleCancel = () => {
    if (hasChange) {
      setWarningPopUp(true);
    } else {
      closeEdit();
    }
  };

  useEffect(() => {
    if (
      hasRequest
      && !loading.editProblem
      && !loading.deleteTestcase
      && !loading.deleteAssistingData
      && !loading.editAssistingData
      && !loading.addAssistingData
      && !loading.editTestcase
      && !loading.uploadTestcaseInput
      && !loading.uploadTestcaseOutput
      && !loading.addTestcase
    ) {
      closeEdit();
    }
  }, [
    closeEdit,
    hasRequest,
    loading.addAssistingData,
    loading.addTestcase,
    loading.deleteAssistingData,
    loading.deleteTestcase,
    loading.editAssistingData,
    loading.editProblem,
    loading.editTestcase,
    loading.uploadTestcaseInput,
    loading.uploadTestcaseOutput,
  ]);

  return (
    <>
      <SimpleBar title="Label">
        <TextField
          value={label}
          variant="outlined"
          onChange={(e) => {
            setLabel(e.target.value);
            setHasChange(true);
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
            setHasChange(true);
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
            setHasChange(true);
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
            setHasChange(true);
          }}
          multiline
          minRows={10}
          maxRows={10}
          className={classNames.textfield2}
        />
      </SimpleBar>
      <SimpleBar title="Source">
        <TextField
          value={source}
          variant="outlined"
          onChange={(e) => {
            setSource(e.target.value);
            setHasChange(true);
          }}
          className={classNames.textfield}
        />
      </SimpleBar>
      <SimpleBar title="Hint">
        <TextField
          value={hint}
          variant="outlined"
          onChange={(e) => {
            setHint(e.target.value);
            setHasChange(true);
          }}
          multiline
          minRows={5}
          maxRows={5}
          className={classNames.textfield2}
        />
      </SimpleBar>
      <SimpleBar title="Sample">
        <div className={classNames.loadButtons}>
          <StyledButton
            variant="outlined"
            color="primary"
            startIcon={<Icon.Upload />}
            onClick={() => setSamplePopUp(true)}
          >
            Upload
          </StyledButton>
        </div>
        <SimpleTable
          isEdit
          hasDelete
          columns={[
            {
              id: 'no',
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
          data={sampleTableData}
          setData={setSampleTableData}
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
          <StyledButton
            variant="outlined"
            color="primary"
            startIcon={<Icon.Upload />}
            onClick={() => setTestingPopUp(true)}
          >
            Upload
          </StyledButton>
        </div>
        <SimpleTable
          isEdit
          hasDelete
          columns={[
            {
              id: 'no',
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
          data={testcaseTableData}
          setData={setTestcaseTableData}
        />
      </SimpleBar>
      <SimpleBar title="Assisting Data (Optional)">
        <div className={classNames.loadButtons}>
          <StyledButton
            variant="outlined"
            color="primary"
            startIcon={<Icon.Upload />}
            onClick={() => setAssistPopUp(true)}
          >
            Upload
          </StyledButton>
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
              width: 400,
              type: 'string',
            },
          ]}
          data={assistTableData}
          setData={setAssistTableData}
        />
      </SimpleBar>
      <div className={classNames.buttons}>
        <Button color="default" onClick={handleCancel}>
          Cancel
        </Button>
        <Button disabled={disabled} color="primary" onClick={handleSave}>
          Save
        </Button>
      </div>
      <SampleUploadCard
        popUp={samplePopUp}
        closePopUp={handleClosePopUp}
        selectedFile={tempSelectedFileS}
        setSelectedFile={setTempSelectedFileS}
        handleTempUpload={handleSampleTempUpload}
      />
      <AssistingDataUploadCard
        popUp={assistPopUp}
        closePopUp={handleClosePopUp}
        selectedFile={tempSelectedFileA}
        setSelectedFile={setTempSelectedFileA}
        handleTempUpload={handleAssistTempUpload}
      />
      <TestingDataUploadCard
        popUp={testingPopUp}
        closePopUp={handleClosePopUp}
        selectedFile={tempSelectedFileT}
        setSelectedFile={setTempSelectedFileT}
        handleTempUpload={handleTestingTempUpload}
      />
      <Dialog open={warningPopUp} onClose={() => setWarningPopUp(false)} fullWidth>
        <DialogTitle id="dialog-slide-title">
          <Typography variant="h4">Unsaved Changes</Typography>
        </DialogTitle>
        <DialogContent>
          <Typography variant="body2">
            You have unsaved changes, do you want to save your changes or back to edit?
          </Typography>
        </DialogContent>
        <DialogActions className={classNames.filterButton}>
          <div>
            <Button onClick={() => setWarningPopUp(false)} className={classNames.clearButton}>
              Back to Edit
            </Button>
          </div>
          <div>
            <Button color="default" onClick={() => closeEdit()}>
              Do not Save
            </Button>
            <Button color="primary" onClick={handleSave}>
              Save
            </Button>
          </div>
        </DialogActions>
      </Dialog>
    </>
  );
}
