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
import { UploadFailureType } from './useUploadFailedPopup';

/** Component logic for CodingProblemEdit */
const useCodingProblemEdit = (problemId: number) => {
  /** Data */
  const { editProblem, isLoading: problemIsLoading } = useProblem(problemId);
  const { testcases: originalTestcases, addTestcase } = useProblemTestcases(problemId);
  const { editTestcase, deleteTestcase, uploadInputData, uploadOutputData } = useTestcase();
  const { assistingData: originalAssistingData, addAssistingDataUnderProblem } = useProblemAssistingData(
    Number(problemId),
  );
  const { deleteAssistingData, editAssistingData } = useAssistingData();

  /** States */
  const {
    problemMetaHasInitialized,
    testcaseIsDisabledHasInitialized,
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

  const [saveTestcaseIsLoading, setSaveTestcaseIsLoading] = useState(false);
  const [saveAssistingDataIsLoading, setSaveAssistingDataIsLoading] = useState(false);

  const editIsLoading = problemIsLoading.edit || saveTestcaseIsLoading || saveAssistingDataIsLoading;

  const inputsDisabled =
    editIsLoading ||
    !problemMetaHasInitialized ||
    !testcaseIsDisabledHasInitialized ||
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
      return [];
    }
    setSaveTestcaseIsLoading(true);

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
          datum.score !== originalTestcase.score ||
          datum.note !== originalTestcase.note ||
          /** NOTE: File data present in table data indicates file changes. */
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
          is_disabled: testcaseIsDisabledInputValue,
          score,
          time_limit,
          memory_limit,
          note,
        });
        const addedTestcaseId = addTestcaseRes.data.data.id;

        // Add testcase input / output data
        const filesRes = await Promise.allSettled([
          input_file ? uploadInputData({ testcaseId: addedTestcaseId, file: input_file }) : Promise.resolve(),
          output_file ? uploadOutputData({ testcaseId: addedTestcaseId, file: output_file }) : Promise.resolve(),
        ]).then(([inputRes, outputRes]) => [
          ...(inputRes.status === 'rejected' ? [{ filename: input_filename, reason: inputRes.reason }] : []),
          ...(outputRes.status === 'rejected' ? [{ filename: output_filename, reason: outputRes.reason }] : []),
        ]);

        const uploadTasksCount = [input_file, output_file].filter((file) => file).length;
        if (filesRes.length === uploadTasksCount) {
          /** Delete added testcase if all upload tasks failed */
          await deleteTestcase({ testcase_id: addedTestcaseId });
        }

        return filesRes;
      }),
    ).then((responses) =>
      responses.reduce(
        (acc, response) => (response.status === 'fulfilled' ? [...acc, ...response.value] : acc),
        [] as UploadFailureType[],
      ),
    );

    const editTestcasePromise = Promise.allSettled(
      testcaseTableDataToUpdate.map(async (datum) => {
        const {
          id,
          is_disabled,
          time_limit,
          memory_limit,
          score,
          note,
          input_filename,
          input_file,
          output_filename,
          output_file,
        } = datum;
        await editTestcase({ testcase_id: id as number, score, note, is_disabled, time_limit, memory_limit });

        // Replace testcase input / output data
        const filesRes = await Promise.allSettled([
          input_file ? uploadInputData({ testcaseId: id as number, file: input_file }) : Promise.resolve('ok'),
          output_file ? uploadOutputData({ testcaseId: id as number, file: output_file }) : Promise.resolve('ok'),
        ]).then(([inputRes, outputRes]) => [
          ...(inputRes.status === 'rejected' ? [{ filename: input_filename, reason: inputRes.reason }] : []),
          ...(outputRes.status === 'rejected' ? [{ filename: output_filename, reason: outputRes.reason }] : []),
        ]);

        return filesRes;
      }),
    ).then((responses) =>
      responses.reduce(
        (acc, response) => (response.status === 'fulfilled' ? [...acc, ...response.value] : acc),
        [] as UploadFailureType[],
      ),
    );

    const deleteTestcasePromise = Promise.allSettled(
      testcaseIdsToDelete.map((id) => deleteTestcase({ testcase_id: Number(id) })),
    );

    const fileUploadFailures = await Promise.allSettled([
      addTestcasePromise,
      editTestcasePromise,
      deleteTestcasePromise,
    ]).then(([addFailedFilesRes, editFailedFilesRes]) => [
      ...(addFailedFilesRes.status === 'fulfilled' ? addFailedFilesRes.value : []),
      ...(editFailedFilesRes.status === 'fulfilled' ? editFailedFilesRes.value : []),
    ]);

    setSaveTestcaseIsLoading(false);

    return fileUploadFailures;
  };

  const saveAssistingData = async () => {
    if (!originalAssistingData) {
      return [];
    }
    setSaveAssistingDataIsLoading(true);

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
        const res = await addAssistingDataUnderProblem({
          problemId: Number(problemId),
          file: file as Blob,
        }).then(
          () => [] as UploadFailureType[],
          (err) => [{ filename, reason: err }] as UploadFailureType[],
        );

        return res;
      }),
    ).then((responses) =>
      responses.reduce(
        (acc, response) => (response.status === 'fulfilled' ? [...acc, ...response.value] : acc),
        [] as UploadFailureType[],
      ),
    );

    const editAssistingDataPromise = Promise.allSettled(
      tableDataToUpdate.map(async (datum) => {
        const { id, file, filename } = datum;
        const res = await editAssistingData({ assistingDataId: id as number, file: file as Blob }).then(
          () => [] as UploadFailureType[],
          (err) => [{ filename, reason: err }] as UploadFailureType[],
        );

        return res;
      }),
    ).then((responses) =>
      responses.reduce(
        (acc, response) => (response.status === 'fulfilled' ? [...acc, ...response.value] : acc),
        [] as UploadFailureType[],
      ),
    );

    const deleteAssistingDataPromise = Promise.allSettled(
      assistingDataIdsToDelete.map((id) => deleteAssistingData({ assisting_data_id: Number(id) })),
    );

    const fileUploadFailures = await Promise.allSettled([
      addAssistingDataUnderProblemPromise,
      editAssistingDataPromise,
      deleteAssistingDataPromise,
    ]).then(([addFailedFilesRes, editFailedFilesRes]) => [
      ...(addFailedFilesRes.status === 'fulfilled' ? addFailedFilesRes.value : []),
      ...(editFailedFilesRes.status === 'fulfilled' ? editFailedFilesRes.value : []),
    ]);

    setSaveAssistingDataIsLoading(false);

    return fileUploadFailures;
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

    inputsDisabled,
    saveButtonDisabled,
    hasChanges,
    setHasChanges,
  };
};

export default useCodingProblemEdit;
