import { Button } from '@material-ui/core';
import { useEffect, useState } from 'react';

import { FilterItem, FilterOperator } from '@/hooks/useBrowseParams/types';
import useQuery from '@/hooks/useQuery';

import MultiSelect from '../6a/MultiSelect';
import Icon from '../icon/index';
import { DataSchemaBase, FilterConfigOption } from './types';

type MultiSelectSearchFieldProps<DataSchema extends DataSchemaBase> = (
  | {
      multi: false;
      handleSearch: (searchValue: string[]) => void;
    }
  | {
      multi: true;
      handleSearch: (searchValue: FilterItem<DataSchema, keyof DataSchema, FilterOperator>[][]) => void;
    }
) & {
  options: FilterConfigOption<DataSchema, keyof DataSchema>[];
  filterIndex: number;
};

const MultiSelectSearchField = <DataSchema extends DataSchemaBase>({
  multi,
  handleSearch,
  options,
  filterIndex,
}: MultiSelectSearchFieldProps<DataSchema>) => {
  const [query, setQuery] = useQuery();

  const [selectedOptionIndices, setSelectedOptionIndices] = useState<number[]>([]);

  useEffect(
    /** Initializes selected option from query. */
    () => {
      const selectedOptionIndicesQuery = query.get(`selectedOptionIndices${filterIndex}`);
      if (selectedOptionIndicesQuery && selectedOptionIndicesQuery !== '') {
        setSelectedOptionIndices(JSON.parse(selectedOptionIndicesQuery));
      }
    },
    [query, filterIndex],
  );

  const handleSearchClick = () => {
    const selectedOptionValues = selectedOptionIndices.map((value) => options.at(value)?.value);
    if (multi) {
      handleSearch(selectedOptionValues as FilterItem<DataSchema, keyof DataSchema, FilterOperator>[][]);
    } else {
      handleSearch(selectedOptionValues.map((value) => String(value)));
    }
  };

  return (
    <>
      <MultiSelect
        options={options.map((option, index) => ({ value: index, label: option.label }))}
        value={selectedOptionIndices}
        setValue={(newValue: number[]) => {
          setQuery(`selectedOptionIndices${filterIndex}`, JSON.stringify(newValue));
          setSelectedOptionIndices(newValue);
        }}
      />
      <Button color="primary" onClick={handleSearchClick}>
        <Icon.SearchIcon />
      </Button>
    </>
  );
};

export default MultiSelectSearchField;
