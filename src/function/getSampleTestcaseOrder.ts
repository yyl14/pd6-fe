import { TestcaseSchema } from '@/lib/testcase/useTestcase';

const getSampleTestCaseOrder = (testCase: TestcaseSchema): number => {
  if (testCase.input_filename !== null) {
    return Number(testCase.input_filename.slice('sample'.length, testCase.input_filename.indexOf('.')));
  }
  if (testCase.output_filename !== null) {
    return Number(testCase.output_filename.slice('sample'.length, testCase.output_filename.indexOf('.')));
  }
  return -1;
};

export default getSampleTestCaseOrder;
