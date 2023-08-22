import { Button, makeStyles } from '@material-ui/core';
import { Suspense, lazy, useState } from 'react';

const PDOGS6a = lazy(() => import('./PDOGS6a'));
const PDOGS6 = lazy(() => import('./PDOGS6'));
const PDOGS4s = lazy(() => import('./PDOGS4s'));
const PDOGS1 = lazy(() => import('./PDOGS1'));

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
      return (
        <Suspense fallback={<div>Loading...</div>}>
          <PDOGS6a />
        </Suspense>
      );
    }
    if (display[1] === true) {
      return (
        <Suspense fallback={<div>Loading...</div>}>
          <PDOGS6 />
        </Suspense>
      );
    }
    if (display[2] === true) {
      return (
        <Suspense fallback={<div>Loading...</div>}>
          <PDOGS4s />
        </Suspense>
      );
    }
    if (display[3] === true) {
      return (
        <Suspense fallback={<div>Loading...</div>}>
          <PDOGS1 />
        </Suspense>
      );
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
