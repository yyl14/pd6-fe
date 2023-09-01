import { AssistingDataEditTableSchema } from '../types';

const compareAssistingDataTableData = (a: AssistingDataEditTableSchema, b: AssistingDataEditTableSchema) =>
  a.filename.localeCompare(b.filename);

export default compareAssistingDataTableData;
