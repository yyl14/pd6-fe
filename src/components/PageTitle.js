import { makeStyles, Typography } from '@material-ui/core';

const useStyles = makeStyles(() => ({
  title: {
    marginBottom: '32px',
    wordBreak: 'break-word',
  },
}));

export default function PageTitle({ text }) {
  const classes = useStyles();

  return (
    <Typography variant="h3" className={classes.title}>
      {text}
    </Typography>
  );
}
