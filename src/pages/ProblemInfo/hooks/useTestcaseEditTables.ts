/* eslint-disable @typescript-eslint/naming-convention */
import { useEffect, useState } from 'react';

import useProblemTestcases from '@/lib/testcase/useProblemTestcases';
import { TestcaseSchema } from '@/lib/testcase/useTestcase';

import { TestcaseEditTableSchema } from '../types';

const useTestcaseEditTables = (problemId: number) => {
  const { testcases: originalTestcases } = useProblemTestcases(problemId);

  /** Input values */
  const [sampleTestcaseTableData, setSampleTestcaseTableData] = useState<TestcaseEditTableSchema[]>([]);
  const [nonSampleTestcaseTableData, setNonSampleTestcaseTableData] = useState<TestcaseEditTableSchema[]>([]);

  const [hasInitialized, setHasInitialized] = useState(false);

  const testcaseToTestcaseTableData = (testcase: TestcaseSchema): TestcaseEditTableSchema => ({
    id: testcase.id,
    is_sample: testcase.is_sample,
    is_disabled: testcase.is_disabled,
    label: testcase.label,
    time_limit: testcase.time_limit,
    memory_limit: testcase.memory_limit,
    score: testcase.score,
    input_filename: testcase.input_filename,
    output_filename: testcase.output_filename,
    input_file: null,
    output_file: null,
    note: testcase.note,
  });

  useEffect(
    /**
     * Initializes tables data
     */
    () => {
      if (!originalTestcases || hasInitialized) {
        return;
      }

      const originalSampleTestcases = originalTestcases.filter((testcase) => testcase.is_sample);
      const originalNonSampleTestcases = originalTestcases.filter((testcase) => !testcase.is_sample);

      setSampleTestcaseTableData(originalSampleTestcases.map(testcaseToTestcaseTableData));

      setNonSampleTestcaseTableData(originalNonSampleTestcases.map(testcaseToTestcaseTableData));

      setHasInitialized(true);
    },
    [originalTestcases, hasInitialized],
  );

  const findTestcaseTableEntryIndex = (tableData: TestcaseEditTableSchema[]) => (datum: TestcaseEditTableSchema) =>
    tableData.findIndex((tableEntryDatum) => tableEntryDatum.label === datum.label);

  const upsertTableDataReducer = (currentTableData: TestcaseEditTableSchema[], datum: TestcaseEditTableSchema) => {
    const originalTestcaseEntryIndex = findTestcaseTableEntryIndex(currentTableData)(datum);
    if (originalTestcaseEntryIndex === -1) {
      return [...currentTableData, datum];
    }
    const updatedTableEntry: TestcaseEditTableSchema = {
      ...(currentTableData.at(originalTestcaseEntryIndex) as TestcaseEditTableSchema),
      time_limit: datum.time_limit,
      memory_limit: datum.memory_limit,
      ...(datum.input_file ? { input_file: datum.input_file, input_filename: datum.input_filename } : {}),
      ...(datum.output_file ? { output_file: datum.output_file, output_filename: datum.output_filename } : {}),
    };

    return [
      ...currentTableData.slice(0, originalTestcaseEntryIndex),
      updatedTableEntry,
      ...currentTableData.slice(originalTestcaseEntryIndex + 1),
    ];
  };

  const upsertTestcaseTableData = (input: TestcaseEditTableSchema[], isSample: boolean) => {
    if (isSample) {
      setSampleTestcaseTableData((currentTableData) => input.reduce(upsertTableDataReducer, currentTableData));
    } else {
      setNonSampleTestcaseTableData((currentTableData) => input.reduce(upsertTableDataReducer, currentTableData));
    }
  };

  return {
    hasInitialized,

    sampleTestcaseTableData,
    nonSampleTestcaseTableData,
    setSampleTestcaseTableData,
    setNonSampleTestcaseTableData,
    upsertTestcaseTableData,
  };
};

export default useTestcaseEditTables;
