import { Button, TextField } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { useEffect, useState } from 'react';

import useQuery from '@/hooks/useQuery';

import Icon from '../icon/index';

const useStyles = makeStyles(() => ({
  search: {
    marginRight: '5px',
    width: 'auto',
    minWidth: '89px',
    flexShrink: 20,
  },
}));

interface TextSearchFieldProps {
  handleSearch: (searchValue: string) => void;
  filterIndex: number;
}

function TextSearchField({ handleSearch, filterIndex }: TextSearchFieldProps) {
  const classes = useStyles();
  const [query, setQuery] = useQuery();

  const [inputValue, setInputValue] = useState<string>('');

  useEffect(
    /** Initializes input value from query. */
    () => {
      const filteringStringQuery = query.get(`filteringString${filterIndex}`);
      if (filteringStringQuery) {
        setInputValue(filteringStringQuery);
      }
    },
    [query, filterIndex],
  );

  return (
    <>
      <TextField
        id="search"
        onChange={(e) => {
          setQuery(`filteringString${filterIndex}`, e.target.value);
          setInputValue(e.target.value);
        }}
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
