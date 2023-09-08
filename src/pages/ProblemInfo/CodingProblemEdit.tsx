import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  FormControlLabel,
  MenuItem,
  Select,
  Switch,
  TextField,
  Typography,
  makeStyles,
  withStyles,
} from '@material-ui/core';

import AlignedText from '@/components/AlignedText';
import CodeField from '@/components/CodeField';
import GeneralLoading from '@/components/GeneralLoading';
import SimpleBar from '@/components/SimpleBar';
import SimpleTable from '@/components/SimpleTable';
import Icon from '@/components/icon/index';
import useProblemAssistingData from '@/lib/assistingData/useProblemAssistingData';
import useProblemTestcases from '@/lib/testcase/useProblemTestcases';

import AssistingDataUploadCard from './components/AssistingDataUploadCard';
import TestcaseUploadCard from './components/TestcaseUploadCard';
import compareAssistingDataTableData from './functions/compareAssistingDataTableData';
import compareTestcaseTableData from './functions/compareTestcaseTableData';
import useCodingProblemEdit from './hooks/useCodingProblemEdit';
import useUploadFailedPopup from './hooks/useUploadFailedPopup';
import {
  AssistingDataEditTableSchema,
  JudgeLanguageType,
  JudgeType,
  ReviserLanguageType,
  TestcaseEditTableSchema,
} from './types';

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
    width: '100%',
  },
  loadButtons: {
    width: 'max-content',
  },
  statusSwitch: {
    marginTop: '20px',
  },
  dialogTitle: {
    marginBottom: '-8px',
  },
  backToEditButton: {
    marginLeft: '24px',
  },
  dialogButtons: {
    justifyContent: 'space-between',
  },
  select: {
    width: '350px',
  },
}));

const StyledButton = withStyles({
  outlined: {
    '& path': {
      fill: 'none !important',
    },
  },
})(Button);

