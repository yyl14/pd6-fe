import React, { useState, useEffect } from 'react';
import { createStore } from 'redux';
import { TextField, InputAdornment } from '@material-ui/core';
import Icon from './icon/index';

/*
      TODO: Table head component

      props:

      filtersConfig: [
        {column: 'Name', type: 'TextField', options:null, operation: 'LIKE'},
        {column: 'Role', type: 'Dropdown' options:['a', 'b', 'c'], operation: 'IN'},
        {column: 'Start Time', type: 'Date', options: null, operation: 'BETWEEN'}],
      filters: [['Start Time', 'LIKE', 'something'], ['Name', 'IN', ['b', 'c']], ['Start Time', 'BETWEEN', ['2021-08-16T14:21:54Z', '2021-08-16T14:21:54Z']]]
      setFilters,
      buttons,
      */

const CustomTableHead = ({
  hasSearch, classes, buttons, filters, setFilters,
}) => {
  const [search, setSearch] = useState('');
  const [advanceSearchActivated, setAdvanceSearchActivated] = useState(false);
  return (
    <div className={hasSearch ? classes.topContent1 : classes.topContent2}>
      {hasSearch && (
        <TextField
          id="search"
          // className={searchWidth(searchWidthOption)}
          onChange={(e) => {
            setSearch(e.target.value);
          }}
          value={search}
          placeholder={"This doesn't work."}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <Icon.SearchIcon />
              </InputAdornment>
            ),
          }}
        />
      )}
      <div className={classes.buttons}>{buttons}</div>
    </div>
  );
};

export default CustomTableHead;
