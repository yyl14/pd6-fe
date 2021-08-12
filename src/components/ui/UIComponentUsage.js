import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
  Typography,
  Button,
  TextField,
} from '@material-ui/core';
import RadioGroupForm from './RadioGroupForm';

const useStyles = makeStyles((theme) => ({
  wrapper: {
    margin: '10px 20px 30px 20px',
  },
  divider: {
    marginTop: '0px',
    marginBottom: '25px',
    marginLeft: '0px',
    width: '600px',
    border: `0.5px solid ${theme.palette.grey[300]}`,
    backgroundColor: theme.palette.grey[300],
  },
  component: {
    marginLeft: '35px',
  },
}));

export default function UIComponentUsage() {
  const classes = useStyles();
  const [value, setValue] = useState('');

  return (
    <>
      <pre>  visit /components/ui/UIComponentUsage.js</pre>
      <div className={classes.wrapper}>
        <Typography variant="h3">Button</Typography>
        <hr className={classes.divider} />
        <div className={classes.component}>
          <Button>Edit</Button>
        </div>
      </div>
      <div className={classes.wrapper}>
        <Typography variant="h3">Input</Typography>
        <hr className={classes.divider} />
        <div className={classes.component}>
          <TextField />
        </div>
      </div>

      <div className={classes.wrapper}>
        <Typography variant="h3">Radio Group Form</Typography>
        <hr className={classes.divider} />
        <div className={classes.component}>
          <RadioGroupForm
            options={[
              {
                label: 'Last Score',
                value: 'last',
              },
              {
                label: 'Highest Score',
                value: 'highest',
              }]}
            selectedValue={value}
            setSelectedValue={setValue}
            flexDirection="row"
          />
        </div>
      </div>

    </>
  );
}
