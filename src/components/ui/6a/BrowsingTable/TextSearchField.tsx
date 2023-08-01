import { Button, TextField } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { useState } from 'react';

import { FilterItem, FilterOperator } from '../../../../hooks/useBrowseParams/types';
import Icon from '../../icon/index';
import { DataSchemaBase } from './types';

const useStyles = makeStyles(() => ({
  search: {
    marginRight: '5px',
    width: 'auto',
    minWidth: '89px',
    flexShrink: 20,
  },
}));

interface TextSearchFieldProps<DataSchema extends DataSchemaBase> {
  filter: FilterItem<DataSchema, keyof DataSchema, FilterOperator> | undefined;
  handleSearch: (searchValue: string) => void;
}

function TextSearchField<DataSchema extends DataSchemaBase>({
  filter,
  handleSearch,
}: TextSearchFieldProps<DataSchema>) {
  const classes = useStyles();

  const [inputValue, setInputValue] = useState<string>((filter?.operand as string) ?? '');

  return (
    <>
      <TextField
        id="search"
        onChange={(e) => setInputValue(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            handleSearch(inputValue);
          }
        }}
        value={inputValue}
        placeholder="Search"
        className={classes.search}
      />
      <Button color="primary" onClick={() => handleSearch(inputValue)}>
        <Icon.SearchIcon />
      </Button>
    </>
  );
}

export default TextSearchField;
