import { Button, FormControl, MenuItem, Select } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { useState } from 'react';

import Icon from '../../icon/index';
import { DataSchemaBase, FilterOptions } from './types';

const useStyles = makeStyles(() => ({
  search: {
    marginRight: '5px',
    width: 'auto',
    minWidth: '89px',
    flexShrink: 20,
  },
}));

interface SelectSearchFieldProps<DataSchema extends DataSchemaBase> {
  handleSearch: (searchValue: string) => void;
  options: FilterOptions<DataSchema>;
}

const SelectSearchField = <DataSchema extends DataSchemaBase>({
  handleSearch,
  options,
}: SelectSearchFieldProps<DataSchema>) => {
  const classes = useStyles();

  const [inputValue, setInputValue] = useState('');

  return (
    <>
      <FormControl variant="outlined">
        <Select
          className={classes.search}
          value={inputValue}
          name="institute"
          onChange={(e) => {
            setInputValue(e.target.value as string);
          }}
          renderValue={(value) => options.find((option) => option.value === (value as string))?.label}
        >
          {options.map((option) => (
            <MenuItem key={String(option.value)} value={option.label}>
              {option.label}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <Button color="primary" onClick={() => handleSearch(inputValue)}>
        <Icon.SearchIcon />
      </Button>
    </>
  );
};

export default SelectSearchField;
