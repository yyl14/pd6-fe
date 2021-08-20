import React from 'react';
import { TextField } from '@material-ui/core';
import MultiSelect from './MultiSelect';

const SearchField = ({
  classes, tempFilterValue, setTempFilterValue, type, filterConfig, filteringIndex,
}) => {
  switch (type) {
    case 'TEXT': {
      return (
        <div className={classes.search}>
          <TextField
            id="search"
            onChange={(e) => {
              setTempFilterValue(e.target.value);
            }}
            value={tempFilterValue}
            placeholder="Search"
            // InputProps={{
            //   endAdornment: (
            //     <InputAdornment position="end">
            //       <Icon.SearchIcon />
            //     </InputAdornment>
            //   ),
            // }}
          />
        </div>
      );
    }
    case 'ENUM': {
      return (
        <div className={classes.search}>
          <MultiSelect
            className={classes.search}
            options={filterConfig[filteringIndex].options.map((item) => item.label)}
            value={Array.isArray(tempFilterValue) ? tempFilterValue : []}
            setValue={setTempFilterValue}
          />
        </div>
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
