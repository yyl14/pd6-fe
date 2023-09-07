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
}

const SearchField = <DataSchema extends DataSchemaBase>({ filterConfig, setFilter }: SearchFieldProps<DataSchema>) => {
  const { type } = filterConfig;

  switch (type) {
    case 'TEXT':
      return (
        <TextSearchField
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
          multi
          options={filterConfig.options}
          handleSearch={(newValue) => setFilter(() => newValue)}
        />
      ) : (
        <SelectSearchField
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
          multi
          options={filterConfig.options}
          handleSearch={(newValue) => setFilter(() => newValue.flat())}
        />
      ) : (
        <MultiSelectSearchField
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
