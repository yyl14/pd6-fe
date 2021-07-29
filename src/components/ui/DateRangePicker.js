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
    display: 'flex',
    flexDirection: 'row',
  },
  wrapperVertical: {},

  // startDate: {
  //   display: 'flex',
  //   flexDirection: 'row',
  // },
  fieldsWrapper: {
    marginLeft: '45px',
  },

  dateField: {
    width: '147px',
    marginRight: '4px',
    '& div': {
      borderTopRightRadius: 0,
      borderBottomRightRadius: 0,
    },
  },

  timeField: {
    width: '79px',
    marginLeft: '0',
    '& div': {
      borderTopLeftRadius: 0,
      borderBottomLeftRadius: 0,
    },
  },
}));

/*
value: {
  date: {
    startDate: Date,
    endDate: Date,
  },
  time: {

  }
}
*/

export default function DateRangePicker({ value, onChange }) {
  const [state, setState] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: 'selection',
    },
  ]);
  const classes = useStyles();
  console.log(state);

  const [startDate, setStartDate] = useState(`${new Date()}`);

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
      <div className={classes.fieldsWrapper}>
        <div>
          <TextField
            className={classes.dateField}
            label="Start Date"
            InputLabelProps={{ shrink: true }}
            InputProps={{ notched: false }}
            // value={}
          />
          <TextField className={classes.timeField} />
        </div>
        <div>
          <TextField className={classes.dateField} />
          <TextField className={classes.timeField} />
        </div>
      </div>
    </div>
  );
}
