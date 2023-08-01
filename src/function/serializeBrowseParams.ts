export const transformFilter = (
  value: { column: any; operator: any; operand: any }[], // eslint-disable-line @typescript-eslint/no-explicit-any
) => JSON.stringify(value.map(({ column, operator, operand }) => [column, operator, operand]));

export const transformSort = (
  value: { column: any; order: any }[], // eslint-disable-line @typescript-eslint/no-explicit-any
) => JSON.stringify(value.map(({ column, order }) => [column, order]));

const serializeBrowseParams = ({
  filter,
  sort,
  ...rest
}: {
  filter: { column: any; operator: any; operand: any }[]; // eslint-disable-line @typescript-eslint/no-explicit-any
  sort: { column: any; order: any }[]; // eslint-disable-line @typescript-eslint/no-explicit-any
  [key: string]: any; // eslint-disable-line @typescript-eslint/no-explicit-any
}) => ({
  filter: transformFilter(filter),
  sort: transformSort(sort),
  ...rest,
});

export default serializeBrowseParams;
