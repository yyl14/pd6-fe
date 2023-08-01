import { Button } from '@material-ui/core';
import { useState } from 'react';

import Icon from '../../icon/index';
import MultiSelect from '../MultiSelect';
import { DataSchemaBase, FilterOptions } from './types';

interface MultiSelectSearchFieldProps<DataSchema extends DataSchemaBase> {
  handleSearch: (searchValue: string[]) => void;
  options: FilterOptions<DataSchema>;
}

const MultiSelectSearchField = <DataSchema extends DataSchemaBase>({
  handleSearch,
  options,
}: MultiSelectSearchFieldProps<DataSchema>) => {
  const [inputValue, setInputValue] = useState([] as string[]);

  return (
    <>
      <MultiSelect
        options={options.map((option) => ({ value: String(option.value), label: option.label }))}
        value={inputValue}
        setValue={(newValue: string[]) => {
          setInputValue(newValue);
        }}
      />
      <Button color="primary" onClick={() => handleSearch(inputValue)}>
        <Icon.SearchIcon />
      </Button>
    </>
  );
};

export default MultiSelectSearchField;
