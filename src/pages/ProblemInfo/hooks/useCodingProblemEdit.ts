/* eslint-disable @typescript-eslint/naming-convention */
import { useState } from 'react';

import useAssistingData from '@/lib/assistingData/useAssistingData';
import useProblemAssistingData from '@/lib/assistingData/useProblemAssistingData';
import useProblem from '@/lib/problem/useProblem';
import useProblemTestcases from '@/lib/testcase/useProblemTestcases';
import useTestcase from '@/lib/testcase/useTestcase';

import { AssistingDataEditTableSchema, TestcaseEditTableSchema } from '../types';
import useAssistingDataEditTables from './useAssistingDataEditTable';
import useCustomizedJudgeEditFields from './useCustomizedJudgeEditFields';
import useProblemMetaEditFields from './useProblemMetaEditFields';
import useReviserEditFields from './useReviserEditFields';
import useTestcaseEditTables from './useTestcaseEditTables';
import useUploadFailedPopup from './useUploadFailedPopup';

/** Component logic for CodingProblemEdit */
const useCodingProblemEdit = (problemId: number) => {
  /** Data */
  const { editProblem, isLoading: problemIsLoading } = useProblem(problemId);
  const {
    testcases: originalTestcases,
    isLoading: problemTestcasesIsLoading,
    addTestcase,
  } = useProblemTestcases(problemId);
  const {
    editTestcase,
    deleteTestcase,
    uploadInputData,
    uploadOutputData,
    isLoading: testcaseIsLoading,
  } = useTestcase();
  const {
    assistingData: originalAssistingData,
    isLoading: problemAssistingDataIsLoading,
    addAssistingDataUnderProblem,
  } = useProblemAssistingData(Number(problemId));
  const { deleteAssistingData, editAssistingData, isLoading: assistingDataIsLoading } = useAssistingData();

  /** States */
  const {
    hasInitialized: problemMetaHasInitialized,
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
  } = useProblemMetaEditFields(problemId);
  const {
    hasInitialized: customizedJudgeHasInitialized,
    judgeTypeInputValue,
    judgeCodeInputValue,
    judgeLanguageInputValue,
    setJudgeTypeInputValue,
    setJudgeCodeInputValue,
    setJudgeLanguageInputValue,
  } = useCustomizedJudgeEditFields(problemId);
  const {
    hasInitialized: reviserHasInitialized,
    reviserIsEnabledInputValue,
    reviserCodeInputValue,
    reviserLanguageInputValue,
    setReviserIsEnabledInputValue,
    setReviserCodeInputValue,
    setReviserLanguageInputValue,
  } = useReviserEditFields(problemId);
  const {
    hasInitialized: testcaseTablesHasInitialized,
    sampleTestcaseTableData,
    nonSampleTestcaseTableData,
    setSampleTestcaseTableData,
    setNonSampleTestcaseTableData,
    upsertTestcaseTableData,
  } = useTestcaseEditTables(problemId);
  const {
    hasInitialized: assistingDataTableHasInitialized,
    assistingDataTableData,
    setAssistingDataTableData,
    upsertAssistingDataTableData,
  } = useAssistingDataEditTables(problemId);

  const [showSampleTestcaseUploadPopup, setShowSampleTestcaseUploadPopup] = useState(false);
  const [showNonSampleTestcaseUploadPopup, setShowNonSampleTestcaseUploadPopup] = useState(false);
  const [showAssistingDataUploadPopup, setShowAssistingDataUploadPopup] = useState(false);
  const [showWarningPopup, setShowWarningPopup] = useState(false);
  const [hasChanges, setHasChanges] = useState(false);
  const { showUploadFailPopup, setShowUploadFailPopup, uploadFailedFilenames, addUploadFailedFilename } =
    useUploadFailedPopup();

  const editIsLoading =
    problemIsLoading.edit ||
    problemTestcasesIsLoading.add ||
    testcaseIsLoading.editTestcase ||
    testcaseIsLoading.deleteTestcase ||
    testcaseIsLoading.uploadInputData ||
    testcaseIsLoading.uploadOutputData ||
    testcaseIsLoading.deleteInputData ||
    testcaseIsLoading.deleteOutputData ||
    problemAssistingDataIsLoading.add ||
    assistingDataIsLoading.edit ||
    assistingDataIsLoading.delete;

  const inputsDisabled =
    editIsLoading ||
    !problemMetaHasInitialized ||
    !customizedJudgeHasInitialized ||
    !reviserHasInitialized ||
    !testcaseTablesHasInitialized ||
    !assistingDataTableHasInitialized;

  const saveButtonDisabled =
    inputsDisabled ||
    (judgeTypeInputValue === 'CUSTOMIZED' && judgeCodeInputValue === '') ||
    (reviserIsEnabledInputValue && reviserCodeInputValue === '');

  /** Utilities */
  const findOriginalTestcaseById = (datum: TestcaseEditTableSchema) =>
    originalTestcases?.find((testcase) => testcase.id === datum.id);

  const findOriginalAssistingDataById = (datum: AssistingDataEditTableSchema) =>
    originalAssistingData?.find((assistingData) => assistingData.id === datum.id);

  /** Actions */
  const saveProblemMetaData = async () => {
    const testcaseTableData = sampleTestcaseTableData.concat(nonSampleTestcaseTableData);

    const calculatedFullScore = testcaseTableData.reduce((acc, datum) => acc + datum.score, 0);

    await editProblem({
      problem_id: problemId,
      challenge_label: labelInputValue,
      title: titleInputValue,
      full_score: calculatedFullScore,
      description: descriptionInputValue,
      io_description: ioDescriptionInputValue,
      source: sourceInputValue,
      hint: hintInputValue,
      testcase_disabled: testcaseIsDisabledInputValue,

      judge_type: judgeTypeInputValue,
      ...(judgeTypeInputValue === 'CUSTOMIZED'
        ? {
            judge_source: {
              judge_language: judgeLanguageInputValue,
              judge_code: judgeCodeInputValue,
            },
          }
        : {}),

      reviser_is_enabled: reviserIsEnabledInputValue,
      ...(reviserIsEnabledInputValue
        ? {
            reviser: {
              judge_language: reviserLanguageInputValue,
              judge_code: reviserCodeInputValue,
            },
          }
        : {}),
    });
  };

  const saveTestcaseData = async () => {
    if (!originalTestcases) {
      return;
    }
    /**
     * NOTE:
     * `testcaseTableDataToUpdate` will only include testcases that has its metadata
     * (`time_limit`, `memory_limit`, `note`, etc) updates. Updates of testcase file content can
     * only be done by first deleting and then adding a replacement, hence will be included
     * inside `testcaseTableDataToAdd` and `testcaseIdsToDelete` instead.
     */
    const tableData = sampleTestcaseTableData.concat(nonSampleTestcaseTableData);

    const testcaseTableDataToAdd: TestcaseEditTableSchema[] = tableData.filter(
      (datum) => findOriginalTestcaseById(datum) === undefined,
    );
    const testcaseTableDataToUpdate: TestcaseEditTableSchema[] = tableData.filter((datum) => {
      const originalTestcase = findOriginalTestcaseById(datum);
      return (
        originalTestcase &&
        (datum.is_disabled ||
          datum.time_limit !== originalTestcase.time_limit ||
          datum.memory_limit !== originalTestcase.memory_limit ||
          datum.note !== originalTestcase.note ||
          /** NOTE: File data in table data indicates file changes. */
          datum.input_file ||
          datum.output_file)
      );
    });
    const testcaseIdsToDelete: number[] = originalTestcases
      .filter((testcase) => tableData.find((datum) => datum.id === testcase.id) === undefined)
      .map((testcase) => testcase.id);

    const addTestcasePromise = Promise.allSettled(
      testcaseTableDataToAdd.map(async (datum) => {
        const {
          label,
          is_sample,
          is_disabled,
          score,
          time_limit,
          memory_limit,
          note,
          input_file,
          output_file,
          input_filename,
          output_filename,
        } = datum;

        // Add testcase
        const addTestcaseRes = await addTestcase({
          problem_id: Number(problemId),
          label,
          is_sample,
          is_disabled,
          score,
          time_limit,
          memory_limit,
          note,
        });
        const addedTestcaseId = addTestcaseRes.data.data.id;

        // Add testcase input / output data
        await Promise.all([
          input_file
            ? uploadInputData({ testcaseId: addedTestcaseId, file: input_file }).catch(() => {
                addUploadFailedFilename(input_filename);
              })
            : Promise.resolve(),
          output_file
            ? uploadOutputData({ testcaseId: addedTestcaseId, file: output_file }).catch(() => {
                addUploadFailedFilename(output_filename);
              })
            : Promise.resolve(),
        ]);
      }),
    );

    const editTestcasePromise = Promise.all(
      testcaseTableDataToUpdate.map(async (datum) => {
        const { id, is_disabled, time_limit, memory_limit, input_filename, input_file, output_filename, output_file } =
          datum;
        await editTestcase({ testcase_id: id as number, is_disabled, time_limit, memory_limit });

        // Add testcase input / output data
        await Promise.all([
          input_file
            ? uploadInputData({ testcaseId: id as number, file: input_file }).catch(() => {
                addUploadFailedFilename(input_filename);
              })
            : Promise.resolve(),
          output_file
            ? uploadOutputData({ testcaseId: id as number, file: output_file }).catch(() => {
                addUploadFailedFilename(output_filename);
              })
            : Promise.resolve(),
        ]);
      }),
    );

    const deleteTestcasePromise = Promise.all(
      testcaseIdsToDelete.map((id) => deleteTestcase({ testcase_id: Number(id) })),
    );

    await Promise.all([addTestcasePromise, editTestcasePromise, deleteTestcasePromise]);
  };

  const saveAssistingData = async () => {
    if (!originalAssistingData) {
      return;
    }
    const tableData = assistingDataTableData;

    const tableDataToAdd: AssistingDataEditTableSchema[] = tableData.filter(
      (datum) => findOriginalAssistingDataById(datum) === undefined,
    );
    const tableDataToUpdate: AssistingDataEditTableSchema[] = tableData.filter((datum) => {
      const originalAssistingDataItem = findOriginalAssistingDataById(datum);
      return originalAssistingDataItem && datum.filename !== originalAssistingDataItem?.filename;
    });
    const assistingDataIdsToDelete: number[] = originalAssistingData
      .filter((assistingData) => tableData.find((datum) => datum.id === assistingData.id) === undefined)
      .map((assistingData) => assistingData.id);

    const addAssistingDataUnderProblemPromise = Promise.allSettled(
      tableDataToAdd.map(async (datum) => {
        const { file, filename } = datum;
        await addAssistingDataUnderProblem({
          problemId: Number(problemId),
          file: file as Blob,
        }).catch(() => addUploadFailedFilename(filename));
      }),
    );

    const editAssistingDataPromise = Promise.all(
      tableDataToUpdate.map(async (datum) => {
        const { id, file, filename } = datum;
        await editAssistingData({ assistingDataId: id as number, file: file as Blob }).catch(() =>
          addUploadFailedFilename(filename),
        );
      }),
    );

    const deleteAssistingDataPromise = Promise.all(
      assistingDataIdsToDelete.map((id) => deleteAssistingData({ assisting_data_id: Number(id) })),
    );

    await Promise.all([addAssistingDataUnderProblemPromise, editAssistingDataPromise, deleteAssistingDataPromise]);
  };

  return {
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
    showUploadFailPopup,
    setShowUploadFailPopup,
    uploadFailedFilenames,

    inputsDisabled,
    saveButtonDisabled,
    hasChanges,
    setHasChanges,
  };
};

export default useCodingProblemEdit;
