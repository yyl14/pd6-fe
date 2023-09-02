import { Button, Container, Typography, makeStyles } from '@material-ui/core';
import { useClearCacheCtx } from 'react-clear-cache';

import Trademark from '@/components/Trademark';

const useStyles = makeStyles(() => ({
  container: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    height: '100vh',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    marginBottom: '8px',
  },
}));

export default function ClearCache() {
  const classNames = useStyles();
  const { emptyCacheStorage } = useClearCacheCtx();

  return (
    <Container className={classNames.container}>
      <Trademark />
      <Typography variant="h3" className={classNames.title}>
        Woof! PDOGS just updated!
      </Typography>
      <Button color="primary" onClick={() => emptyCacheStorage()} type="button">
        Say &quot;Good Puppy&quot; & Start
      </Button>
      <Typography variant="caption">
        This button clears the PDOGS browser cache, ensuring compatibility with the new version of website.
      </Typography>
    </Container>
  );
}
