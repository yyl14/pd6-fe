import { Button, makeStyles } from '@material-ui/core';
import { useState } from 'react';

import PDOGS1 from './PDOGS1';
import PDOGS4s from './PDOGS4s';
import PDOGS6 from './PDOGS6';
import PDOGS6a from './PDOGS6a';

const useStyles = makeStyles((theme) => ({
  PDOGS_Content_Display: {
    display: 'block',
  },
  PDOGS_Button_default: {
    backgroundColor: theme.palette.background.default,
    color: theme.palette.primary.main,
  },
  PDOGS_Button_Clicked: {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.primary.contrastText,
  },
}));

export default function DevelopTeam() {
  const classes = useStyles();

  const [display, setDisplay] = useState([true, false, false, false]);

  const handleClick6a = () => {
    setDisplay([true, false, false, false]);
  };
  const handleClick6 = () => {
    setDisplay([false, true, false, false]);
  };
  const handleClick4s = () => {
    setDisplay([false, false, true, false]);
  };
  const handleClick1 = () => {
    setDisplay([false, false, false, true]);
  };

  const showTeam = () => {
    if (display[0] === true) {
      return <PDOGS6a />;
    }
    if (display[1] === true) {
      return <PDOGS6 />;
    }
    if (display[2] === true) {
      return <PDOGS4s />;
    }
    if (display[3] === true) {
      return <PDOGS1 />;
    }
    return <></>;
  };

  return (
    <div>
      <h1>Develop Team</h1>
      <Button
        variant="outlined"
        color="primary"
        className={display[0] === true ? classes.PDOGS_Button_Clicked : classes.PDOGS_Button_default}
        onClick={handleClick6a}
      >
        PDOGS 6a
      </Button>
      <Button
        variant="outlined"
        color="primary"
        className={display[1] === true ? classes.PDOGS_Button_Clicked : classes.PDOGS_Button_default}
        onClick={handleClick6}
      >
        PDOGS 6
      </Button>
      <Button
        variant="outlined"
        color="primary"
        className={display[2] === true ? classes.PDOGS_Button_Clicked : classes.PDOGS_Button_default}
        onClick={handleClick4s}
      >
        PDOGS 4S
      </Button>
      <Button
        variant="outlined"
        color="primary"
        className={display[3] === true ? classes.PDOGS_Button_Clicked : classes.PDOGS_Button_default}
        onClick={handleClick1}
      >
        PDOGS 1.0 &amp; 2.0
      </Button>
      <div className={classes.PDOGS_Content_Display}>{showTeam()}</div>
    </div>
  );
}
