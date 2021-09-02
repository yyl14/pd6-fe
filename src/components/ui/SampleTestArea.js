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
    wordBreak: 'break-word',
    // '&:last-child': {
    //  padding: '22.5px 30px 5.5px',
    // },
  },
  limitedCardContent: {
    height: '334px',
    padding: '4px 30px 0px 30px',
    overflow: 'hidden',
    wordBreak: 'break-word',
    display: '-webkit-box',
    WebkitLineClamp: 10,
    WebkitBoxOrient: 'vertical',
  },
  limitedCardContentExpanded: {
    padding: '4px 30px 0px 30px',
    wordBreak: 'break-word',
  },
  title: {
    marginTop: '18.5px',
  },
  copyIcon: {
    display: 'inline-block',
    marginLeft: '7.5px',
    transform: 'translateY(-3.5px)',
  },
  content: {
    marginTop: '18.5px',
  },
  actions: {
    display: 'flex',
    justifyContent: 'center',
    paddingTop: '16px',
    paddingBottom: '20px',
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
    <div ref={ref}>
      <Card className={classes.root} variant="outlined">
        <CardContent className={handleExpand(showExpandArrow, expanded)}>
          {input && (
            <>
              <div className={classes.title}>
                <Typography variant="h6" display="inline">
                  Input
                </Typography>
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
                <Typography variant="h6" display="inline">
                  Output
                </Typography>
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
            <Typography variant="h6" display="inline">
              Note
            </Typography>
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
            <IconButton onClick={() => setExpanded(!expanded)}>
              {expanded ? <Icon.ExpandLessOutlinedIcon /> : <Icon.ExpandMoreOutlinedIcon />}
            </IconButton>
          </CardActions>
        )}
      </Card>
    </div>
  );
}
