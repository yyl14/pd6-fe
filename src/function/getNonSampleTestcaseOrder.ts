import { TestcaseSchema } from '@/lib/testcase/useTestcase';

const getNonSampleTestCaseOrder = (testCase: TestcaseSchema): number => {
  if (testCase.input_filename !== null) {
    return Number(testCase.input_filename.slice(0, testCase.input_filename.indexOf('.')));
  }
  if (testCase.output_filename !== null) {
    return Number(testCase.output_filename.slice(0, testCase.output_filename.indexOf('.')));
  }
  return -1;
};

export default getNonSampleTestCaseOrder;
