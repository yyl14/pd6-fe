import React, { useState, useEffect } from 'react';
import useMeasure from 'react-use-measure';
import { makeStyles } from '@material-ui/core/styles';
import {
  Typography, Card, CardContent, CardActions, IconButton,
} from '@material-ui/core';
import CopyToClipboardButton from './CopyToClipboardButton';
import Icon from './icon/index';

const useStyles = makeStyles({
  root: {
    width: '90%',
    height: 'auto',
  },
  defaultCardContent: {
    padding: '4px 30px 20px 30px',
    // '&:last-child': {
    //  padding: '22.5px 30px 5.5px',
    // },
  },
  limitedCardContent: {
    padding: '4px 30px 0px 30px',
    maxHeight: '331.5px',
    overflow: 'hidden',
  },
  limitedCardContentExpanded: {
    padding: '4px 30px 0px 30px',
  },
  title: {
    display: 'flex',
    flexDirection: 'row',
    marginTop: '18.5px',
    alignItems: 'center',
  },
  copyIcon: {
    marginLeft: '7.5px',
    transform: 'translate(0, -1px)',
  },
  content: {
    marginTop: '18.5px',
  },
  actions: {
    display: 'flex',
    justifyContent: 'center',
    paddingTop: '18.5px',
    paddingBottom: '18.5px',
  },
});

export default function SampleTestArea({ input, output, note }) {
  const classes = useStyles();
  const [ref, { height }] = useMeasure();
  const [showExpandArrow, setShowExpandArrow] = useState(false);
  const [expanded, setExpanded] = useState(false);

  useEffect(() => {
    if (!showExpandArrow && height > 400) {
      setShowExpandArrow(true);
      setExpanded(false);
    }
    console.log(height);
  }, [height, showExpandArrow]);

  const handleExpand = (limited, isExpanded) => {
    if (limited) {
      if (isExpanded) {
        return classes.limitedCardContentExpanded;
      }
      return classes.limitedCardContent;
    }
    return classes.defaultCardContent;
  };

  return (
    <>
      <Card ref={ref} className={classes.root} variant="outlined">
        <CardContent className={handleExpand(showExpandArrow, expanded)}>
          {input && (
            <>
              <div className={classes.title}>
                <Typography variant="h6">Input</Typography>
                <div className={classes.copyIcon}>
                  <CopyToClipboardButton text={input} />
                </div>
              </div>
              <div className={classes.content}>
                <Typography variant="body1">{input}</Typography>
              </div>
            </>
          )}
          {output && (
            <>
              <div className={classes.title}>
                <Typography variant="h6">Output</Typography>
                <div className={classes.copyIcon}>
                  <CopyToClipboardButton text={output} />
                </div>
              </div>
              <div className={classes.content}>
                <Typography variant="body1">{output}</Typography>
              </div>
            </>
          )}
          <div className={classes.title}>
            <Typography variant="h6">Note</Typography>
            <div className={classes.copyIcon}>
              <CopyToClipboardButton text={note} />
            </div>
          </div>
          {note && (
            <div className={classes.content}>
              <Typography variant="body1">{note}</Typography>
            </div>
          )}
        </CardContent>

        {showExpandArrow && (
          <CardActions className={classes.actions}>
            <IconButton>
              {expanded ? (
                <Icon.ExpandLessOutlinedIcon onClick={() => setExpanded(false)} />
              ) : (
                <Icon.ExpandMoreOutlinedIcon onClick={() => setExpanded(true)} />
              )}
            </IconButton>
          </CardActions>
        )}
      </Card>
    </>
  );
}
