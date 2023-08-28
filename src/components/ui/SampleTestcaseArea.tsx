import { Card, CardActions, CardContent, IconButton, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import React, { useEffect, useRef, useState } from 'react';

import { GetDataContent } from '@/pages/ProblemInfo/components';

import CopyToClipboardButton from './CopyToClipboardButton';
import Icon from './icon/index';

const useStyles = makeStyles({
  root: {
    width: '90%',
    height: 'auto',
  },
  code: {
    fontFamily: 'Noto Sans Mono',
  },
  defaultCardContent: {
    padding: '4px 30px 20px 30px',
    wordBreak: 'break-word',
    // '&:last-child': {
    //  padding: '22.5px 30px 5.5px',
    // },
  },
  limitedCardContent: {
    height: '333.5px',
    padding: '4px 30px 0px 30px',
    overflow: 'hidden',
    wordBreak: 'break-word',
    display: '-webkit-box',
    WebkitBoxOrient: 'vertical',
  },
  limitedCardContentExpanded: {
    padding: '4px 30px 0px 30px',
    wordBreak: 'break-word',
  },
  truncateInputContent: {
    WebkitLineClamp: 11,
  },
  truncateOutputTitle: {
    WebkitLineClamp: 11,
  },
  truncateOutputContent: {
    WebkitLineClamp: 10,
  },
  truncateNoteTitle: {
    WebkitLineClamp: 9,
  },
  truncateNoteContent: {
    WebkitLineClamp: 8,
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
  hideTextOverflowCardContent: {
    height: '325px',
  },
  hideTextOverflowActions: {
    paddingTop: '24.5px',
  },
});

interface SampleTestcaseAreaProp {
  input_uuid: string | null;
  input_fileName: string | null;
  output_uuid: string | null;
  output_fileName: string | null;
  note: string;
}

export default function SampleTestcaseArea({
  input_uuid,
  input_fileName,
  output_uuid,
  output_fileName,
  note = '',
}: SampleTestcaseAreaProp) {
  const className = useStyles();
  const ref = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLDivElement>(null);
  const outputRef = useRef<HTMLDivElement>(null);
  const noteRef = useRef<HTMLDivElement>(null);
  const [showExpandArrow, setShowExpandArrow] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const [truncatePosition, setTruncatePosition] = useState('');

  const input = GetDataContent(input_uuid, input_fileName);
  const output = GetDataContent(output_uuid, output_fileName);

  useEffect(() => {
    if (ref?.current?.clientHeight && ref.current.clientHeight > 401.5) {
      if (!showExpandArrow) {
        setShowExpandArrow(true);
        setExpanded(false);

        if (inputRef?.current?.clientHeight && outputRef?.current?.clientHeight) {
          if (inputRef.current.clientHeight >= 248) {
            setTruncatePosition('inputContent');
          } else if (inputRef.current.clientHeight >= 223) {
            setTruncatePosition('outputTitle');
          } else if (inputRef.current.clientHeight + outputRef.current.clientHeight >= 198) {
            setTruncatePosition('outputContent');
          } else if (inputRef.current.clientHeight + outputRef.current.clientHeight >= 148) {
            setTruncatePosition('noteTitle');
          } else if ( noteRef?.current?.clientHeight && 
            inputRef.current.clientHeight + outputRef.current.clientHeight + noteRef.current.clientHeight >=
            124
            // inputRef.current.clientHeight + noteRef.current.clientHeight >= 198
          ) {
            setTruncatePosition('noteContent');
          }
        }
      }
    }
  }, [expanded, inputRef, noteRef, ref, showExpandArrow]);

  const handleExpand = (limited: boolean, isExpanded: boolean) => {
    if (limited) {
      if (isExpanded) {
        return className.limitedCardContentExpanded;
      }
      return className.limitedCardContent;
    }
    return className.defaultCardContent;
  };
  const handleTruncate = (position: string) => {
    switch (position) {
      case 'inputContent':
        return className.truncateInputContent;
      case 'outputTitle':
        return className.truncateOutputTitle;
      case 'outputContent':
        return className.truncateOutputContent;
      case 'noteTitle':
        return className.truncateNoteTitle;
      case 'noteContent':
        return className.truncateNoteContent;
      default:
        return className.truncateInputContent;
    }
  };
  const handleHideTextOverflowCardContent = (position: string, isExpanded: boolean) => {
    if (position === 'inputContent') {
      if (!isExpanded) {
        return className.hideTextOverflowCardContent;
      }
      return className.limitedCardContentExpanded;
    }
    return className.defaultCardContent;
  };
  const handleHideTextOverflowActions = (position: string, isExpanded: boolean) => {
    if (position === 'inputContent' && !isExpanded) {
      return className.hideTextOverflowActions;
    }
    return className.actions;
  };

  return (
    <div ref={ref}>
      <Card className={className.root} variant="outlined">
        <CardContent
          className={`${handleExpand(showExpandArrow, expanded)}
          ${handleTruncate(truncatePosition)} ${handleHideTextOverflowCardContent(truncatePosition, expanded)}`}
        >
          {input && (
            <>
              <div className={className.title}>
                <Typography variant="h6" display="inline">
                  Input
                </Typography>
                <div>
                  <CopyToClipboardButton text={input} className={className.copyIcon}/>
                </div>
              </div>
              <div className={className.content} ref={inputRef}>
                <Typography variant="body1" className={className.code}>
                  {input.split('\n').map((string) => (
                    <React.Fragment key={string}>
                      {string}
                      <br />
                    </React.Fragment>
                  ))}
                </Typography>
              </div>
            </>
          )}
          {output && (
            <>
              <div className={className.title}>
                <Typography variant="h6" display="inline">
                  Output
                </Typography>
                <div>
                  <CopyToClipboardButton text={output} className={className.copyIcon}/>
                </div>
              </div>
              <div className={className.content} ref={outputRef}>
                <Typography variant="body1" className={className.code}>
                  {output.split('\n').map((string) => (
                    <React.Fragment key={string}>
                      {string}
                      <br />
                    </React.Fragment>
                  ))}
                </Typography>
              </div>
            </>
          )}
          {note && (
            <>
              <div className={className.title}>
                <Typography variant="h6" display="inline">
                  Note
                </Typography>
                <div>
                  <CopyToClipboardButton text={note} className={className.copyIcon}/>
                </div>
              </div>
              <div className={className.content} ref={noteRef}>
                <Typography variant="body1">
                  {note.split('\n').map((string) => (
                    <React.Fragment key={string}>
                      {string}
                      <br />
                    </React.Fragment>
                  ))}
                </Typography>
              </div>
            </>
          )}
        </CardContent>

        {showExpandArrow && (
          <CardActions className={`${className.actions} ${handleHideTextOverflowActions(truncatePosition, expanded)}`}>
            <IconButton onClick={() => setExpanded(!expanded)}>
              {expanded ? <Icon.ExpandLessOutlinedIcon /> : <Icon.ExpandMoreOutlinedIcon />}
            </IconButton>
          </CardActions>
        )}
      </Card>
    </div>
  );
}
