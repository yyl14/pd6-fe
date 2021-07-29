import { makeStyles, TextField } from '@material-ui/core';
import React, { useState } from 'react';
import { DateRange } from 'react-date-range';
import theme from '../../theme';

const useStyles = makeStyles((muiTheme) => ({
  wrapper: {
    background: '#ffffff',
    borderRadius: muiTheme.shape.borderRadius,
    border: '1px solid #CACACA',
    padding: '20px 30px 20px 30px',
    width: '720px',
  },
  wrapperVertical: {},
}));

export default function DateRangePicker({ vertical }) {
  const [state, setState] = useState([
    {
      startDate: new Date(),
      endDate: null,
      key: 'selection',
    },
  ]);
  const classes = useStyles();

  return (
    <div className={classes.wrapper}>
      <DateRange
        showDateDisplay={false}
        showMonthAndYearPickers={false}
        editableDateInputs
        onChange={(item) => setState([item.selection])}
        moveRangeOnFirstSelection={false}
        ranges={state}
        color="#FFFFFF"
      />
      <TextField />
      <TextField />
      <TextField />
      <TextField />
    </div>
  );
}
