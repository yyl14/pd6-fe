import { Button, FormControl, MenuItem, Select } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { useEffect, useState } from 'react';

import { FilterItem, FilterOperator } from '@/hooks/useBrowseParams/types';
import useQuery from '@/hooks/useQuery';

import Icon from '../icon/index';
import { DataSchemaBase, FilterConfigOption } from './types';

const useStyles = makeStyles(() => ({
  search: {
    marginRight: '5px',
    width: 'auto',
    minWidth: '89px',
    flexShrink: 20,
  },
}));

type SelectSearchFieldProps<DataSchema extends DataSchemaBase> = (
  | {
      multi: false;
      handleSearch: (searchValue: string) => void;
    }
  | {
      multi: true;
      handleSearch: (searchValue: FilterItem<DataSchema, keyof DataSchema, FilterOperator>[]) => void;
    }
) & {
  options: FilterConfigOption<DataSchema, keyof DataSchema>[];
};

const SelectSearchField = <DataSchema extends DataSchemaBase>({
  multi,
  handleSearch,
  options,
}: SelectSearchFieldProps<DataSchema>) => {
  const classes = useStyles();
  const [query, setQuery] = useQuery();
  const filteringIndexQuery = query.get('filteringIndex');

  const [selectedOptionIndex, setSelectedOptionIndex] = useState(0);

  useEffect(
    /** Initializes selected option from query. */
    () => {
      if (!filteringIndexQuery) return;
      const selectedOptionIndexQuery = query.get(`selectedOptionIndex${filteringIndexQuery}`);
      if (selectedOptionIndexQuery && selectedOptionIndexQuery !== '') {
        setSelectedOptionIndex(Number(selectedOptionIndexQuery));
      } else {
        setSelectedOptionIndex(0);
      }
    },
    [query, filteringIndexQuery],
  );

  const handleSearchClick = () => {
    setQuery(`selectedOptionIndex${filteringIndexQuery}`, selectedOptionIndex.toString());
    const selectedOptionValue = options.at(selectedOptionIndex)?.value;
    if (multi) {
      handleSearch(selectedOptionValue as FilterItem<DataSchema, keyof DataSchema, FilterOperator>[]);
    } else {
      handleSearch(String(selectedOptionValue));
    }
  };

  return (
    <>
      <FormControl variant="outlined">
        <Select
          className={classes.search}
          value={selectedOptionIndex}
          name="institute"
          onChange={(e) => setSelectedOptionIndex(e.target.value as number)}
          renderValue={(value) => options.at(value as number)?.label}
        >
          {options.map((option, index) => (
            <MenuItem key={option.label} value={index}>
              {option.label}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <Button color="primary" onClick={handleSearchClick}>
        <Icon.SearchIcon />
      </Button>
    </>
  );
};

export default SelectSearchField;
