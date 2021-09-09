import React, { useState, useEffect, useCallback } from 'react';
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
  handleEditSamples,
  handleEditTestcases,
  handleEditAssistingData,
  readProblemInfo,
} from '../../../../../actions/myClass/problem';

const useStyles = makeStyles(() => ({
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
export default function CodingProblemEdit({ closeEdit }) {
  const { problemId } = useParams();
  const classNames = useStyles();

  const dispatch = useDispatch();

  const problems = useSelector((state) => state.problem.byId);
  const authToken = useSelector((state) => state.auth.token);

  const assistingData = useSelector((state) => state.assistingData.byId);
  const testcases = useSelector((state) => state.testcases.byId);
  const [sampleDataIds, setSampleDataIds] = useState([]);
  const [testcaseDataIds, setTestcaseDataIds] = useState([]);
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
  const [status, setStatus] = useState(false);

  const [handleSamplesSuccess, setHandleSamplesSuccess] = useState(false);
  const [handleTestcasesSuccess, setHandleTestcasesSuccess] = useState(false);
  const [handleAssistingDataSuccess, setHandleAssistingDataSuccess] = useState(false);
  const [uploadFailFilename, setUploadFailFilename] = useState([]);
  const [uploadFailCardPopup, setUploadFailCardPopup] = useState(false);

  useEffect(() => {
    if (handleSamplesSuccess && handleTestcasesSuccess && handleAssistingDataSuccess) {
      if (uploadFailFilename.length === 0) {
        dispatch(readProblemInfo(authToken, problemId));
        closeEdit();
      } else {
        setUploadFailCardPopup(true);
      }
    }
  }, [authToken, closeEdit, dispatch, handleAssistingDataSuccess, handleSamplesSuccess, handleTestcasesSuccess, problemId, uploadFailFilename.length]);

  const sampleTransToNumber = useCallback(
    (id) => {
      if (testcases[id].input_filename !== null) {
        return Number(testcases[id].input_filename.slice(6, testcases[id].input_filename.indexOf('.')));
      }
      if (testcases[id].output_filename !== null) {
        return Number(testcases[id].output_filename.slice(6, testcases[id].output_filename.indexOf('.')));
      }
      return 0;
    },
    [testcases],
  );

  const testcaseTransToNumber = useCallback(
    (id) => {
      if (testcases[id].input_filename !== null) {
        return Number(testcases[id].input_filename.slice(0, testcases[id].input_filename.indexOf('.')));
      }
      if (testcases[id].output_filename !== null) {
        return Number(testcases[id].output_filename.slice(0, testcases[id].output_filename.indexOf('.')));
      }
      return 0;
    },
    [testcases],
  );

  const [sampleTableData, setSampleTableData] = useState([]);
  const [testcaseTableData, setTestcaseTableData] = useState([]);

  useEffect(() => {
    if (problems[problemId] && problems[problemId].testcaseIds) {
      const testcasesId = problems[problemId].testcaseIds.filter((id) => !testcases[id].is_sample);
      const samplesId = problems[problemId].testcaseIds.filter((id) => testcases[id].is_sample);
      testcasesId.sort((a, b) => testcaseTransToNumber(a) - testcaseTransToNumber(b));
      samplesId.sort((a, b) => sampleTransToNumber(a) - sampleTransToNumber(b));
      setSampleDataIds(samplesId);
      setTestcaseDataIds(testcasesId);
      if (testcasesId.length === 0) {
        setStatus(false);
      } else {
        setStatus(!testcases[testcasesId[0]].is_disabled);
      }
      // set original table data
      setSampleTableData(samplesId.reduce((acc, id) => ({
        ...acc,
        [id]: {
          id: testcases[id].id,
          no: sampleTransToNumber(id),
          time_limit: testcases[id].time_limit,
          memory_limit: testcases[id].memory_limit,
          score: testcases[id].score,
          input_filename: testcases[id].input_filename,
          output_filename: testcases[id].output_filename,
          in_file: null,
          out_file: null,
          new: false,
        },
      }), {}));
      setTestcaseTableData(testcasesId.reduce((acc, id) => ({
        ...acc,
        [id]: {
          id: testcases[id].id,
          no: testcaseTransToNumber(id),
          time_limit: testcases[id].time_limit,
          memory_limit: testcases[id].memory_limit,
          score: testcases[id].score,
          input_filename: testcases[id].input_filename,
          output_filename: testcases[id].output_filename,
          in_file: null,
          out_file: null,
          new: false,
        },
      }), {}));
    }
  }, [problems, problemId, testcases, sampleTransToNumber, testcaseTransToNumber]);

  const [assistTableData, setAssistTableData] = useState(
    problems[problemId] !== undefined
      ? problems[problemId].assistingDataIds.map((id) => ({
        id: assistingData[id].filename,
        filename: assistingData[id].filename,
      }))
      : [],
  );

  const [cardSelectedFileS, setCardSelectedFileS] = useState({});
  const [cardSelectedFileT, setCardSelectedFileT] = useState({});
  const [cardSelectedFileA, setCardSelectedFileA] = useState([]);
  const [selectedFileA, setSelectedFileA] = useState([]);

  const [samplePopUp, setSamplePopUp] = useState(false);
  const [assistPopUp, setAssistPopUp] = useState(false);
  const [testingPopUp, setTestingPopUp] = useState(false);
  const [warningPopUp, setWarningPopUp] = useState(false);

  const [disabled, setDisabled] = useState(false);

  const handleClosePopUp = () => {
    setSamplePopUp(false);
    setAssistPopUp(false);
    setTestingPopUp(false);
  };

  const handleSetSampleTableData = (tableData) => {
    setSampleTableData(tableData.reduce((acc, item) => ({
      ...acc,
      [item.id]: item,
    }), {}));
  };
  const handleSetTestcaseTableData = (tableData) => {
    setTestcaseTableData(tableData.reduce((acc, item) => ({
      ...acc,
      [item.id]: item,
    }), {}));
  };

  const handleSampleConfirm = (newSelectedFiles) => {
    const newTableData = Object.keys(newSelectedFiles).reduce((acc, item) => {
      if (Object.keys(sampleTableData).filter((key) => sampleTableData[key].no === newSelectedFiles[item].no).length === 0) {
        // this is new case
        return {
          ...acc,
          [item]: {
            id: -item,
            no: newSelectedFiles[item].no,
            time_limit: newSelectedFiles[item].time_limit,
            memory_limit: newSelectedFiles[item].memory_limit,
            input_filename: newSelectedFiles[item].in === null ? null : newSelectedFiles[item].in.name,
            output_filename: newSelectedFiles[item].out === null ? null : newSelectedFiles[item].out.name,
            in_file: newSelectedFiles[item].in,
            out_file: newSelectedFiles[item].out,
            new: true,
          },
        };
      }
      // testcase has been existed
      return {
        ...acc,
        [item]: {
          id: item,
          no: newSelectedFiles[item].no,
          time_limit: newSelectedFiles[item].time_limit,
          memory_limit: newSelectedFiles[item].memory_limit,
          input_filename: newSelectedFiles[item].in === null ? sampleTableData[item].input_filename : newSelectedFiles[item].in.name,
          output_filename: newSelectedFiles[item].out === null ? sampleTableData[item].output_filename : newSelectedFiles[item].out.name,
          in_file: newSelectedFiles[item].in === null ? sampleTableData[item].in_file : newSelectedFiles[item].in,
          out_file: newSelectedFiles[item].out === null ? sampleTableData[item].out_file : newSelectedFiles[item].out,
          new: sampleTableData[item].new,
        },
      };
    }, sampleTableData);
    setSampleTableData(newTableData);
    setCardSelectedFileS({});
    setHasChange(true);
  };

  const handleTestingConfirm = (newSelectedFiles) => {
    const newTableData = Object.keys(newSelectedFiles).reduce((acc, item) => {
      if (Object.keys(testcaseTableData).filter((key) => testcaseTableData[key].no === newSelectedFiles[item].no).length === 0) {
        // this is new case
        return {
          ...acc,
          [item]: {
            id: -item,
            no: newSelectedFiles[item].no,
            score: newSelectedFiles[item].score,
            time_limit: newSelectedFiles[item].time_limit,
            memory_limit: newSelectedFiles[item].memory_limit,
            input_filename: newSelectedFiles[item].in === null ? null : newSelectedFiles[item].in.name,
            output_filename: newSelectedFiles[item].out === null ? null : newSelectedFiles[item].out.name,
            in_file: newSelectedFiles[item].in,
            out_file: newSelectedFiles[item].out,
            new: true,
          },
        };
      }
      // testcase has been existed
      return {
        ...acc,
        [item]: {
          id: item,
          no: newSelectedFiles[item].no,
          score: newSelectedFiles[item].score,
          time_limit: newSelectedFiles[item].time_limit,
          memory_limit: newSelectedFiles[item].memory_limit,
          input_filename: newSelectedFiles[item].in === null ? testcaseTableData[item].input_filename : newSelectedFiles[item].in.name,
          output_filename: newSelectedFiles[item].out === null ? testcaseTableData[item].output_filename : newSelectedFiles[item].out.name,
          in_file: newSelectedFiles[item].in === null ? testcaseTableData[item].in_file : newSelectedFiles[item].in,
          out_file: newSelectedFiles[item].out === null ? testcaseTableData[item].out_file : newSelectedFiles[item].out,
          new: testcaseTableData[item].new,
        },
      };
    }, testcaseTableData);
    setTestcaseTableData(newTableData);
    setCardSelectedFileT({});
    setHasChange(true);
  };

  const handleAssistConfirm = () => {
    // add file name to table;
    const selectedFile = [...selectedFileA];
    const newData = cardSelectedFileA.reduce((acc, file) => {
      if (assistTableData.filter((item) => item.filename === file.name).length === 0) {
        return [...acc, { id: file.name, filename: file.name }];
      }

      const filteredFile = selectedFileA.filter((oriFile) => oriFile.name === file.name);
      if (filteredFile.length === 0) {
        selectedFile.push(file);
      } else {
        const index = selectedFile.indexOf(filteredFile[0]);
        selectedFile.splice(index, 1);
        selectedFile.push(file);
      }
      return acc;
    }, assistTableData);
    setAssistTableData(newData);
    setSelectedFileA(selectedFile);
    setCardSelectedFileA([]);
    setHasChange(true);
  };

  const handleFileUploadFail = (filename) => {
    setUploadFailFilename([...uploadFailFilename, filename]);
  };

  const handleSave = () => {
    dispatch(
      editProblemInfo(
        authToken,
        problemId,
        label,
        title,
        problems[problemId].full_score,
        !status,
        description,
        ioDescription,
        source,
        hint,
      ),
    );

    dispatch(handleEditSamples(authToken, testcases, sampleDataIds, sampleTableData, () => { setHandleSamplesSuccess(true); }, handleFileUploadFail));
    dispatch(handleEditTestcases(authToken, testcases, testcaseDataIds, testcaseTableData, () => { setHandleTestcasesSuccess(true); }, handleFileUploadFail));
    dispatch(handleEditAssistingData(authToken, assistingData, assistTableData, selectedFileA, () => { setHandleAssistingDataSuccess(true); }, handleFileUploadFail));

    // // handle sample file
    // sampleDataIds.map((id) => {
    //   const data = sampleTableData.filter((item) => item.id === id);
    //   if (data.length === 0) {
    //     // delete data
    //     // console.log(testcases[id].input_filename, ' should be deleted');
    //     dispatch(deleteTestcase(authToken, id));
    //   }
    //   return id;
    // });

    // sampleTableData.map((data) => {
    //   if (data.new) {
    //     // add testcase with file
    //     // console.log(data.no, ' should be added.');
    //     dispatch(
    //       addTestcaseWithFile(
    //         authToken,
    //         problemId,
    //         true,
    //         0,
    //         data.time_limit,
    //         data.memory_limit,
    //         false,
    //         data.in_file,
    //         data.out_file,
    //       ),
    //     );
    //   } else {
    //     // console.log(data.no, ' is original testcase');
    //     // check basic info
    //     const id = sampleDataIds.filter((item) => item === data.id);
    //     if (
    //       testcases[id[0]].time_limit !== data.time_limit
    //       || testcases[id[0]].memory_limit !== data.memory_limit
    //       || testcases[id[0]].is_disabled !== !status
    //     ) {
    //       dispatch(editTestcase(authToken, data.id, true, 0, data.time_limit, data.memory_limit, !status));
    //     }
    //     // upload file
    //     if (data.in_file !== null) {
    //       dispatch(uploadTestcaseInput(authToken, data.id, data.in_file));
    //     }
    //     if (data.out_file !== null) {
    //       dispatch(uploadTestcaseOutput(authToken, data.id, data.out_file));
    //     }
    //   }
    //   return data;
    // });

    // // handle testcase file
    // testcaseDataIds.map((id) => {
    //   const data = testcaseTableData.filter((item) => item.id === id);
    //   if (data.length === 0) {
    //     // delete data
    //     // console.log(testcases[id].input_filename, ' should be deleted');
    //     dispatch(deleteTestcase(authToken, id));
    //   }
    //   return id;
    // });

    // testcaseTableData.map((data) => {
    //   if (data.new) {
    //     // add testcase with file
    //     // console.log(data.no, ' should be added.');
    //     dispatch(
    //       addTestcaseWithFile(
    //         authToken,
    //         problemId,
    //         false,
    //         data.score,
    //         data.time_limit,
    //         data.memory_limit,
    //         !status,
    //         data.in_file,
    //         data.out_file,
    //       ),
    //     );
    //   } else {
    //     // console.log(data.no, ' is original testcase');
    //     // check basic info
    //     const id = testcaseDataIds.filter((item) => item === data.id);
    //     if (
    //       testcases[id[0]].time_limit !== data.time_limit
    //       || testcases[id[0]].memory_limit !== data.memory_limit
    //       || testcases[id[0]].score !== data.score
    //       || testcases[id[0]].is_disabled !== !status
    //     ) {
    //       dispatch(editTestcase(authToken, data.id, false, data.score, data.time_limit, data.memory_limit, !status));
    //     }
    //     // upload file
    //     if (data.in_file !== null) {
    //       dispatch(uploadTestcaseInput(authToken, data.id, data.in_file));
    //     }
    //     if (data.out_file !== null) {
    //       dispatch(uploadTestcaseOutput(authToken, data.id, data.out_file));
    //     }
    //   }
    //   return data;
    // });

    // // handle assisting file
    // let selectedFileABackUp = [...selectedFileA];
    // problems[problemId].assistingDataIds.forEach((id) => {
    //   let flag = false;
    //   assistTableData.every((item) => {
    //     if (assistingData[id].filename === item.filename) {
    //       // check exist in selectedFile or not
    //       // if true, then edit and delete in selectedFileA
    //       selectedFileA.every((file) => {
    //         if (file.name === assistingData[id].filename) {
    //           dispatch(editAssistingData(authToken, id, file));
    //           selectedFileABackUp = selectedFileABackUp.filter((data) => data.name !== file.name);
    //           return false;
    //         }
    //         return true;
    //       });
    //       flag = true;
    //       return false;
    //     }
    //     return true;
    //   });
    //   if (flag === false) {
    //     dispatch(deleteAssistingData(authToken, id));
    //   }
    // });

    // selectedFileABackUp.forEach((file) => {
    //   const existedFile = assistTableData.filter((data) => data.filename === file.name);
    //   if (existedFile.length !== 0) {
    //     dispatch(addAssistingData(authToken, problemId, file));
    //   }
    // });

    setDisabled(true);
  };

  const handleCancel = () => {
    if (hasChange) {
      setWarningPopUp(true);
    } else {
      closeEdit();
    }
  };

  return (
    <>
      <SimpleBar title="Label" noIndent>
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
      <SimpleBar title="Title" noIndent>
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
      <SimpleBar title="Description" noIndent>
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
      <SimpleBar title="About Input and Output" noIndent>
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
      <SimpleBar title="Source" noIndent>
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
      <SimpleBar title="Hint" noIndent>
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
      <SimpleBar title="Sample Data" noIndent>
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
          data={Object.keys(sampleTableData).map((key) => sampleTableData[key])}
          setData={handleSetSampleTableData}
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
        noIndent
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
          data={Object.keys(testcaseTableData).map((key) => testcaseTableData[key])}
          setData={handleSetTestcaseTableData}
        />
      </SimpleBar>
      <SimpleBar title="Assisting Data (Optional)" noIndent>
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
        selectedFile={cardSelectedFileS}
        setSelectedFile={setCardSelectedFileS}
        handleTempUpload={handleSampleConfirm}
      />
      <AssistingDataUploadCard
        popUp={assistPopUp}
        closePopUp={handleClosePopUp}
        selectedFile={cardSelectedFileA}
        setSelectedFile={setCardSelectedFileA}
        handleTempUpload={handleAssistConfirm}
      />
      <TestingDataUploadCard
        popUp={testingPopUp}
        closePopUp={handleClosePopUp}
        selectedFile={cardSelectedFileT}
        setSelectedFile={setCardSelectedFileT}
        handleTempUpload={handleTestingConfirm}
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
      <Dialog
        open={uploadFailCardPopup}
        onClose={() => {
          setUploadFailCardPopup(false);
          closeEdit();
        }}
        fullWidth
      >
        <DialogTitle id="dialog-slide-title">
          <Typography variant="h4">Upload Fail</Typography>
        </DialogTitle>
        <DialogContent>
          <Typography variant="body2">File below was failed to be uploaded:</Typography>
          {uploadFailFilename.map((filename) => (
            <Typography variant="body2" key={filename}>
              {filename}
            </Typography>
          ))}
        </DialogContent>
        <DialogActions className={classNames.filterButton}>
          <Button
            color="default"
            onClick={() => {
              setUploadFailCardPopup(false);
              closeEdit();
            }}
          >
            Done
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
