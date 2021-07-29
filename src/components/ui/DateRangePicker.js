import { makeStyles, TextField } from '@material-ui/core';
import React, { useState, useEffect } from 'react';
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
    marginTop: '10px',
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
const monthNames = ['Jan.', 'Feb.', 'Mar.', 'Apr.', 'May', 'Jun.', 'Jul.', 'Aug.', 'Sep.', 'Oct.', 'Nov.', 'Dec.'];

export default function DateRangePicker({ value, setValue }) {
  const classes = useStyles();

  const [startDate, setStartDate] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endDate, setEndDate] = useState('');
  const [endTime, setEndTime] = useState('');

  useEffect(() => {
    setStartDate(
      `${
        monthNames[value[0].startDate.getMonth()]
      } ${value[0].startDate.getDate()}, ${value[0].startDate.getFullYear()}`,
    );
    setEndDate(
      `${monthNames[value[0].endDate.getMonth()]} ${value[0].endDate.getDate()}, ${value[0].endDate.getFullYear()}`,
    );
    setStartTime(value[0].startDate.toLocaleString('en-GB').substring(12, 17));
    setEndTime(value[0].startDate.toLocaleString('en-GB').substring(12, 17));
  }, [value]);

  const [startError, setStartError] = useState(null);
  const [endError, setEndError] = useState(null);

  return (
    <div className={classes.wrapper}>
      <DateRange
        showDateDisplay={false}
        showMonthAndYearPickers={false}
        editableDateInputs
        onChange={(item) => setValue([item.selection])}
        moveRangeOnFirstSelection={false}
        ranges={value}
        color="#FFFFFF"
      />
      <div className={classes.fieldsWrapper}>
        <div>
          <TextField
            className={classes.dateField}
            label="Start Date"
            InputLabelProps={{ shrink: true }}
            InputProps={{ notched: false }}
            value={startDate}
          />
          <TextField className={classes.timeField} value={startTime} />
        </div>
        <div>
          <TextField
            className={classes.dateField}
            label="End Date"
            InputLabelProps={{ shrink: true }}
            InputProps={{ notched: false }}
            value={endDate}
          />
          <TextField className={classes.timeField} value={endTime} />
        </div>
      </div>
    </div>
  );
}
