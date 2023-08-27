import useAssistingData from '@/lib/assistingData/useAssistingData';
import useProblemAssistingData from '@/lib/assistingData/useProblemAssistingData';
import useProblemTestcase from '@/lib/testcase/useProblemTestcase';
import useTestcase from '@/lib/testcase/useTestcase';

export interface TableDataProp {
  id: number;
  no: number;
  time_limit: number;
  memory_limit: number;
  score: number;
  input_filename: string | null | undefined;
  output_filename: string | null | undefined;
  in_file: Blob;
  out_file: Blob;
  new: boolean;
  note: string;
}

export interface AssistDataProp {
  id: string | number;
  filename: string;
  file: Blob | null;
}

interface TestcaseProp {
  id: number;
  problem_id: number;
  is_sample: boolean;
  score: number;
  label: string;
  input_file_uuid: string;
  output_file_uuid: string;
  input_filename: string;
  output_filename: string;
  note: string;
  time_limit: number;
  memory_limit: number;
  is_disabled: boolean;
  is_deleted: boolean;
}

interface AssistDataIdProp {
    id: number;
    problem_id: number;
    s3_file_uuid: string;
    filename: string;
}

export function SaveDatas(
  problemId: number,
  testcasesById: Record<string | number, TestcaseProp>,
  DataIds: (string | number)[],
  TableData: TableDataProp[],
  onSuccess: () => void,
  onError: (arg0: string) => void,
) {
  const { addTestcase } = useProblemTestcase(problemId);
  const { deleteTestcase, editTestcase, uploadInputData, uploadOutputData } = useTestcase();

  DataIds.map(async (id) => {
    if (TableData[Number(id)] === undefined) {
      // delete data
      await deleteTestcase({ testcase_id: Number(id) });
    }
    return id;
  });
  Object.keys(TableData).map(async (id) => {
    const body = {
      is_sample: true,
      score: 0,
      time_limit: TableData[Number(id)].time_limit,
      memory_limit: TableData[Number(id)].memory_limit,
      note: TableData[Number(id)].note,
      is_disabled: false,
      label: String(TableData[Number(id)].no),
    };
    if (TableData[Number(id)].new) {
      // add testcase with file
      await addTestcase({ problem_id: problemId, ...body });
    } else {
      // check basic info
      if (
        testcasesById[Number(id)].time_limit !== TableData[Number(id)].time_limit ||
        testcasesById[Number(id)].memory_limit !== TableData[Number(id)].memory_limit ||
        testcasesById[Number(id)].is_disabled !== false ||
        testcasesById[Number(id)].note !== TableData[Number(id)].note
      ) {
        await editTestcase({ testcase_id: Number(id), ...body });
      }
      return id;
    }
    // upload file
    if (TableData[Number(id)].in_file != null) {
      try {
        await uploadInputData({ file: TableData[Number(id)].in_file });
      } catch (e) {
        onError(String(TableData[Number(id)].input_filename));
      }
    }
    if (TableData[Number(id)].out_file != null) {
      try {
        await uploadOutputData({ file: TableData[Number(id)].out_file });
      } catch (e) {
        onError(String(TableData[Number(id)].output_filename));
      }
    }
    onSuccess();
    return id;
  });
}

export function SaveAssistingData(
  problemId: number,
  assistingDatasById: Record<string | number, AssistDataIdProp>,
  assistingDataIds: (string | number)[],
  assistingTableData: AssistDataProp[],
  onSuccess: () => void,
  onError: (arg0: string) => void,
) {
  const { addAssistingData } = useProblemAssistingData(problemId);
  const { deleteAssistingData, editAssistingData } = useAssistingData();

  assistingDataIds.map(async (id) => {
    if (assistingTableData[Number(id)] === undefined) {
      // delete data
      await deleteAssistingData({ assisting_data_id: Number(id) });
    }
    return id;
  });
  assistingTableData.map(async (item) => {
    if (item.file !== null) {
      if (assistingDataIds.filter((id) => assistingDatasById[id].filename === item.filename).length === 0) {
        // add assisting data
        try {
          await addAssistingData({ file: item.file });
        } catch (e) {
          onError(item.filename);
        }
      } else {
        // edit assisting data
        try {
          await editAssistingData({ file: item.file });
        } catch (e) {
          onError(item.filename);
        }
      }
    }
    return item;
  });
  onSuccess();
}
