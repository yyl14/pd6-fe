/* eslint-disable @typescript-eslint/ban-ts-comment */
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  FormControlLabel,
  Grid,
  Snackbar,
  Switch,
  Typography,
  makeStyles,
  withStyles,
} from '@material-ui/core';
import { MathpixLoader, MathpixMarkdown } from 'mathpix-markdown-it';
import { useCallback, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';

import AlignedText from '@/components/AlignedText';
import CodeTextArea from '@/components/CodeTextArea';
import SampleTestcaseArea from '@/components/SampleTestcaseArea';
import SimpleBar from '@/components/SimpleBar';
import SimpleTable from '@/components/SimpleTable';
import Icon from '@/components/icon/index';
import useReduxStateShape from '@/hooks/useReduxStateShape';
import useUserClassRole from '@/hooks/useUserClassRole';
import useProblemAssistingData from '@/lib/assistingData/useProblemAssistingData';
import useClass from '@/lib/class/useClass';
import useCourse from '@/lib/course/useCourse';
import useProblem from '@/lib/problem/useProblem';
import useProblemTestcases from '@/lib/testcase/useProblemTestcases';

const useStyles = makeStyles(() => ({
  sampleArea: {
    marginTop: '50px',
  },
  sampleName: {
    marginBottom: '16px',
  },
  buttons: {
    display: 'flex',
    justifyContent: 'flex-end',
  },
  table: {
    width: '100%',
  },
  content: {
    whiteSpace: 'pre-line',
  },
  statusSwitch: {
    marginTop: '20px',
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
export default function CodingProblemInfo({
  courseId,
  classId,
  challengeId,
  problemId,
}: {
  courseId: string;
  classId: string;
  challengeId: string;
  problemId: string;
}) {
  const history = useHistory();
  const className = useStyles();

  const { class: classData } = useClass(Number(classId));
  const { course } = useCourse(Number(courseId));
  const { problem } = useProblem(Number(problemId));
  const {
    testcases,
    downloadSampleTestcases,
    downloadNonSampleTestcases,
    error: testcaseError,
  } = useProblemTestcases(Number(problemId));
  const {
    assistingData,
    downloadAllAssistingData,
    error: assistDataError,
  } = useProblemAssistingData(Number(problemId));
  const { deleteProblem, error: problemError } = useProblem(Number(problemId));

  const [status, setStatus] = useState(true);
  const [errorMsg, setErrorMsg] = useState<string | null>('');
  const [sampleDataIds, setSampleDataIds] = useState<(string | number)[]>([]);
  const [testcaseDataIds, setTestcaseDataIds] = useState<(string | number)[]>([]);
  const [deletePopUp, setDeletePopUp] = useState(false);
  const [emailSentPopup, setEmailSentPopup] = useState(false);
  const [showSnackbar, setShowSnackbar] = useState<boolean>(false);

  const role = useUserClassRole(Number(classId));

  const [testcasesById, testcaseIds] = useReduxStateShape(testcases);
  const [assistingDataById, assistingDataIds] = useReduxStateShape(assistingData);

  const handleDelete = async () => {
    try {
      await deleteProblem();
      setDeletePopUp(false);
      history.push(`/my-class/${courseId}/${classId}/challenge/${challengeId}`);
    } catch {
      setErrorMsg(problemError.delete.message);
      setShowSnackbar(true);
    }
  };

  const downloadAllAssistingFile = async () => {
    try {
      const res = await downloadAllAssistingData({ problem_id: Number(problemId), as_attachment: true });
      if (res.ok) {
        setEmailSentPopup(true);
      }
    } catch {
      setErrorMsg(assistDataError.downloadAllAssistingData.message);
      setShowSnackbar(true);
    }
  };

  const downloadAllSampleFile = async () => {
    try {
      const res = await downloadSampleTestcases({ problem_id: Number(problemId), as_attachment: true });
      if (res.ok) {
        setEmailSentPopup(true);
      }
    } catch {
      setErrorMsg(testcaseError.downloadSample.message);
      setShowSnackbar(true);
    }
  };

  const downloadAllTestingFile = async () => {
    try {
      const res = await downloadNonSampleTestcases({ problem_id: Number(problemId), as_attachment: true });
      if (res.ok) {
        setEmailSentPopup(true);
      }
    } catch {
      setErrorMsg(testcaseError.downloadNonSample.message);
      setShowSnackbar(true);
    }
  };

  // parse filename to get sample number
  const sampleTransToNumber = useCallback(
    (id: string | number) => {
      if (testcasesById[id]?.input_filename !== null) {
        return Number(testcasesById[id]?.input_filename?.slice(6, testcasesById[id]?.input_filename?.indexOf('.')));
      }
      if (testcasesById[id]?.output_filename !== null) {
        return Number(testcasesById[id]?.output_filename?.slice(6, testcasesById[id]?.output_filename?.indexOf('.')));
      }
      return 0;
    },
    [testcasesById],
  );

  // parse filename to get testcase number
  const testcaseTransToNumber = useCallback(
    (id: string | number) => {
      if (testcasesById[id]?.input_filename !== null) {
        return Number(testcasesById[id]?.input_filename?.slice(0, testcasesById[id]?.input_filename?.indexOf('.')));
      }
      if (testcasesById[id]?.output_filename !== null) {
        return Number(testcasesById[id]?.output_filename?.slice(0, testcasesById[id]?.output_filename?.indexOf('.')));
      }
      return 0;
    },
    [testcasesById],
  );

  useEffect(() => {
    if (testcaseIds) {
      const testcasesId = testcaseIds.filter((id) => !testcasesById[id].is_sample);
      const samplesId = testcaseIds.filter((id) => testcasesById[id].is_sample);
      testcasesId.sort((a, b) => testcaseTransToNumber(a) - testcaseTransToNumber(b));
      samplesId.sort((a, b) => sampleTransToNumber(a) - sampleTransToNumber(b));
      setSampleDataIds(samplesId);
      setTestcaseDataIds(testcasesId);
      if (testcasesId.length === 0) {
        setStatus(true);
      } else {
        setStatus(!testcasesById[testcasesId[0]].is_disabled);
      }
    }
  }, [testcasesById, testcaseIds, sampleTransToNumber, testcaseTransToNumber]);

  return (
    <>
      <SimpleBar title="Title">
        <Typography variant="body2">{problem === undefined ? 'error' : problem?.title}</Typography>
      </SimpleBar>
      <SimpleBar title="Description">
        {
          // @ts-ignore
          <MathpixLoader>
            {
              // @ts-ignore
              <MathpixMarkdown text={problem.description ?? ''} htmlTags />
            }
          </MathpixLoader>
        }
      </SimpleBar>
      <SimpleBar title="About Input and Output">
        {
          // @ts-ignore
          <MathpixLoader>
            {
              // @ts-ignore
              <MathpixMarkdown text={problem.io_description ?? ''} htmlTags />
            }
          </MathpixLoader>
        }
      </SimpleBar>
      {problem?.source !== '' && (
        <SimpleBar title="Source">
          <Typography variant="body2">{problem?.source}</Typography>
        </SimpleBar>
      )}
      {problem?.hint !== '' && (
        <SimpleBar title="Hint">
          {
            // @ts-ignore
            <MathpixLoader>
              {
                // @ts-ignore
                <MathpixMarkdown text={problem.hint ?? ''} htmlTags />
              }
            </MathpixLoader>
          }
        </SimpleBar>
      )}
      <SimpleBar title="Sample Data" noIndent>
        {role === 'MANAGER' && (
          <StyledButton
            variant="outlined"
            color="inherit"
            startIcon={<Icon.Download />}
            onClick={downloadAllSampleFile}
          >
            Download All Files
          </StyledButton>
        )}
        <SimpleTable
          isEdit={false}
          hasDelete={false}
          columns={[
            {
              id: 'no',
              label: 'No.',
              minWidth: 60,
              align: 'center',
              width: 60,
              type: 'string',
            },
            {
              id: 'time_limit',
              label: 'Max Time (ms)',
              minWidth: 50,
              align: 'center',
              width: 200,
              type: 'string',
            },
            {
              id: 'memory_limit',
              label: 'Max Memory (kb)',
              minWidth: 50,
              align: 'center',
              width: 200,
              type: 'string',
            },
          ]}
          data={sampleDataIds.map((id) => ({
            id,
            no: testcasesById[id]?.label,
            time_limit: testcasesById[id]?.time_limit,
            memory_limit: testcasesById[id]?.memory_limit,
            note: testcasesById[id]?.note,
          }))}
          setData
        />
        <div className={className.sampleArea}>
          <Grid container spacing={3}>
            {sampleDataIds
              .map((id) => testcasesById[id])
              .map((testcase) => (
                <Grid item xs={6} key={testcase?.id}>
                  <Typography variant="h6" className={className.sampleName}>
                    {`Sample ${testcase.label}`}
                  </Typography>
                  <SampleTestcaseArea
                    inputUuid={testcase?.input_file_uuid}
                    inputFileName={testcase?.input_filename}
                    outputUuid={testcase?.output_file_uuid}
                    outputFileName={testcase?.output_filename}
                    note={testcase?.note}
                  />
                </Grid>
              ))}
          </Grid>
        </div>
      </SimpleBar>
      <SimpleBar
        noIndent
        title="Testing Data"
        buttons={
          role === 'MANAGER' ? (
            <FormControlLabel
              control={<Switch checked={status} name="status" color="primary" disabled />}
              label={status ? 'Enabled' : 'Disabled'}
              className={className.statusSwitch}
            />
          ) : null
        }
      >
        {role === 'MANAGER' && (
          <StyledButton
            variant="outlined"
            color="inherit"
            startIcon={<Icon.Download />}
            onClick={downloadAllTestingFile}
          >
            Download All Files
          </StyledButton>
        )}
        <SimpleTable
          isEdit={false}
          hasDelete={false}
          columns={[
            {
              id: 'no',
              label: 'No.',
              minWidth: 60,
              align: 'center',
              width: 60,
              type: 'string',
            },
            {
              id: 'time_limit',
              label: 'Max Time (ms)',
              minWidth: 50,
              align: 'center',
              width: 200,
              type: 'string',
            },
            {
              id: 'memory_limit',
              label: 'Max Memory (kb)',
              minWidth: 50,
              align: 'center',
              width: 200,
              type: 'string',
            },
            {
              id: 'score',
              label: 'Score',
              minWidth: 50,
              align: 'center',
              width: 100,
              type: 'string',
            },
            {
              id: 'note',
              label: 'Note',
              align: 'center',
              type: 'string',
            },
          ]}
          data={testcaseDataIds.map((id) => ({
            id,
            no: testcasesById[id]?.label,
            time_limit: testcasesById[id]?.time_limit,
            memory_limit: testcasesById[id]?.memory_limit,
            score: testcasesById[id]?.score,
            note: testcasesById[id]?.note ? testcasesById[id]?.note : '',
          }))}
          setData
        />
      </SimpleBar>
      {role === 'MANAGER' && (
        <SimpleBar title="Assisting Data (Optional)" noIndent>
          <StyledButton
            variant="outlined"
            color="inherit"
            startIcon={<Icon.Download />}
            onClick={downloadAllAssistingFile}
          >
            Download All Files
          </StyledButton>
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
              problem !== undefined
                ? assistingDataIds.map((id) => ({
                    id,
                    filename: assistingDataById[id]?.filename,
                  }))
                : []
            }
            setData
          />
        </SimpleBar>
      )}
      {role === 'MANAGER' && problem?.judge_type === 'CUSTOMIZED' && (
        <SimpleBar
          title="Customized Judge Code (Optional)"
          noIndent
          buttons={
            <FormControlLabel
              control={<Switch checked name="customizeJudge" color="primary" disabled />}
              label="Enabled"
              className={className.statusSwitch}
            />
          }
        >
          <CodeTextArea codeUuid={problem?.judge_source?.code_uuid} codeFileName={problem?.judge_source?.filename} />
        </SimpleBar>
      )}
      {role === 'MANAGER' && problem?.reviser_is_enabled && (
        <SimpleBar
          title="Reviser Code (Optional)"
          noIndent
          buttons={
            <FormControlLabel
              control={<Switch checked name="customizeJudge" color="primary" disabled />}
              label="Enabled"
              className={className.statusSwitch}
            />
          }
        >
          <CodeTextArea codeUuid={problem?.reviser?.code_uuid} codeFileName={problem?.reviser?.filename} />
        </SimpleBar>
      )}
      {role === 'MANAGER' && (
        <SimpleBar
          title="Delete Task"
          childrenButtons={
            <Button color="secondary" onClick={() => setDeletePopUp(true)}>
              Delete
            </Button>
          }
        >
          <Typography variant="body1">Once you delete a task, there is no going back. Please be certain.</Typography>
        </SimpleBar>
      )}
      <Dialog open={deletePopUp} onClose={() => setDeletePopUp(false)} maxWidth="md">
        <DialogTitle>
          <Typography variant="h4">Delete Problem</Typography>
        </DialogTitle>
        <DialogContent>
          <AlignedText text="Class" childrenType="text" textColor="secondary">
            <Typography variant="body1">{`${course?.name} ${classData?.name}`}</Typography>
          </AlignedText>
          <AlignedText text="Title" childrenType="text" textColor="secondary">
            <Typography variant="body1">{problem === undefined ? 'error' : problem.title}</Typography>
          </AlignedText>
          <AlignedText text="Label" childrenType="text" textColor="secondary">
            <Typography variant="body1">{problem === undefined ? 'error' : problem.challenge_label}</Typography>
          </AlignedText>
          <Typography variant="body2">Once you delete a problem, there is no going back. Please be certain.</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeletePopUp(false)}>Cancel</Button>
          <Button color="secondary" onClick={handleDelete}>
            Delete
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog open={emailSentPopup} keepMounted onClose={() => setEmailSentPopup(false)}>
        <DialogTitle id="alert-dialog-slide-title">
          <Typography variant="h4">All Testcases Sent</Typography>
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">Please check your mailbox.</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setEmailSentPopup(false)} color="primary">
            Done
          </Button>
        </DialogActions>
      </Dialog>
      <Snackbar
        open={showSnackbar}
        autoHideDuration={3000}
        onClose={() => {
          setShowSnackbar(false);
        }}
        message={`Error: ${errorMsg}`}
      />
    </>
  );
}
