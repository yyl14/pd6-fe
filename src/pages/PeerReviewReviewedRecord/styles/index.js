import { makeStyles } from '@material-ui/core';

export const useStyles = makeStyles((theme) => ({
  textfield: {
    width: '40vw',
  },
  buttons: {
    display: 'flex',
    justifyContent: 'flex-end',
  },
  textLink: {
    textDecoration: 'none',
    color: theme.palette.primary.main,
    '&:hover': {
      color: theme.palette.primary.dark,
    },
    '&:active': {
      color: theme.palette.primary.dark,
    },
  },
  newTabIcon: {
    marginLeft: '10px',
    transform: 'translateY(2px)',
    color: theme.palette.black.main,
  },
}));

export default useStyles;
