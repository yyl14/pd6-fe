import { TestcaseSchema } from '@/lib/testcase/useTestcase';

const getTestCaseLabel = (testCase: TestcaseSchema): string => {
  if (testCase.input_filename !== null) {
    return testCase.input_filename.slice(0, testCase.input_filename.indexOf('.'));
  }
  if (testCase.output_filename !== null) {
    return testCase.output_filename.slice(0, testCase.output_filename.indexOf('.'));
  }
  return '';
};

export default getTestCaseLabel;
