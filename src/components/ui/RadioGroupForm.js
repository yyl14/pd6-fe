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
  },

  rowOption: {
    height: '25px',
    marginRight: '20px',
  },
  columnOption: {
    height: '25px',
    marginBottom: '16px',
  },
  optionText: {
    marginLeft: '6px',
  },

  radio: {
    height: '20px',
    width: '20px',
    backgroundColor: '#F8F8F8',
    borderRadius: '50%',
    boxShadow: `inset 0 0 0 1.5px ${theme.palette.grey[300]}`,
    padding: '2px',
    '&$checked': {
      color: theme.palette.grey[100],
    },
    '&:hover': {
      backgroundColor: `${theme.palette.grey[100]} !important`,
    },
    '&:active': {
      backgroundColor: theme.palette.grey[300],
    },
  },
  icon: {
    'input:hover ~ &': {
      backgroundColor: theme.palette.grey[100],
    },
  },
  checkedIcon: {
    display: 'flex',
    padding: '0px',
    '&:before': {
      // display: 'block',
      width: 20,
      height: 20,
      // backgroundImage: 'radial-gradient(circle at 100%,#1EA5FF)',
      // backgroundImage: 'radial-gradient(#1EA5FF, #1EA5FF, transparent 50%)',
      backgroundImage: 'radial-gradient(#1EA5FF,#1EA5FF 41%,transparent 43%)',
      content: '""',
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
      <RadioGroup value={selectedValue} onChange={(e) => setSelectedValue(e.target.value)} row={directionSelect(flexDirection)}>
        { options.map((option) => (
          <FormControlLabel
            className={marginDirectionSelect(flexDirection)}
            key={option.value}
            value={option.value}
            control={(
              <Radio
                // className={classes.radio}
                checkedIcon={<span className={`${classes.radio} ${classes.checkedIcon}`} />}
                icon={<span className={`${classes.radio} ${classes.icon}`} />}
                // checkedIcon={<span className={classes.radio} />}
                // icon={<span className={classes.radio} />}
              />
            )}
            label={<Typography variant="body1" className={classes.optionText}>{option.label}</Typography>}
          />
        ))}
      </RadioGroup>
    </FormControl>
  );
}
