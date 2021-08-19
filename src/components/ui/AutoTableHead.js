import React, { useState, useEffect } from 'react';
import { createStore } from 'redux';
import {
  Button, TextField, InputAdornment, FormControl, Select, MenuItem,
} from '@material-ui/core';
import { nanoid } from 'nanoid';
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

const AutoTableHead = ({
  hasFilter, classes, buttons, filterConfig, filters, setFilters,
}) => {
  const [filterValue, setFilterValue] = useState('');
  const [filteringIndex, setFilteringIndex] = useState(0);
  const [advanceSearchActivated, setAdvanceSearchActivated] = useState(false);

  useEffect(() => {
    const {
      reduxStateId, type, operation, optionsValue,
    } = filterConfig[filteringIndex];
    if (type === 'ENUM') {
      setFilters([[reduxStateId, operation, optionsValue[0]]]);
      setFilterValue(optionsValue[0]);
    } else {
      setFilters([[reduxStateId, operation, filterValue]]);
    }
  }, [filterConfig, filterValue, filteringIndex, setFilters]);

  const searchField = (type) => {
    switch (type) {
      case 'TEXT': {
        return (
          <TextField
            id="search"
            // className={searchWidth(searchWidthOption)}
            onChange={(e) => {
              setFilterValue(e.target.value);
            }}
            value={filterValue}
            placeholder={"This doesn't work."}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <Icon.SearchIcon />
                </InputAdornment>
              ),
            }}
          />
        );
      }
      case 'ENUM': {
        return (
          <FormControl variant="outlined">
            <Select
              className={classes.filterSelect}
              value={filterValue}
              onChange={(e) => {
                setFilterValue(e.target.value);
              }}
            >
              {filterConfig[filteringIndex].options.map((item) => (
                <MenuItem key={nanoid()} value={item.value}>
                  {item.label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        );
      }
      // case 'DATE':{
      //   return
      // }
      default:
        return (
          <TextField
            id="search"
            // className={searchWidth(searchWidthOption)}
            onChange={(e) => {
              setFilterValue(e.target.value);
            }}
            value={filterValue}
            placeholder={"This doesn't work."}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <Icon.SearchIcon />
                </InputAdornment>
              ),
            }}
          />
        );
    }
  };

  return (
    <div className={hasFilter ? classes.topContent1 : classes.topContent2}>
      {hasFilter && (
        <div>
          <FormControl variant="outlined">
            <Select
              className={classes.filterSelect}
              // labelId="rows-per-page"
              // id="rows-per-page"
              value={filters[0][0]}
              onChange={(e) => {
                setFilteringIndex(e.target.value);
              }}
            >
              {filterConfig.map((item, index) => (
                <MenuItem key={nanoid()} value={index}>
                  {item.label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          {searchField(filterConfig[filteringIndex].type)}
          <Button variant="outlined" color="secondary" disabled>
            <Icon.Advancedsearch className={classes.iconButtonIcon} />
          </Button>
        </div>
      )}
      <div className={classes.buttons}>{buttons}</div>
    </div>
  );
};

export default AutoTableHead;
