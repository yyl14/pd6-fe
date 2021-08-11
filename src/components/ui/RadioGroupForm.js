import {
  makeStyles,
  Typography,
  FormControl,
  FormLabel,
  FormControlLabel,
  RadioGroup,
  Radio,
} from '@material-ui/core';
import React from 'react';

const useStyles = makeStyles((theme) => ({
  wrapper: {
    display: 'flex',
    flexDirection: 'row',
    margin: '0px',
  },
  alignedTextWrapper: {
    width: '250px',
    marginTop: '0px',
    marginBottom: '16px',
  },
  radioGroup: {

  },
  rowOption: {
    marginRight: '20px',
  },
  columnOption: {
    marginBottom: '16px',
  },
  radio: {
    height: '20px',
    width: '20px',
    color: theme.palette.grey[300],
    marginRight: '6px',
    padding: '2px',
    checked: {

    },
    '&$checked': {
      color: theme.palette.grey[300],
    },
    '&:hover': {
      backgroundColor: theme.palette.grey[100],
    },
    '&:active': {
      backgroundColor: theme.palette.grey[300],
    },
  },
}));

export default function RadioGroupForm({
  title, options, selectedValue, setSelectedValue, flexDirection,
}) {
  const classes = useStyles();
  const directionSelect = (dir) => {
    if (dir === 'row') {
      return true;
    }
    return false;
  };
  const marginDirectionSelect = (dir) => {
    if (dir === 'row') {
      return classes.rowOption;
    }
    return classes.columnOption;
  };

  return (
    <FormControl className={classes.wrapper}>
      <div className={classes.alignedTextWrapper}>
        <Typography variant="body1">
          {title}
        </Typography>
      </div>
      <RadioGroup className={classes.radioGroup} value={selectedValue} onChange={(e) => setSelectedValue(e.target.value)} row={directionSelect(flexDirection)}>
        { options.map((option) => (
          <FormControlLabel
            className={marginDirectionSelect(flexDirection)}
            key={option.value}
            value={option.value}
            control={<Radio className={classes.radio} />}
            label={option.label}
          />
        ))}
      </RadioGroup>
    </FormControl>
  );
}
