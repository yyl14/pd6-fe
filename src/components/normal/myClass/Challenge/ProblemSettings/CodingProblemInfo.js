import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import 'katex/dist/katex.min.css';
import Latex from 'react-latex-next';
import {
  Typography,
  Button,
  makeStyles,
  Dialog,
  DialogTitle,
  DialogActions,
  DialogContent,
  DialogContentText,
  TextField,
  Grid,
} from '@material-ui/core';
import { useHistory, useParams } from 'react-router-dom';
import SimpleBar from '../../../../ui/SimpleBar';
import SimpleTable from '../../../../ui/SimpleTable';
import SampleTestArea from '../../../../ui/SampleTestArea';
import AlignedText from '../../../../ui/AlignedText';
import Icon from '../../../../ui/icon/index';

import NoMatch from '../../../../noMatch';

import {
  browseTestcase,
  browseAssistingData,
  deleteAssistingData,
  deleteTestcase,
  deleteProblem,
  browseTasksUnderChallenge,
} from '../../../../../actions/myClass/problem';

import { fetchClass, fetchCourse, downloadFile } from '../../../../../actions/common/common';

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
  content: {
    whiteSpace: 'pre-line',
  },
}));

/* This is a level 4 component (page component) */
export default function CodingProblemInfo({ role = 'NORMAL' }) {
  const {
    courseId, classId, challengeId, problemId,
  } = useParams();
  const history = useHistory();
  const classNames = useStyles();

  const dispatch = useDispatch();

  const classes = useSelector((state) => state.classes.byId);
  const courses = useSelector((state) => state.courses.byId);
  const problems = useSelector((state) => state.problem.byId);
  const testcases = useSelector((state) => state.testcases.byId);

  const assistingData = useSelector((state) => state.assistingData.byId);

  const authToken = useSelector((state) => state.auth.token);
  // const error = useSelector((state) => state.error);
  const loading = useSelector((state) => state.loading.myClass.problem);

  const [sampleDataIds, setSampleDataIds] = useState([]);
  const [testcaseDataIds, setTestcaseDataIds] = useState([]);
  const [deletePopUp, setDeletePopUp] = useState(false);

  const handleDelete = () => {
    problems[problemId].assistingDataIds.forEach((id) => {
      dispatch(deleteAssistingData(authToken, id));
    });
    problems[problemId].testcaseIds.forEach((id) => {
      dispatch(deleteTestcase(authToken, id));
    });
    dispatch(deleteProblem(authToken, problemId));

    setDeletePopUp(false);
    history.push(`/my-class/${courseId}/${classId}/challenge/${challengeId}`);
  };

  const downloadAllAssistingFile = () => {
    const files = problems[problemId].assistingDataIds.map((id) => ({
      uuid: assistingData[id].s3_file_uuid,
      filename: assistingData[id].filename,
      as_attachment: false,
    }));
    files.map((file) => dispatch(downloadFile(authToken, file)));
  };

  const downloadAllSampleFile = () => {
    const files = sampleDataIds.reduce((acc, id) => {
      if (testcases[id].input_file_uuid !== null && testcases[id].output_file_uuid !== null) {
        console.log('hello');
        return [
          ...acc,
          {
            uuid: testcases[id].input_file_uuid,
            filename: testcases[id].input_filename,
            as_attachment: false,
          },
          {
            uuid: testcases[id].output_file_uuid,
            filename: testcases[id].output_filename,
            as_attachment: false,
          },
        ];
      }
      if (testcases[id].input_file_uuid !== null) {
        return [
          ...acc,
          {
            uuid: testcases[id].input_file_uuid,
            filename: testcases[id].input_filename,
            as_attachment: false,
          },
        ];
      }
      if (testcases[id].output_file_uuid !== null) {
        return [
          ...acc,
          {
            uuid: testcases[id].output_file_uuid,
            filename: testcases[id].output_filename,
            as_attachment: false,
          },
        ];
      }

      return acc;
    }, []);
    // console.log(files);
    files.map((file) => dispatch(downloadFile(authToken, file)));
  };

  const downloadAllTestingFile = () => {
    const files = testcaseDataIds.reduce((acc, id) => {
      if (testcases[id].input_file_uuid !== null && testcases[id].output_file_uuid !== null) {
        return [
          ...acc,
          {
            uuid: testcases[id].input_file_uuid,
            filename: testcases[id].input_filename,
            as_attachment: false,
          },
          {
            uuid: testcases[id].output_file_uuid,
            filename: testcases[id].output_filename,
            as_attachment: false,
          },
        ];
      }
      if (testcases[id].input_file_uuid !== null) {
        return [
          ...acc,
          {
            uuid: testcases[id].input_file_uuid,
            filename: testcases[id].input_filename,
            as_attachment: false,
          },
        ];
      }
      if (testcases[id].output_file_uuid !== null) {
        return [
          ...acc,
          {
            uuid: testcases[id].output_file_uuid,
            filename: testcases[id].output_filename,
            as_attachment: false,
          },
        ];
      }

      return acc;
    }, []);
    files.map((file) => dispatch(downloadFile(authToken, file)));
  };

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

  useEffect(() => {
    if (problems[problemId] && problems[problemId].testcaseIds) {
      setSampleDataIds(problems[problemId].testcaseIds.filter((id) => testcases[id].is_sample));
      setTestcaseDataIds(problems[problemId].testcaseIds.filter((id) => !testcases[id].is_sample));
    }
  }, [problems, problemId, testcases]);

  useEffect(() => {
    dispatch(browseTasksUnderChallenge(authToken, challengeId));
  }, [authToken, challengeId, dispatch]);

  useEffect(() => {
    dispatch(browseTestcase(authToken, problemId));
    dispatch(browseAssistingData(authToken, problemId));
  }, [authToken, dispatch, problemId]);

  // useEffect(() => {
  //   dispatch(fetchClass(authToken, classId));
  //   dispatch(fetchCourse(authToken, courseId));
  // }, [authToken, classId, courseId, dispatch]);

  if (loading.readProblem || loading.browseTestcase || loading.browseAssistingData) {
    return <div>loading...</div>;
  }

  if (problems[problemId] === undefined || classes[classId] === undefined || courses[courseId] === undefined) {
    return <NoMatch />;
  }

  return (
    <>
      <SimpleBar title="Title">
        <Typography variant="body2">
          {problems[problemId] === undefined ? 'error' : problems[problemId].title}
        </Typography>
      </SimpleBar>
      <SimpleBar title="Description">
        <Typography variant="body2" className={classNames.content}>
          <Latex>{problems[problemId].description}</Latex>
        </Typography>
      </SimpleBar>
      <SimpleBar title="About Input and Output">
        <Typography variant="body2" className={classNames.content}>
          <Latex>{problems[problemId].io_description}</Latex>
        </Typography>
      </SimpleBar>
      {problems[problemId].source !== '' && (
        <SimpleBar title="Source">
          <Typography variant="body2">{problems[problemId].source}</Typography>
        </SimpleBar>
      )}
      {problems[problemId].hint !== '' && (
        <SimpleBar title="Hint">
          <Typography variant="body2">{problems[problemId].hint}</Typography>
        </SimpleBar>
      )}
      <SimpleBar title="Sample">
        {role === 'MANAGER' && (
          <Button variant="outlined" color="inherit" startIcon={<Icon.Download />} onClick={downloadAllSampleFile}>
            Download All Files
          </Button>
        )}
        <SimpleTable
          isEdit={false}
          hasDelete={false}
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
              width: 200,
              type: 'string',
            },
            {
              id: 'memory_limit',
              label: 'Max Memory(kb)',
              minWidth: 50,
              align: 'center',
              width: 200,
              type: 'string',
            },
          ]}
          data={sampleDataIds.map((id) => ({
            id,
            no: sampleTrans2no(id),
            time_limit: testcases[id].time_limit,
            memory_limit: testcases[id].memory_limit,
          }))}
        />
        <div className={classNames.sampleArea}>
          <Grid container spacing={3}>
            {sampleDataIds.map((id) => (
              <Grid item xs={6} key={id}>
                <Typography variant="body2">{`Sample ${sampleTrans2no(id)}`}</Typography>
                <SampleTestArea input={testcases[id].input} output={testcases[id].output} />
              </Grid>
            ))}
          </Grid>
        </div>
      </SimpleBar>
      <SimpleBar title="Testing Data">
        {role === 'MANAGER' && (
          <Button variant="outlined" color="inherit" startIcon={<Icon.Download />} onClick={downloadAllTestingFile}>
            Download All Files
          </Button>
        )}
        <SimpleTable
          isEdit={false}
          hasDelete={false}
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
              width: 200,
              type: 'string',
            },
            {
              id: 'memory_limit',
              label: 'Max Memory(kb)',
              minWidth: 50,
              align: 'center',
              width: 200,
              type: 'string',
            },
            {
              id: 'score',
              label: 'score',
              minWidth: 50,
              align: 'center',
              width: 100,
              type: 'string',
            },
          ]}
          data={testcaseDataIds.map((id) => ({
            id,
            no: testcaseTrans2no(id),
            time_limit: testcases[id].time_limit,
            memory_limit: testcases[id].memory_limit,
            score: testcases[id].score,
          }))}
        />
      </SimpleBar>
      {role === 'MANAGER' && (
        <SimpleBar title="Assisting Data (Optional)">
          <Button variant="outlined" color="inherit" startIcon={<Icon.Download />} onClick={downloadAllAssistingFile}>
            Download All Files
          </Button>
          <SimpleTable
            isEdit={false}
            hasDelete={false}
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
                  id,
                  filename: assistingData[id].filename,
                }))
                : []
            }
          />
        </SimpleBar>
      )}
      {role === 'MANAGER' && (
        <SimpleBar
          title="Delete Task"
          childrenButtons={(
            <Button color="secondary" onClick={() => setDeletePopUp(true)}>
              Delete
            </Button>
          )}
        >
          <Typography variant="body1">Once you delete a task, there is no going back. Please be certain.</Typography>
        </SimpleBar>
      )}
      <Dialog open={deletePopUp} onClose={() => setDeletePopUp(false)} maxWidth="md">
        <DialogTitle>
          <Typography variant="h4">Delete Problem</Typography>
        </DialogTitle>
        <DialogContent>
          <DialogContentText variant="body1" color="secondary">
            <AlignedText text="Class" childrenType="text">
              <Typography>{`${courses[courseId].name} ${classes[classId].name}`}</Typography>
            </AlignedText>
            <AlignedText text="Title" childrenType="text">
              {problems[problemId] === undefined ? 'error' : problems[problemId].title}
            </AlignedText>
            <AlignedText text="Label" childrenType="text">
              <Typography>
                {problems[problemId] === undefined ? 'error' : problems[problemId].challenge_label}
              </Typography>
            </AlignedText>
            <Typography variant="body2" color="textPrimary">
              Once you delete a problem, there is no going back. Please be certain.
            </Typography>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeletePopUp(false)}>Cancel</Button>
          <Button color="secondary" onClick={handleDelete}>
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
