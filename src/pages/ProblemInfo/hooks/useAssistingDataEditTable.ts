/* eslint-disable @typescript-eslint/naming-convention */
import { useEffect, useState } from 'react';

import { AssistingDataSchema } from '@/lib/assistingData/useAssistingData';
import useProblemAssistingData from '@/lib/assistingData/useProblemAssistingData';

import { AssistingDataEditTableSchema } from '../types';

const useAssistingDataEditTables = (problemId: number) => {
  const { assistingData: originalAssistingData } = useProblemAssistingData(problemId);

  /** Input values */
  const [assistingDataTableData, setAssistingDataTableData] = useState<AssistingDataEditTableSchema[]>([]);

  const [hasInitialized, setHasInitialized] = useState(false);

  const assistingDataToTableData = (assistingData: AssistingDataSchema): AssistingDataEditTableSchema => ({
    id: assistingData.id,
    file: null,
    filename: assistingData.filename,
  });

  useEffect(
    /** Initializes table data */
    () => {
      if (!originalAssistingData || hasInitialized) {
        return;
      }
      setAssistingDataTableData(originalAssistingData.map(assistingDataToTableData));

      setHasInitialized(true);
    },
    [originalAssistingData, hasInitialized],
  );

  const upsertAssistingDataTableDataReducer = (
    currentTableData: AssistingDataEditTableSchema[],
    datum: AssistingDataEditTableSchema,
  ) => {
    const originalAssistingDataEntryIndex = assistingDataTableData.findIndex(
      (tableEntryDatum) => tableEntryDatum.filename === datum.filename,
    );
    if (originalAssistingDataEntryIndex === -1) {
      return [...currentTableData, datum];
    }
    return [
      ...currentTableData.slice(0, originalAssistingDataEntryIndex),
      datum,
      ...currentTableData.slice(originalAssistingDataEntryIndex + 1),
    ];
  };

  const upsertAssistingDataTableData = (input: AssistingDataEditTableSchema[]) => {
    setAssistingDataTableData((currentTableData) =>
      input.reduce(upsertAssistingDataTableDataReducer, currentTableData),
    );
  };

  return {
    hasInitialized,

    assistingDataTableData,
    setAssistingDataTableData,
    upsertAssistingDataTableData,
  };
};

export default useAssistingDataEditTables;
