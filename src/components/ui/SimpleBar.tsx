import { Typography, makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  topContent: {
    // width: '80%',
    // maxWidth: '1280px',
    display: 'flex',
    justifyContent: 'space-between',
  },
  title: {
    transform: 'translate(0px, 20px)',
  },
  buttons: {
    height: '60px',
  },
  buttonsBelow: {
    marginTop: '6px',
    width: '21.8%',
    display: 'flex',
    justifyContent: 'flex-end',
  },
  divider: {
    height: '1px',
    margin: '0px',
    border: `0px solid ${theme.palette.grey[300]}`,
    backgroundColor: theme.palette.grey[300],
  },
  bottomContent: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  children: {
    margin: '16px 0px 50px 50px',
    width: 'calc(100% - 50px)',
  },
  childrenNoIndent: {
    margin: '16px 0px 50px 50px',
  },
  childrenWithChildrenButtons: {
    margin: '16px 0px 50px 50px',
    width: '70.9%',
  },
  noIndent: {
    margin: '16px 0px 50px 0px',
    width: '100%',
  },
}));

interface SimpleBarProps {
  title: string;
  buttons?: JSX.Element | null;
  childrenButtons?: JSX.Element | null;
  children?: JSX.Element | null | undefined;
  noIndent?: boolean;
}

export default function SimpleBar({
  title,
  buttons = null,
  childrenButtons = null,
  children = null,
  noIndent = false,
}: SimpleBarProps) {
  const classes = useStyles();
  return (
    <>
      <div className={classes.topContent}>
        <Typography variant="h4" className={classes.title}>
          {title}
        </Typography>
        <div className={classes.buttons}>{buttons}</div>
      </div>
      <hr className={classes.divider} />
      <div className={classes.bottomContent}>
        <div
          className={`${childrenButtons ? classes.childrenWithChildrenButtons : classes.children} ${
            noIndent && classes.noIndent
          }`}
        >
          {children}
        </div>
        {childrenButtons && <div className={`${classes.buttons} ${classes.buttonsBelow}`}>{childrenButtons}</div>}
      </div>
    </>
  );
}
