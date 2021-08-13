import React from 'react';
import styled from 'styled-components';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Icon from './icon/index';

const StyledPaper = styled(Paper)`
  padding: 5px;
  text-align: center;
  width: 18vw;
  margin: 5px;
  display: inherit;
`;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'inline-block',
  },
  svg: {
    '& path': {
      fill: theme.palette.primary.main,
    },
  },
}));

export default function IconList() {
  const classes = useStyles();

  return (
    <div>
      <pre> visit /components/ui/IconUsage.js</pre>
      <Grid className={classes.root}>
        <StyledPaper>
          <Icon.Dots className={classes.svg} />
          <p>Dots</p>
        </StyledPaper>
        <StyledPaper>
          <Icon.Advancedsearch />
          <p>Advancedsearch</p>
        </StyledPaper>
        <StyledPaper>
          <Icon.Challenge />
          <p>Challenge</p>
        </StyledPaper>
        <StyledPaper>
          <Icon.Class />
          <p>Class</p>
        </StyledPaper>
        <StyledPaper>
          <Icon.Collapse />
          <p>Collapse</p>
        </StyledPaper>
        <StyledPaper>
          <Icon.Confirmed />
          <p>Confirmed</p>
        </StyledPaper>
        <StyledPaper>
          <Icon.Copy />
          <p>Copy</p>
        </StyledPaper>
        <StyledPaper>
          <Icon.Download />
          <p>Download</p>
        </StyledPaper>
        <StyledPaper>
          <Icon.Expand />
          <p>Expand</p>
        </StyledPaper>
        <StyledPaper>
          <Icon.Folder />
          <p>Folder</p>
        </StyledPaper>
        <StyledPaper>
          <Icon.Overview />
          <p>Overview</p>
        </StyledPaper>
        <StyledPaper>
          <Icon.Paper />
          <p>Paper</p>
        </StyledPaper>
        <StyledPaper>
          <Icon.Peerreview />
          <p>Peerreview</p>
        </StyledPaper>
        <StyledPaper>
          <Icon.Project />
          <p>Project</p>
        </StyledPaper>
        <StyledPaper>
          <Icon.Statistic />
          <p>Statistic</p>
        </StyledPaper>
        <StyledPaper>
          <Icon.Submission />
          <p>Submission</p>
        </StyledPaper>
        <StyledPaper>
          <Icon.Trash />
          <p>Trash</p>
        </StyledPaper>
        <StyledPaper>
          <Icon.Upload />
          <p>Upload</p>
        </StyledPaper>
        <StyledPaper>
          <Icon.TA />
          <p>TA</p>
        </StyledPaper>
        <StyledPaper>
          <Icon.StatusCE />
          <p>StatusCE</p>
        </StyledPaper>
        <StyledPaper>
          <Icon.StatusMLE />
          <p>StatusMLE</p>
        </StyledPaper>
        <StyledPaper>
          <Icon.StatusOTR />
          <p>StatusOTR</p>
        </StyledPaper>
        <StyledPaper>
          <Icon.StatusRE />
          <p>StatusRE</p>
        </StyledPaper>
        <StyledPaper>
          <Icon.StatusRF />
          <p>StatusRF</p>
        </StyledPaper>
        <StyledPaper>
          <Icon.StatusSE />
          <p>StatusSE</p>
        </StyledPaper>
        <StyledPaper>
          <Icon.StatusTLE />
          <p>StatusTLE</p>
        </StyledPaper>
        <StyledPaper>
          <Icon.StatusWA />
          <p>StatusWA</p>
        </StyledPaper>
        <StyledPaper>
          <Icon.HistoryIcon />
          <p>HistoryIcon</p>
        </StyledPaper>
        <StyledPaper>
          <Icon.BookIcon />
          <p>BookIcon</p>
        </StyledPaper>
        <StyledPaper>
          <Icon.StarIcon />
          <p>StarIcon</p>
        </StyledPaper>
        <StyledPaper>
          <Icon.ArrowForwardRoundedIcon />
          <p>ArrowForwardRoundedIcon</p>
        </StyledPaper>
        <StyledPaper>
          <Icon.ArrowBackRoundedIcon />
          <p>ArrowBackRoundedIcon</p>
        </StyledPaper>
        <StyledPaper>
          <Icon.ChevronLeftOutlinedIcon />
          <p>ChevronLeftOutlinedIcon</p>
        </StyledPaper>
        <StyledPaper>
          <Icon.ChevronRightOutlinedIcon />
          <p>ChevronRightOutlinedIcon</p>
        </StyledPaper>
        <StyledPaper>
          <Icon.ExpandMoreOutlinedIcon />
          <p>ExpandMoreOutlinedIcon</p>
        </StyledPaper>
        <StyledPaper>
          <Icon.ExpandLessOutlinedIcon />
          <p>ExpandLessOutlinedIcon</p>
        </StyledPaper>
        <StyledPaper>
          <Icon.SupervisedUserCircleIcon />
          <p>SupervisedUserCircleIcon</p>
        </StyledPaper>
        <StyledPaper>
          <Icon.BlockIcon />
          <p>BlockIcon</p>
        </StyledPaper>
        <StyledPaper>
          <Icon.RefreshOutlinedIcon />
          <p>RefreshOutlinedIcon</p>
        </StyledPaper>
        <StyledPaper>
          <Icon.LinkOutlinedIcon />
          <p>LinkOutlinedIcon</p>
        </StyledPaper>
      </Grid>
    </div>
  );
}
