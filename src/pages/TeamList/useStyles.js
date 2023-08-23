import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  divider: {
    height: '1px',
    marginTop: '11px',
    border: `0px solid ${theme.palette.grey[300]}`,
    backgroundColor: theme.palette.grey[300],
  },
  alignedTextWrapper: {
    boxSizing: 'content-box',
  },
  alignedTextWrapperMd: {
    width: '190px',
  },
  alignedText: {
    marginTop: '23px',
    marginBottom: '16px',
  },
  textAlignedText: {
    marginTop: '0px',
    marginBottom: '16px',
  },
  addMemberButtonWrapper: {
    display: 'flex',
    flexDirection: 'row',
  },
  addMemberButton: {
    marginLeft: '270px',
  },
  fieldAlignedText: {
    marginTop: '18px',
  },
  input: {
    width: '30px',
    height: '40px',
    display: 'none',
    marginTop: '10px',
  },
  container: {
    maxHeight: 800,
  },
  tableHead: {
    height: '45px',
    borderBottomWidth: '1px',
    borderBottomStyle: 'solid',
    borderBottomColor: theme.palette.grey.A400,
  },
  column: {
    display: 'flex',
    justifyContent: 'center',
  },
  fileNameCell: {
    height: '40px',
    padding: 'unset',
    paddingLeft: '50px',
    borderBottomColor: theme.palette.grey.A700,
  },
  deleteCell: {
    height: '40px',
    padding: '8px 30px 4px 0',
    borderBottomColor: theme.palette.grey.A700,
  },
  deleteIcon: {
    height: '20px',
    width: '20px',
    cursor: 'pointer',
  },
  row: {
    height: '40px',
    '&:first-child': {
      borderTopColor: theme.palette.grey.A400,
      borderTopStyle: 'solid',
      borderTopWidth: '1px',
    },
  },
  select: {
    width: '350px',
  },
  paper: {
    width: '100%',
    overflowX: 'hidden',
  },
  title: {
    marginTop: '23px',
    marginBottom: '16px',
  },
}));

export default useStyles;
