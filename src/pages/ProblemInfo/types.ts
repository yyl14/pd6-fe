import { AssistingDataSchema } from '@/lib/assistingData/useAssistingData';
import { TestcaseSchema } from '@/lib/testcase/useTestcase';

export type JudgeType = 'NORMAL' | 'CUSTOMIZED';
export type JudgeLanguageType = 'python 3.8';
// export type JudgeLanguageType = 'c++ 11';
export type ReviserLanguageType = 'python 3.8';

export interface TestcaseEditTableSchema
  extends Omit<TestcaseSchema, 'id' | 'problem_id' | 'is_deleted' | 'input_file_uuid' | 'output_file_uuid'> {
  id: number | null;
  input_file: Blob | null;
  output_file: Blob | null;
}

export interface AssistingDataEditTableSchema extends Omit<AssistingDataSchema, 'id' | 'problem_id' | 's3_file_uuid'> {
  id: number | null;
  file: Blob | null;
}

export interface IOUploadCardTableSchema {
  id: number;
  in: File | null;
  out: File | null;
}