export default function CodingProblemEdit({
  handleSuccess,
  handleCancel,
  problemId,
}: {
  handleSuccess: () => void;
  handleCancel: () => void;
  problemId: string;
}) {
  const className = useStyles();

  const { mutateProblemTestcases } = useProblemTestcases(Number(problemId));
  const { mutateProblemAssistingData } = useProblemAssistingData(Number(problemId));

  const {
    /** Loading states */
    editIsLoading,

    /** Problem meta */
    labelInputValue,
    titleInputValue,
    descriptionInputValue,
    ioDescriptionInputValue,
    sourceInputValue,
    hintInputValue,
    testcaseIsDisabledInputValue,
    setLabelInputValue,
    setTitleInputValue,
    setDescriptionInputValue,
    setIoDescriptionInputValue,
    setSourceInputValue,
    setHintInputValue,
    setTestcaseIsDisabledInputValue,

    /** Customized judge */
    judgeTypeInputValue,
    judgeCodeInputValue,
    judgeLanguageInputValue,
    setJudgeTypeInputValue,
    setJudgeCodeInputValue,
    setJudgeLanguageInputValue,

    /** Reviser */
    reviserIsEnabledInputValue,
    reviserCodeInputValue,
    reviserLanguageInputValue,
    setReviserIsEnabledInputValue,
    setReviserCodeInputValue,
    setReviserLanguageInputValue,

    /** Testcases */
    sampleTestcaseTableData,
    nonSampleTestcaseTableData,
    setSampleTestcaseTableData,
    setNonSampleTestcaseTableData,
    upsertTestcaseTableData,

    /** Assisting data */
    assistingDataTableData,
    setAssistingDataTableData,
    upsertAssistingDataTableData,

    /** Actions */
    saveProblemMetaData,
    saveTestcaseData,
    saveAssistingData,

    /** Popups */
    showSampleTestcaseUploadPopup,
    showNonSampleTestcaseUploadPopup,
    showAssistingDataUploadPopup,
    showWarningPopup,
    setShowSampleTestcaseUploadPopup,
    setShowNonSampleTestcaseUploadPopup,
    setShowAssistingDataUploadPopup,
    setShowWarningPopup,

    inputsDisabled,
    saveButtonDisabled,
    hasChanges,
    setHasChanges,
  } = useCodingProblemEdit(Number(problemId));

  const { showUploadFailPopup, setShowUploadFailPopup, uploadFailures, setUploadFailures } = useUploadFailedPopup();

  /** Handlers */
  const handleClickSave = async () => {
    const [, testcaseFileFailures, assistingDataFileFailures] = await Promise.allSettled([
      saveProblemMetaData(),
      saveTestcaseData(),
      saveAssistingData(),
    ]);

    mutateProblemTestcases();
    mutateProblemAssistingData();

    const uploadFailuresValue = [
      ...(testcaseFileFailures.status === 'fulfilled' ? testcaseFileFailures.value : []),
      ...(assistingDataFileFailures.status === 'fulfilled' ? assistingDataFileFailures.value : []),
    ];

    if (uploadFailuresValue.length > 0) {
      setUploadFailures(uploadFailuresValue);
      setShowUploadFailPopup(true);
    } else {
      handleSuccess();
    }
  };

  const handleClickCancel = async () => {
    if (hasChanges) {
      setShowWarningPopup(true);
    } else {
      handleCancel();
    }
  };

  const handleSampleTestcaseUploadConfirm = (data: TestcaseEditTableSchema[]) => {
    upsertTestcaseTableData(data, true);
    setShowSampleTestcaseUploadPopup(false);
  };
  const handleNonSampleTestcaseUploadConfirm = (data: TestcaseEditTableSchema[]) => {
    upsertTestcaseTableData(data, false);
    setShowNonSampleTestcaseUploadPopup(false);
  };
  const handleAssistingDataUploadConfirm = (data: AssistingDataEditTableSchema[]) => {
    upsertAssistingDataTableData(data);
    setShowAssistingDataUploadPopup(false);
  };

  const handleCloseSampleUploadPopup = () => setShowSampleTestcaseUploadPopup(false);
  const handleCloseNonSampleUploadPopup = () => setShowNonSampleTestcaseUploadPopup(false);
  const handleCloseAssistingDataUploadPopup = () => setShowAssistingDataUploadPopup(false);
  const handleCloseWarningPopup = () => setShowWarningPopup(false);
  const handleCloseUploadFailPopup = () => setShowUploadFailPopup(false);

  if (editIsLoading) {
    return <GeneralLoading />;
  }

  return (
    <>
      <SimpleBar title="Label" noIndent>
        <TextField
          value={labelInputValue}
          variant="outlined"
          onChange={(e) => {
            setLabelInputValue(e.target.value);
            setHasChanges(true);
          }}
          className={className.textfield}
          disabled={inputsDisabled}
        />
      </SimpleBar>
      <SimpleBar title="Title" noIndent>
        <TextField
          value={titleInputValue}
          variant="outlined"
          onChange={(e) => {
            setTitleInputValue(e.target.value);
            setHasChanges(true);
          }}
          className={className.textfield}
          disabled={inputsDisabled}
        />
      </SimpleBar>
      <SimpleBar title="Description" noIndent>
        <TextField
          placeholder="(Text, LaTeX, Markdown and HTML supported)"
          value={descriptionInputValue}
          variant="outlined"
          onChange={(e) => {
            setDescriptionInputValue(e.target.value);
            setHasChanges(true);
          }}
          multiline
          minRows={10}
          maxRows={10}
          className={className.textfield2}
          disabled={inputsDisabled}
        />
      </SimpleBar>
      <SimpleBar title="About Input and Output" noIndent>
        <TextField
          placeholder="(Text, LaTeX, Markdown and HTML supported)"
          value={ioDescriptionInputValue}
          variant="outlined"
          onChange={(e) => {
            setIoDescriptionInputValue(e.target.value);
            setHasChanges(true);
          }}
          multiline
          minRows={10}
          maxRows={10}
          className={className.textfield2}
          disabled={inputsDisabled}
        />
      </SimpleBar>
      <SimpleBar title="Source" noIndent>
        <TextField
          value={sourceInputValue}
          variant="outlined"
          onChange={(e) => {
            setSourceInputValue(e.target.value);
            setHasChanges(true);
          }}
          className={className.textfield}
          disabled={inputsDisabled}
        />
      </SimpleBar>
      <SimpleBar title="Hint" noIndent>
        <TextField
          placeholder="(Text, LaTeX, Markdown and HTML supported)"
          value={hintInputValue}
          variant="outlined"
          onChange={(e) => {
            setHintInputValue(e.target.value);
            setHasChanges(true);
          }}
          multiline
          minRows={5}
          maxRows={5}
          className={className.textfield2}
          disabled={inputsDisabled}
        />
      </SimpleBar>
      <SimpleBar title="Sample Data" noIndent>
        <div className={className.loadButtons}>
          <StyledButton
            variant="outlined"
            color="primary"
            startIcon={<Icon.Upload />}
            onClick={() => setShowSampleTestcaseUploadPopup(true)}
            disabled={inputsDisabled}
          >
            Upload
          </StyledButton>
        </div>
        <SimpleTable
          isEdit
          hasDelete
          columns={[
            {
              id: 'label',
              label: 'No.',
              minWidth: 60,
              align: 'center',
              width: 60,
              type: 'string',
            },
            {
              id: 'time_limit',
              label: 'Max Time (ms)',
              minWidth: 180,
              align: 'center',
              width: 150,
              type: 'string',
              editType: 'input',
            },
            {
              id: 'memory_limit',
              label: 'Max Memory (kb)',
              minWidth: 180,
              align: 'center',
              width: 150,
              type: 'string',
              editType: 'input',
            },
            {
              id: 'input_filename',
              label: 'Input File',
              minWidth: 150,
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
            {
              id: 'note',
              label: 'Note',
              align: 'center',
              width: '100%',
              type: 'string',
              editType: 'flexibleInput',
            },
          ]}
          data={sampleTestcaseTableData.sort(compareTestcaseTableData)}
          setData={setSampleTestcaseTableData}
        />
      </SimpleBar>
      <SimpleBar
        title="Testing Data"
        buttons={
          <FormControlLabel
            control={
              <Switch
                checked={!testcaseIsDisabledInputValue}
                onChange={() => {
                  setTestcaseIsDisabledInputValue((state) => !state);
                  setHasChanges(true);
                }}
                name="status"
                color="primary"
              />
            }
            label={testcaseIsDisabledInputValue ? 'Disabled' : 'Enabled'}
            className={className.statusSwitch}
            disabled={inputsDisabled}
          />
        }
        noIndent
      >
        <div className={className.loadButtons}>
          <StyledButton
            variant="outlined"
            color="primary"
            startIcon={<Icon.Upload />}
            onClick={() => setShowNonSampleTestcaseUploadPopup(true)}
            disabled={inputsDisabled}
          >
            Upload
          </StyledButton>
        </div>
        <SimpleTable
          isEdit
          hasDelete
          columns={[
            {
              id: 'label',
              label: 'No.',
              minWidth: 60,
              align: 'center',
              width: 60,
              type: 'string',
            },
            {
              id: 'time_limit',
              label: 'Max Time (ms)',
              minWidth: 180,
              align: 'center',
              width: 150,
              type: 'string',
              editType: 'input',
            },
            {
              id: 'memory_limit',
              label: 'Max Memory (kb)',
              minWidth: 180,
              align: 'center',
              width: 150,
              type: 'string',
              editType: 'input',
            },
            {
              id: 'score',
              label: 'Score',
              minWidth: 50,
              align: 'center',
              width: 80,
              type: 'string',
              editType: 'input',
            },
            {
              id: 'input_filename',
              label: 'Input File',
              minWidth: 150,
              align: 'center',
              width: 150,
              type: 'string',
            },
            {
              id: 'output_filename',
              label: 'Output File',
              minWidth: 150,
              align: 'center',
              width: 150,
              type: 'string',
            },
            {
              id: 'note',
              label: 'Note',
              align: 'center',
              width: '100%',
              type: 'string',
              editType: 'flexibleInput',
            },
          ]}
          data={nonSampleTestcaseTableData.sort(compareTestcaseTableData)}
          setData={setNonSampleTestcaseTableData}
        />
      </SimpleBar>
      <SimpleBar title="Assisting Data (Optional)" noIndent>
        <div className={className.loadButtons}>
          <StyledButton
            variant="outlined"
            color="primary"
            startIcon={<Icon.Upload />}
            onClick={() => setShowAssistingDataUploadPopup(true)}
            disabled={inputsDisabled}
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
          data={assistingDataTableData.sort(compareAssistingDataTableData)}
          setData={setAssistingDataTableData}
        />
      </SimpleBar>
      <SimpleBar title="Customized Judge Code (Optional)" noIndent>
        <AlignedText text="Judge Method" childrenType="field">
          <FormControl variant="outlined" className={className.select}>
            <Select
              name="judgeMethod"
              value={judgeTypeInputValue}
              onChange={(e) => {
                setJudgeTypeInputValue(e.target.value as JudgeType);
                setHasChanges(true);
              }}
              disabled={inputsDisabled}
            >
              <MenuItem value="NORMAL">No customized judge</MenuItem>
              <MenuItem value="CUSTOMIZED">Customized judge</MenuItem>
            </Select>
          </FormControl>
        </AlignedText>
        {judgeTypeInputValue === 'CUSTOMIZED' && (
          <>
            <AlignedText text="Language" childrenType="field">
              <FormControl variant="outlined" className={className.select}>
                <Select
                  name="language"
                  value={judgeLanguageInputValue}
                  onChange={(e) => {
                    setJudgeLanguageInputValue(e.target.value as JudgeLanguageType);
                    setHasChanges(true);
                  }}
                  disabled={inputsDisabled}
                >
                  <MenuItem value="python 3.8">Python 3.8</MenuItem>
                </Select>
              </FormControl>
            </AlignedText>
            <AlignedText text="Content" childrenType="field">
              <CodeField
                value={judgeCodeInputValue}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  setJudgeCodeInputValue(e.target.value);
                  setHasChanges(true);
                }}
                disabled={inputsDisabled}
              />
            </AlignedText>
          </>
        )}
      </SimpleBar>
      <SimpleBar title="Reviser Code (Optional)" noIndent>
        <AlignedText text="Reviser Type" childrenType="field">
          <FormControl variant="outlined" className={className.select}>
            <Select
              name="reviser"
              value={reviserIsEnabledInputValue ? 'CUSTOMIZED' : 'NORMAL'}
              onChange={(e) => setReviserIsEnabledInputValue((e.target.value === 'CUSTOMIZED') as boolean)}
              disabled={inputsDisabled}
            >
              <MenuItem value="NORMAL">No customized reviser</MenuItem>
              <MenuItem value="CUSTOMIZED">Customized reviser</MenuItem>
            </Select>
          </FormControl>
        </AlignedText>
        {reviserIsEnabledInputValue && (
          <>
            <AlignedText text="Language" childrenType="field">
              <FormControl variant="outlined" className={className.select}>
                <Select
                  name="language"
                  value={reviserLanguageInputValue}
                  onChange={(e) => setReviserLanguageInputValue(e.target.value as ReviserLanguageType)}
                  disabled={inputsDisabled}
                >
                  <MenuItem value="python 3.8">Python 3.8</MenuItem>
                </Select>
              </FormControl>
            </AlignedText>
            <AlignedText text="Content" childrenType="field">
              <CodeField
                value={reviserCodeInputValue}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  setReviserCodeInputValue(e.target.value);
                  setHasChanges(true);
                }}
                placeholder={`# Student's submission code file path
#${'\u00A0\u00A0\u00A0'}will be given via stdin
with open(input(), 'r') as file:
${'\u00A0\u00A0\u00A0\u00A0'}content = file.read()

if 'import' in content:
${'\u00A0\u00A0\u00A0\u00A0'}# Print the failure reason to stdout
${'\u00A0\u00A0\u00A0\u00A0'}# ${'\u00A0\u00A0'}if the code did not pass reviser
${'\u00A0\u00A0\u00A0\u00A0'}print('Cannot import!')
`}
                disabled={inputsDisabled}
              />
            </AlignedText>
          </>
        )}
      </SimpleBar>
      <div className={className.buttons}>
        <Button color="default" onClick={handleClickCancel}>
          Cancel
        </Button>
        <Button disabled={saveButtonDisabled} color="primary" onClick={handleClickSave}>
          Save
        </Button>
      </div>
      <TestcaseUploadCard
        isSample
        show={showSampleTestcaseUploadPopup}
        onClose={handleCloseSampleUploadPopup}
        onConfirm={handleSampleTestcaseUploadConfirm}
      />
      <TestcaseUploadCard
        show={showNonSampleTestcaseUploadPopup}
        onClose={handleCloseNonSampleUploadPopup}
        onConfirm={handleNonSampleTestcaseUploadConfirm}
      />
      <AssistingDataUploadCard
        show={showAssistingDataUploadPopup}
        onClose={handleCloseAssistingDataUploadPopup}
        onConfirm={handleAssistingDataUploadConfirm}
      />

      <Dialog open={showWarningPopup} onClose={handleCloseWarningPopup} maxWidth="md">
        <DialogTitle id="dialog-slide-title" className={className.dialogTitle}>
          <Typography variant="h4">Unsaved Changes</Typography>
        </DialogTitle>
        <DialogContent>
          <Typography variant="body1">
            You have unsaved changes, do you want to save your changes or back to edit?
          </Typography>
        </DialogContent>
        <DialogActions className={className.dialogButtons}>
          <Button onClick={handleCloseWarningPopup} className={className.backToEditButton} variant="outlined">
            Back to Edit
          </Button>
          <div>
            <Button color="default" onClick={handleCancel}>
              Don&apos;t Save
            </Button>
            <Button color="primary" onClick={handleClickSave}>
              Save
            </Button>
          </div>
        </DialogActions>
      </Dialog>
      <Dialog
        open={showUploadFailPopup}
        onClose={() => {
          handleCloseUploadFailPopup();
          handleCancel();
        }}
        fullWidth
      >
        <DialogTitle id="dialog-slide-title">
          <Typography variant="h4">Upload Fail</Typography>
        </DialogTitle>
        <DialogContent>
          <Typography variant="body1">Files below fail to be uploaded:</Typography>
          {uploadFailures.map(({ filename, reason }) => (
            <Box marginTop={1} key={filename}>
              <Typography variant="body2">{filename}</Typography>
              <Typography variant="caption">{reason.toString()}</Typography>
            </Box>
          ))}
        </DialogContent>
        <DialogActions className={className.dialogButtons}>
          <Button
            color="default"
            onClick={() => {
              handleCloseUploadFailPopup();
              handleCancel();
            }}
          >
            Done
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
