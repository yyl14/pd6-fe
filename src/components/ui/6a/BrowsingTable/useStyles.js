import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  topContent1: {
    background: theme.palette.grey.A100,
    borderRadius: '10px 10px 0px 0px',
    padding: '5px 15px 15px 15px',
    display: 'flex',
    justifyContent: 'space-between',
    height: '75px',
  },
  topContent2: {
    background: theme.palette.grey.A100,
    borderRadius: '10px 10px 0px 0px',
    padding: '5px 15px 15px 15px',
    display: 'flex',
    justifyContent: 'flex-end',
    height: '75px',
  },
  searchFields: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'flex-start',
    flexShrink: 27,
  },
  buttons: {
    marginTop: '3px',
    height: '60px',
    flexShrink: 0,
  },
  children: {
    margin: '16px 0px 50px 50px',
  },
  root: {
    width: '100%',
  },

  filterSelect: {
    marginRight: '10px',
    width: 'auto',
  },
  filterItem: {
    minWidth: '180px',
  },

  tableRowContainerLeftSpacing: {
    width: '15px',
    padding: '0px',
  },
  tableColumnLeftSpacing: {
    width: '10px',
    padding: '0px',
  },
  tableHeadCell: {
    height: 'inherit',
    padding: '7px 0px',
    background: 'white',
    borderBottomWidth: '1px',
    borderBottomColor: theme.palette.grey.A400,
  },
  progressContainer: {
    height: 0,
    overflow: 'visible',
  },
  progress: {
    height: 3,
    zIndex: 1000,
  },
  column: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  columnLabelMoveLeft: {
    transform: 'translateX(-5px)',
  },
  columnLabelDefault: {
    transform: 'translateX(0px)',
  },
  columnComponent: {
    transform: 'translateX(5px) translateY(2px)',
  },
  row: {
    '& > :first-child': {
      paddingLeft: '25px', // 25px (Left space) + 5 px
    },
  },
  tableBodyCell: {
    padding: '17.5px 5px 17.5px 5px',
    overflowWrap: 'break-word',
    '&:hover~$stickyArrowCell': {
      backgroundImage: 'inherit',
    },
  },
  bottomWrapper: {
    display: 'flex',
    alignItems: 'center',
    paddingLeft: '15px',
    background: theme.palette.background.default,
    justifyContent: 'space-between',
  },
  bottom: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    background: theme.palette.background.default,
  },
  pageChangeButtons: {
    width: '70px',
    paddingTop: '11.5px',
  },
  pageRowSelect: {
    width: '100px',
    height: '50px',
    margin: '0px 5px 5px 5px',
  },
  pageText: {
    margin: '0px 5px 0px 5px',
  },
  pageIndexTextField: {
    width: '100px',
    height: '45px',
    margin: '0px 5px 0px 5px',
  },
  detailLink: {
    color: 'black',
  },
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
  toggleButtonIcon: {
    height: '20px',
    width: '20px',
  },
  arrowIcon: {
    height: '35px',
    margin: 'auto',
  },
  stickyArrowCell: {
    position: 'sticky',
    right: 0,
    zIndex: 100,
  },
  tableCellHover: {
    backgroundColor: 'inherit',
    backgroundImage: 'linear-gradient(rgba(255, 255, 255, 1), rgba(255, 255, 255, 1))',
    '&:hover': {
      backgroundImage: 'inherit',
    },
  },
  filterWrapper: {
    display: 'flex',
    flexDirection: 'row',
    // alignItems: 'center',
  },
  sortIcon: {
    marginLeft: '5px',
    verticalAlign: 'middle',
    cursor: 'pointer',
  },
  activeSortIcon: {
    backgroundColor: theme.palette.black.main,
    color: 'white',
    borderRadius: '10px',
    padding: '2px',
    width: '20px',
    height: '20px',
  },
  sortDropdownContent: {
    position: 'relative',
    backgroundColor: theme.palette.primary.contrastText,
    left: '30px',
    width: '100px',
    zIndex: 1,
    boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.25)',
    borderRadius: '10px',
    '& span': {
      color: theme.palette.black.main,
      padding: '12px',
      textDecoration: 'none',
      textAlign: 'center',
      display: 'block',
      '&:nth-child(1)': {
        borderRadius: '10px 10px 0 0',
      },
      '&:last-child': {
        borderRadius: '0 0 10px 10px',
      },
    },
    '& span:hover': {
      cursor: 'pointer',
      backgroundColor: theme.palette.grey.A100,
    },
  },
  selectedDirection: {
    backgroundColor: theme.palette.grey[300],
  },
  default: { color: theme.palette.black.dark },
  accepted: { color: theme.palette.green.main },
  error: { color: theme.palette.secondary.main },
  primary: { color: theme.palette.primary.main },
}));

export default useStyles;
