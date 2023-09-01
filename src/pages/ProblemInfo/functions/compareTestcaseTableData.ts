import { TestcaseEditTableSchema } from '../types';

const compareTestcaseTableData = (a: TestcaseEditTableSchema, b: TestcaseEditTableSchema) =>
  Number(a.label) - Number(b.label);

export default compareTestcaseTableData;
