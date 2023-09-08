import { FilterItem, FilterOperator } from '@/hooks/useBrowseParams/types';

import MultiSelectSearchField from './MultiSelectSearchField';
import SelectSearchField from './SelectSearchField';
import TextSearchField from './TextSearchField';
import { DataSchemaBase, FilterConfigItem } from './types';

interface SearchFieldProps<DataSchema extends DataSchemaBase> {
  filterConfig: FilterConfigItem<DataSchema>;
  setFilter: (
    reducer: (
      state: FilterItem<DataSchema, keyof DataSchema, FilterOperator>[],
    ) => FilterItem<DataSchema, keyof DataSchema, FilterOperator>[],
  ) => void;
  filterIndex: number;
}

const SearchField = <DataSchema extends DataSchemaBase>({
  filterConfig,
  setFilter,
  filterIndex,
}: SearchFieldProps<DataSchema>) => {
  const { type } = filterConfig;

  switch (type) {
    case 'TEXT':
      return (
        <TextSearchField
          filterIndex={filterIndex}
          handleSearch={(newValue: string) =>
            setFilter(() =>
              newValue === '' // Clear filter if input is empty
                ? []
                : [
                    {
                      column: filterConfig.dataColumn,
                      operator: filterConfig.operator,
                      operand: newValue,
                    },
                  ],
            )
          }
        />
      );
    case 'ENUM_SINGLE':
      return filterConfig.multi ? (
        <SelectSearchField
          filterIndex={filterIndex}
          multi
          options={filterConfig.options}
          handleSearch={(newValue) => setFilter(() => newValue)}
        />
      ) : (
        <SelectSearchField
          filterIndex={filterIndex}
          multi={false}
          options={filterConfig.options}
          handleSearch={(newValue) =>
            setFilter(() => [
              {
                column: filterConfig.dataColumn,
                operator: filterConfig.operator,
                operand: newValue,
              },
            ])
          }
        />
      );
    case 'ENUM_MULTI':
      return filterConfig.multi ? (
        <MultiSelectSearchField
          filterIndex={filterIndex}
          multi
          options={filterConfig.options}
          handleSearch={(newValue) => setFilter(() => newValue.flat())}
        />
      ) : (
        <MultiSelectSearchField
          filterIndex={filterIndex}
          multi={false}
          options={filterConfig.options}
          handleSearch={(newValue) =>
            setFilter(() => [
              {
                column: filterConfig.dataColumn,
                operator: filterConfig.operator,
                operand: newValue as DataSchema[keyof DataSchema][],
              },
            ])
          }
        />
      );
    default:
      return <></>;
  }
};

export default SearchField;
