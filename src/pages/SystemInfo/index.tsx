import { Typography, makeStyles } from '@material-ui/core';

import AlignedText from '@/components/AlignedText';
import PageTitle from '@/components/PageTitle';
import SimpleBar from '@/components/SimpleBar';

const useStyles = makeStyles(() => ({
  code: {
    fontFamily: 'Noto Sans Mono',
  },
}));

export default function SystemInfo() {
  const classNames = useStyles();
  return (
    <>
      <PageTitle text="System Info" />
      <SimpleBar title="Programming Language Compile/Run Commands">
        <AlignedText text="C++ 11" childrenType="text">
          <Typography variant="body2" component="code" className={classNames.code}>
            {'g++ <code> -O2 -std=c++11 -w -static -o <compiled>'}
          </Typography>
        </AlignedText>
        <AlignedText text="C++ 17" childrenType="text">
          <Typography variant="body2" component="code" className={classNames.code}>
            {'g++ <code> -O2 -std=c++17 -w -static -o <compiled>'}
          </Typography>
        </AlignedText>
        <AlignedText text="Python 3.5" childrenType="text">
          <Typography variant="body2" component="code" className={classNames.code}>
            {'python3.5 <code>'}
          </Typography>
        </AlignedText>
        <AlignedText text="Python 3.9" childrenType="text">
          <Typography variant="body2" component="code" className={classNames.code}>
            {'python3.9 <code>'}
          </Typography>
        </AlignedText>
      </SimpleBar>
    </>
  );
}
