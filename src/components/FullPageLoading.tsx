import { CircularProgress, Container, makeStyles } from '@material-ui/core';

const useStyles = makeStyles(() => ({
  container: {
    height: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
}));

function FullPageLoading() {
  const classNames = useStyles();
  return (
    <Container className={classNames.container}>
      <CircularProgress color="inherit" size={30} />
    </Container>
  );
}

export default FullPageLoading;
