import React from 'react';
import { TextField } from '@material-ui/core';
import MultiSelect from './MultiSelect';

const SearchField = ({
  classes, tempFilterValue, setTempFilterValue, type, filterConfig, filteringIndex,
}) => {
  switch (type) {
    case 'TEXT': {
      return (
        <TextField
          id="search"
          onChange={(e) => {
            setTempFilterValue(e.target.value);
          }}
          value={tempFilterValue}
          placeholder="Search"
          className={classes.search}
        />
      );
    }
    case 'ENUM': {
      return (
        <MultiSelect
          className={classes.search}
          options={filterConfig[filteringIndex].options.map((item) => item.label)}
          value={Array.isArray(tempFilterValue) ? tempFilterValue : []}
          setValue={setTempFilterValue}
        />
      );
    }
    // case 'DATE':{
    //   return
    // }
    default:
      return <div />;
  }
};

export default SearchField;
