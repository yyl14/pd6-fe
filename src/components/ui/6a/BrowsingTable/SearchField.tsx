import { FilterItem, FilterOperand, FilterOperator } from '../../../../hooks/useBrowseParams/types';
import MultiSelectSearchField from './MultiSelectSearchField';
import SelectSearchField from './SelectSearchField';
import TextSearchField from './TextSearchField';
import { DataSchemaBase, FilterConfigItem } from './types';

const SearchField = <DataSchema extends DataSchemaBase>({
  filterConfigItem,
  filter,
  setFilter,
  createFilter,
}: {
  filterConfigItem: FilterConfigItem<DataSchema>;
  filter: FilterItem<DataSchema, keyof DataSchema, FilterOperator>[];
  setFilter: (
    reducer: (
      state: FilterItem<DataSchema, keyof DataSchema, FilterOperator>[],
    ) => FilterItem<DataSchema, keyof DataSchema, FilterOperator>[],
  ) => void;
  createFilter: <K extends keyof DataSchema, T extends FilterOperator>(
    column: K,
    operator: T,
    operand: FilterOperand<T, DataSchema[K]> | string | string[] | [string, string],
  ) => FilterItem<DataSchema, K, T>;
}) => {
  const { type, dataColumn, operator } = filterConfigItem;

  switch (type) {
    case 'TEXT':
      return (
        <TextSearchField
          filter={filter[0]}
          handleSearch={(newValue: string) => setFilter(() => [createFilter(dataColumn, operator, newValue)])}
        />
      );
    case 'ENUM_SINGLE':
      return (
        <SelectSearchField
          options={filterConfigItem.options}
          handleSearch={(newValue: string) => setFilter(() => [createFilter(dataColumn, operator, newValue)])}
        />
      );
    case 'ENUM_MULTI':
      return (
        <MultiSelectSearchField
          options={filterConfigItem.options}
          handleSearch={(newValue: string[]) => setFilter(() => [createFilter(dataColumn, operator, newValue)])}
        />
      );
    default:
      return <></>;
  }
};

export default SearchField;
