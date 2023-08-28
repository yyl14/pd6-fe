import {
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
import { useCallback, useEffect, useState } from 'react';

import GeneralLoading from '@/components/GeneralLoading';
import AssistingDataUploadCard from '@/components/normal/myClass/Challenge/Problem/AssistingDataUploadCard';
import SampleUploadCard from '@/components/normal/myClass/Challenge/Problem/SampleUploadCard';
import TestingDataUploadCard from '@/components/normal/myClass/Challenge/Problem/TestingDataUploadCard';
import AlignedText from '@/components/ui/AlignedText';
import CodeField from '@/components/ui/CodeField';
import SimpleBar from '@/components/ui/SimpleBar';
import SimpleTable from '@/components/ui/SimpleTable';
import Icon from '@/components/ui/icon/index';
import useReduxStateShape from '@/hooks/useReduxStateShape';
import useAssistingData from '@/lib/assistingData/useAssistingData';
import useProblemAssistingData from '@/lib/assistingData/useProblemAssistingData';
import useProblem from '@/lib/problem/useProblem';
import useProblemTestcase from '@/lib/testcase/useProblemTestcase';
import useTestcase from '@/lib/testcase/useTestcase';
import { TableDataProp, AssistDataProp, SaveDatas, SaveAssistingData, GetDataContent } from './components';

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

/* This is a level 4 component (page component) */
export default function CodingProblemEdit({ closeEdit, problemId }: { closeEdit: () => void; problemId: string }) {
  const className = useStyles();

  const { problem, editProblem, isLoading: problemLoading } = useProblem(Number(problemId));
  const { isLoading: testcaseLoading } = useTestcase();
  const {
    browseTestcase: testcases,
    isLoading: problemTestcaseLoading,
  } = useProblemTestcase(Number(problemId));
  const { isLoading: assistLoading } = useAssistingData();
  const {
    assistingData,
    isLoading: problemAssistloading,
  } = useProblemAssistingData(Number(problemId));

  const [label, setLabel] = useState('');
  const [newTitle, setTitle] = useState('');
  const [newDescription, setDescription] = useState('');
  const [ioDescription, setIoDescription] = useState('');
  const [newSource, setSource] = useState('');
  const [newHint, setHint] = useState('');
  const [judgeType, setJudgeType] = useState<'NORMAL' | 'CUSTOMIZED'>('NORMAL');
  const [reviserIsEnabled, setReviserIsEnabled] = useState(false);
  const [judgeLanguage, setJudgeLanguage] = useState('Python 3.8');
  const [reviserLanguage, setReviserLanguage] = useState('Python 3.8');
  const [judgeCode, setJudgeCode] = useState('');
  const [reviserCode, setReviserCode] = useState('');
  const [status, setStatus] = useState(true);
  const [hasChange, setHasChange] = useState(false);

  const [handleInfoSuccess, setHandleInfoSuccess] = useState(false);
  const [handleSamplesSuccess, setHandleSamplesSuccess] = useState(false);
  const [handleTestcasesSuccess, setHandleTestcasesSuccess] = useState(false);
  const [handleAssistingDataSuccess, setHandleAssistingDataSuccess] = useState(false);
  const [uploadFailFilename, setUploadFailFilename] = useState<string[]>([]);
  const [uploadFailCardPopup, setUploadFailCardPopup] = useState(false);

  const [sampleDataIds, setSampleDataIds] = useState<(string | number)[]>([]);
  const [testcaseDataIds, setTestcaseDataIds] = useState<(string | number)[]>([]);
  const [sampleTableData, setSampleTableData] = useState<TableDataProp[]>([]);
  const [testcaseTableData, setTestcaseTableData] = useState<TableDataProp[]>([]);
  const [assistTableData, setAssistTableData] = useState<AssistDataProp[]>([]);

  const [testcasesById, testcaseIds] = useReduxStateShape(testcases);
  const [assistingDatasById, assistingDataIds] = useReduxStateShape(assistingData);

  const sampleTransToNumber = useCallback(
    (id: string | number) => {
      if (testcasesById[id].input_filename !== null) {
        return Number(testcasesById[id].input_filename.slice(6, testcasesById[id].input_filename.indexOf('.')));
      }
      if (testcasesById[id].output_filename !== null) {
        return Number(testcasesById[id].output_filename.slice(6, testcasesById[id].output_filename.indexOf('.')));
      }
      return 0;
    },
    [testcasesById],
  );

  const testcaseTransToNumber = useCallback(
    (id: string | number) => {
      if (testcasesById[id].input_filename !== null) {
        return Number(testcasesById[id].input_filename.slice(0, testcasesById[id].input_filename.indexOf('.')));
      }
      if (testcasesById[id].output_filename !== null) {
        return Number(testcasesById[id].output_filename.slice(0, testcasesById[id].output_filename.indexOf('.')));
      }
      return 0;
    },
    [testcasesById],
  );

  useEffect(() => {
    if (problem) {
      setLabel(problem.challenge_label);
      setTitle(problem.title);
      setDescription(problem.description);
      setIoDescription(problem.io_description);
      setSource(problem.source);
      setHint(problem.hint);
      setJudgeType(problem.judge_type);
      setReviserIsEnabled(problem.reviser_is_enabled);
      if (problem.judge_type === 'CUSTOMIZED') {
        setJudgeLanguage('Python 3.8');
      }
      if (problem.judge_source?.code_uuid && problem.judge_source?.filename) {
        setJudgeCode(String(GetDataContent(problem.judge_source.code_uuid, problem.judge_source.filename)));
      }
      if (problem.reviser_is_enabled) {
        setReviserLanguage('Python 3.8');
      }
      if (problem.reviser?.code_uuid && problem.reviser?.filename) {
        setReviserCode(String(GetDataContent(problem.reviser.code_uuid, problem.reviser.filename)));
      }
    }
  }, [problem]);

  useEffect(() => {
    if (problem !== undefined) {
      setAssistTableData(
        assistingDataIds.map((id) => ({
          id,
          filename: assistingDatasById[id].filename,
          file: null,
        })),
      );
    }
  }, [assistingDatasById, assistingDataIds, problem]);

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

      // set original table data
      setSampleTableData(
        samplesId.reduce(
          (acc, id) => ({
            ...acc,
            [id]: {
              id: testcasesById[id].id,
              no: sampleTransToNumber(id),
              time_limit: testcasesById[id].time_limit,
              memory_limit: testcasesById[id].memory_limit,
              score: testcasesById[id].score,
              input_filename: testcasesById[id].input_filename,
              output_filename: testcasesById[id].output_filename,
              in_file: null,
              out_file: null,
              new: false,
              note: testcasesById[id].note,
            },
          }),
          {} as TableDataProp[],
        ),
      );

      setTestcaseTableData(
        testcasesId.reduce(
          (acc, id) => ({
            ...acc,
            [id]: {
              id: testcasesById[id].id,
              no: testcaseTransToNumber(id),
              time_limit: testcasesById[id].time_limit,
              memory_limit: testcasesById[id].memory_limit,
              score: testcasesById[id].score,
              input_filename: testcasesById[id].input_filename,
              output_filename: testcasesById[id].output_filename,
              in_file: null,
              out_file: null,
              new: false,
              note: testcasesById[id].note,
            },
          }),
          {} as TableDataProp[],
        ),
      );
    }
  }, [testcasesById, testcaseIds, sampleTransToNumber, testcaseTransToNumber]);

  const sampleTrans = (id: string | number) => {
    if (sampleTableData[Number(id)].input_filename !== null) {
      return Number(
        sampleTableData[Number(id)].input_filename?.slice(6, sampleTableData[Number(id)].input_filename?.indexOf('.')),
      );
    }
    if (sampleTableData[Number(id)].output_filename !== null) {
      return Number(
        sampleTableData[Number(id)].output_filename?.slice(
          6,
          sampleTableData[Number(id)].output_filename?.indexOf('.'),
        ),
      );
    }
    return 0;
  };

  const testcaseTrans = (id: string | number) => {
    if (testcaseTableData[Number(id)].input_filename !== null) {
      return Number(
        testcaseTableData[Number(id)].input_filename?.slice(
          0,
          testcaseTableData[Number(id)].input_filename?.indexOf('.'),
        ),
      );
    }
    if (testcaseTableData[Number(id)].output_filename !== null) {
      return Number(
        testcaseTableData[Number(id)].output_filename?.slice(
          0,
          testcaseTableData[Number(id)].output_filename?.indexOf('.'),
        ),
      );
    }
    return 0;
  };

  const languageTrans = (lang: string) => {
    if (lang === 'Python 3.8') {
      return 'python 3.8';
    }
    return '';
  };

  const [cardSelectedFileS, setCardSelectedFileS] = useState({});
  const [cardSelectedFileT, setCardSelectedFileT] = useState({});
  const [cardSelectedFileA, setCardSelectedFileA] = useState([]);

  const [samplePopUp, setSamplePopUp] = useState(false);
  const [assistPopUp, setAssistPopUp] = useState(false);
  const [testingPopUp, setTestingPopUp] = useState(false);
  const [warningPopUp, setWarningPopUp] = useState(false);

  const [disabled, setDisabled] = useState(false);

  useEffect(() => {
    if (handleSamplesSuccess && handleTestcasesSuccess && handleInfoSuccess && handleAssistingDataSuccess) {
      if (uploadFailFilename.length === 0 && problem?.judge_source.filename !== undefined) {
        setDisabled(false);
        closeEdit();
      } else {
        setDisabled(false);
        setUploadFailCardPopup(true);
      }
    }
  }, [
    problem,
    closeEdit,
    handleAssistingDataSuccess,
    handleInfoSuccess,
    handleSamplesSuccess,
    handleTestcasesSuccess,
    problemId,
    uploadFailFilename.length,
  ]);

  const handleClosePopUp = () => {
    setSamplePopUp(false);
    setAssistPopUp(false);
    setTestingPopUp(false);
  };

  const handleSetSampleTableData = (tableData: TableDataProp[]) => {
    setSampleTableData(
      tableData.reduce(
        (acc, item) => ({
          ...acc,
          [item.id]: item,
        }),
        {} as TableDataProp[],
      ),
    );
    setHasChange(true);
  };
  const handleSetTestcaseTableData = (tableData: TableDataProp[]) => {
    setTestcaseTableData(
      tableData.reduce(
        (acc, item) => ({
          ...acc,
          [item.id]: item,
        }),
        {} as TableDataProp[],
      ),
    );
    setHasChange(true);
  };

  const handleSampleConfirm = (newSelectedFiles: TableDataProp[]) => {
    const newTableData = Object.keys(newSelectedFiles).reduce((acc, item) => {
      const keys = Object.keys(sampleTableData).filter(
        (key) => sampleTableData[Number(key)].no === newSelectedFiles[Number(item)].no,
      );
      if (keys.length === 0) {
        // this is new case
        return {
          ...acc,
          [-item]: {
            id: Number(-item),
            no: newSelectedFiles[Number(item)].no,
            label: newSelectedFiles[Number(item)].no,
            time_limit: newSelectedFiles[Number(item)].time_limit,
            memory_limit: newSelectedFiles[Number(item)].memory_limit,
            score: 0,
            input_filename:
              newSelectedFiles[Number(item)].in_file === null ? null : newSelectedFiles[Number(item)].in_file?.name,
            output_filename:
              newSelectedFiles[Number(item)].out_file === null ? null : newSelectedFiles[Number(item)].out_file?.name,
            in_file: newSelectedFiles[Number(item)].in_file,
            out_file: newSelectedFiles[Number(item)].out_file,
            new: true,
            note: '',
          },
        };
      }
      // testcase has been existed
      return {
        ...acc,
        [keys[0]]: {
          id: Number(keys[0]),
          no: newSelectedFiles[Number(item)].no,
          label: newSelectedFiles[Number(item)].no,
          time_limit: newSelectedFiles[Number(item)].time_limit,
          memory_limit: newSelectedFiles[Number(item)].memory_limit,
          input_filename:
            newSelectedFiles[Number(item)].in_file === null
              ? sampleTableData[Number(keys[0])].input_filename
              : newSelectedFiles[Number(item)].in_file?.name,
          output_filename:
            newSelectedFiles[Number(item)].out_file === null
              ? sampleTableData[Number(keys[0])].output_filename
              : newSelectedFiles[Number(item)].out_file?.name,
          in_file:
            newSelectedFiles[Number(item)].in_file === null
              ? sampleTableData[Number(keys[0])].in_file
              : newSelectedFiles[Number(item)].in_file,
          out_file:
            newSelectedFiles[Number(item)].out_file === null
              ? sampleTableData[Number(keys[0])].out_file
              : newSelectedFiles[Number(item)].out_file,
          new: sampleTableData[Number(keys[0])].new,
          note: sampleTableData[Number(keys[0])].note,
        },
      };
    }, sampleTableData);
    // console.log(newTableData);
    setSampleTableData(newTableData);
    setCardSelectedFileS({});
    setHasChange(true);
    setSamplePopUp(false);
  };

  const handleTestingConfirm = (newSelectedFiles: TableDataProp[]) => {
    const newTableData = Object.keys(newSelectedFiles).reduce((acc, item) => {
      const keys = Object.keys(testcaseTableData).filter(
        (key) => testcaseTableData[Number(key)].no === newSelectedFiles[Number(item)].no,
      );
      if (keys.length === 0) {
        // this is new case
        return {
          ...acc,
          [-item]: {
            id: -item,
            no: newSelectedFiles[Number(item)].no,
            label: newSelectedFiles[Number(item)].no,
            score: newSelectedFiles[Number(item)].score,
            time_limit: newSelectedFiles[Number(item)].time_limit,
            memory_limit: newSelectedFiles[Number(item)].memory_limit,
            input_filename:
              newSelectedFiles[Number(item)].in_file === null ? null : newSelectedFiles[Number(item)].in_file?.name,
            output_filename:
              newSelectedFiles[Number(item)].out_file === null ? null : newSelectedFiles[Number(item)].out_file?.name,
            in_file: newSelectedFiles[Number(item)].in_file,
            out_file: newSelectedFiles[Number(item)].out_file,
            new: true,
            note: '',
            is_disabled: false,
          },
        };
      }
      // testcase has been existed
      return {
        ...acc,
        [keys[0]]: {
          id: Number(keys[0]),
          no: newSelectedFiles[Number(item)].no,
          label: newSelectedFiles[Number(item)].no,
          score: newSelectedFiles[Number(item)].score,
          time_limit: newSelectedFiles[Number(item)].time_limit,
          memory_limit: newSelectedFiles[Number(item)].memory_limit,
          input_filename:
            newSelectedFiles[Number(item)].in_file === null
              ? testcaseTableData[Number(keys[0])].input_filename
              : newSelectedFiles[Number(item)].in_file?.name,
          output_filename:
            newSelectedFiles[Number(item)].out_file === null
              ? testcaseTableData[Number(keys[0])].output_filename
              : newSelectedFiles[Number(item)].out_file?.name,
          in_file:
            newSelectedFiles[Number(item)].in_file === null
              ? testcaseTableData[Number(keys[0])].in_file
              : newSelectedFiles[Number(item)].in_file,
          out_file:
            newSelectedFiles[Number(item)].out_file === null
              ? testcaseTableData[Number(keys[0])].out_file
              : newSelectedFiles[Number(item)].out_file,
          new: testcaseTableData[Number(keys[0])].new,
          note: testcaseTableData[Number(keys[0])].note,
        },
      };
    }, testcaseTableData);
    setTestcaseTableData(newTableData);
    setCardSelectedFileT({});
    setHasChange(true);
    setTestingPopUp(false);
  };

  const handleAssistConfirm = () => {
    // add file to table;
    const newData = cardSelectedFileA.reduce((acc, file: File) => {
      const index = assistTableData.findIndex((item) => item.filename === file.name);
      if (index === -1) {
        return [...acc, { id: file.name, filename: file.name, file }];
      }

      const newArray = acc;
      newArray[index] = { id: acc[index].id, filename: file.name, file };
      return newArray;
    }, assistTableData);
    setAssistTableData(newData);
    setCardSelectedFileA([]);
    setHasChange(true);
    setAssistPopUp(false);
  };

  const handleFileUploadFail = (filename: string) => {
    setUploadFailFilename([...uploadFailFilename, filename]);
  };

  const handleSave = async () => {
    const newFullScore = Object.keys(testcaseTableData).reduce(
      (acc, key) => acc + Number(testcaseTableData[Number(key)].score),
      0,
    );

    const resEdit = editProblem({
      problem_id: Number(problemId),
      challenge_label: label,
      title: newTitle,
      full_score: newFullScore,
      judge_type: judgeType,
      description: newDescription,
      io_description: ioDescription,
      source: newSource,
      hint: newHint,
      reviser_is_enabled: reviserIsEnabled,
      judge_source: { judge_language: languageTrans(judgeLanguage), judge_code: judgeCode },
      reviser: { judge_language: languageTrans(reviserLanguage), judge_code: reviserCode },
    });

    if ((await resEdit).ok) {
      setHandleInfoSuccess(true);
      setDisabled(true);
    }

    // save samples
    SaveDatas(
      Number(problemId),
      testcasesById,
      sampleDataIds,
      sampleTableData,
      () => {setHandleSamplesSuccess(true); },
      handleFileUploadFail,
    )

    // save testcases
    SaveDatas(
      Number(problemId),
      testcasesById,
      testcaseDataIds,
      testcaseTableData,
      () => {setHandleTestcasesSuccess(true); },
      handleFileUploadFail,
    )
    
    // save assisting data
    SaveAssistingData(
      Number(problemId),
      assistingDatasById,
      assistingDataIds,
      assistTableData,
      () => {setHandleAssistingDataSuccess(true); },
      handleFileUploadFail,
    )

  };

  const handleCancel = () => {
    if (hasChange) {
      setWarningPopUp(true);
    } else {
      closeEdit();
    }
  };

  if (
    problemLoading.edit ||
    problemLoading.delete ||
    testcaseLoading.deleteTestcase ||
    assistLoading.delete ||
    assistLoading.edit ||
    problemAssistloading.add ||
    testcaseLoading.editTestcase ||
    testcaseLoading.uploadInputData ||
    testcaseLoading.uploadOutputData ||
    problemTestcaseLoading.add ||
    disabled
  ) {
    return <GeneralLoading />;
  }

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
          className={className.textfield}
        />
      </SimpleBar>
      <SimpleBar title="Title" noIndent>
        <TextField
          value={newTitle}
          variant="outlined"
          onChange={(e) => {
            setTitle(e.target.value);
            setHasChange(true);
          }}
          className={className.textfield}
        />
      </SimpleBar>
      <SimpleBar title="Description" noIndent>
        <TextField
          placeholder="(Text, LaTeX, Markdown and HTML supported)"
          value={newDescription}
          variant="outlined"
          onChange={(e) => {
            setDescription(e.target.value);
            setHasChange(true);
          }}
          multiline
          minRows={10}
          maxRows={10}
          className={className.textfield2}
        />
      </SimpleBar>
      <SimpleBar title="About Input and Output" noIndent>
        <TextField
          placeholder="(Text, LaTeX, Markdown and HTML supported)"
          value={ioDescription}
          variant="outlined"
          onChange={(e) => {
            setIoDescription(e.target.value);
            setHasChange(true);
          }}
          multiline
          minRows={10}
          maxRows={10}
          className={className.textfield2}
        />
      </SimpleBar>
      <SimpleBar title="Source" noIndent>
        <TextField
          value={newSource}
          variant="outlined"
          onChange={(e) => {
            setSource(e.target.value);
            setHasChange(true);
          }}
          className={className.textfield}
        />
      </SimpleBar>
      <SimpleBar title="Hint" noIndent>
        <TextField
          placeholder="(Text, LaTeX, Markdown and HTML supported)"
          value={newHint}
          variant="outlined"
          onChange={(e) => {
            setHint(e.target.value);
            setHasChange(true);
          }}
          multiline
          minRows={5}
          maxRows={5}
          className={className.textfield2}
        />
      </SimpleBar>
      <SimpleBar title="Sample Data" noIndent>
        <div className={className.loadButtons}>
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
          data={Object.keys(sampleTableData)
            .sort((a, b) => sampleTrans(a) - sampleTrans(b))
            .map((key) => sampleTableData[Number(key)])}
          buttons
          setData={handleSetSampleTableData}
        />
      </SimpleBar>
      <SimpleBar
        title="Testing Data"
        buttons={
          <FormControlLabel
            control={
              <Switch
                checked={status}
                onChange={() => {
                  setStatus(!status);
                  setHasChange(true);
                }}
                name="status"
                color="primary"
              />
            }
            label={status ? 'Enabled' : 'Disabled'}
            className={className.statusSwitch}
          />
        }
        noIndent
      >
        <div className={className.loadButtons}>
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
          data={Object.keys(testcaseTableData)
            .sort((a, b) => testcaseTrans(a) - testcaseTrans(b))
            .map((key) => testcaseTableData[Number(key)])}
          buttons
          setData={handleSetTestcaseTableData}
        />
      </SimpleBar>
      <SimpleBar title="Assisting Data (Optional)" noIndent>
        <div className={className.loadButtons}>
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
          buttons
          setData={setAssistTableData}
        />
      </SimpleBar>
      <SimpleBar title="Customized Judge Code (Optional)" noIndent>
        <AlignedText text="Judge Method" childrenType="field">
          <FormControl variant="outlined" className={className.select}>
            <Select
              name="judgeMethod"
              value={judgeType}
              onChange={(e) => setJudgeType(e.target.value as 'NORMAL' | 'CUSTOMIZED')}
            >
              <MenuItem value="NORMAL">No customized judge</MenuItem>
              <MenuItem value="CUSTOMIZED">Customized judge</MenuItem>
            </Select>
          </FormControl>
        </AlignedText>
        {judgeType !== 'NORMAL' && (
          <>
            <AlignedText text="Language" childrenType="field">
              <FormControl variant="outlined" className={className.select}>
                <Select
                  name="language"
                  value={judgeLanguage}
                  onChange={(e) => setJudgeLanguage(e.target.value as string)}
                >
                  <MenuItem value="Python 3.8">Python 3.8</MenuItem>
                </Select>
              </FormControl>
            </AlignedText>
            <AlignedText text="Content" childrenType="field">
              <CodeField
                value={judgeCode}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  setJudgeCode(e.target.value);
                  setHasChange(true);
                }}
                placeholder
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
              value={reviserIsEnabled ? "CUSTOMIZED" : "NORMAL"}
              onChange={(e) => setReviserIsEnabled((e.target.value === "CUSTOMIZED") as boolean)}
            >
              <MenuItem value="NORMAL">No customized reviser</MenuItem>
              <MenuItem value="CUSTOMIZED">Customized reviser</MenuItem>
            </Select>
          </FormControl>
        </AlignedText>
        {reviserIsEnabled && (
          <>
            <AlignedText text="Language" childrenType="field">
              <FormControl variant="outlined" className={className.select}>
                <Select
                  name="language"
                  value={reviserLanguage}
                  onChange={(e) => setReviserLanguage(e.target.value as string)}
                >
                  <MenuItem value="Python 3.8">Python 3.8</MenuItem>
                </Select>
              </FormControl>
            </AlignedText>
            <AlignedText text="Content" childrenType="field">
              <CodeField
                value={reviserCode}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  setReviserCode(e.target.value);
                  setHasChange(true);
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
              />
            </AlignedText>
          </>
        )}
      </SimpleBar>
      <div className={className.buttons}>
        <Button color="default" onClick={handleCancel}>
          Cancel
        </Button>
        <Button
          disabled={
            disabled || (judgeType === 'CUSTOMIZED' && judgeCode === '') || (reviserIsEnabled && reviserCode === '')
          }
          color="primary"
          onClick={handleSave}
        >
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
      <Dialog open={warningPopUp} onClose={() => setWarningPopUp(false)} maxWidth="md">
        <DialogTitle id="dialog-slide-title" className={className.dialogTitle}>
          <Typography variant="h4">Unsaved Changes</Typography>
        </DialogTitle>
        <DialogContent>
          <Typography variant="body1">
            You have unsaved changes, do you want to save your changes or back to edit?
          </Typography>
        </DialogContent>
        <DialogActions className={className.dialogButtons}>
          <Button onClick={() => setWarningPopUp(false)} className={className.backToEditButton} variant="outlined">
            Back to Edit
          </Button>
          <div>
            <Button color="default" onClick={closeEdit}>
              Don’t Save
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
        <DialogActions className={className.dialogButtons}>
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
