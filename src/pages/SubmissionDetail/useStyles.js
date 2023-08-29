import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  textLink: {
    textDecoration: 'none',
    color: theme.palette.primary.main,
    '&:hover': {
      color: theme.palette.primary.hover,
    },
    '&:active': {
      color: theme.palette.primary.dark,
    },
  },
  generalButtons: {
    display: 'flex',
    justifyContent: 'flex-end',
  },
  resultTable: {
    width: '100%',
  },
  acceptedStatus: {
    color: theme.palette.green.main,
  },
}));

export default useStyles;
