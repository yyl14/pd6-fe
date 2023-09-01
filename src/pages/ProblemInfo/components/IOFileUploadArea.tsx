/* eslint-disable jsx-a11y/label-has-associated-control */
import {
  Button,
  Paper,
  Snackbar,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  makeStyles,
} from '@material-ui/core';
import { useEffect, useState } from 'react';

import Icon from '@/components/icon';

import { IOUploadCardTableSchema } from '../types';

const useStyles = makeStyles((theme) => ({
  wrapper: {
    display: 'flex',
    flexDirection: 'row',
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
  browseButton: {
    marginRight: '10px',
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
  root: {
    width: '100%',
    overflowX: 'hidden',
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
}));

interface IOFileUploadAreaProps {
  isSample: boolean;
  selectedFiles: Record<number, IOUploadCardTableSchema>;
  setSelectedFiles: React.Dispatch<React.SetStateAction<Record<number, IOUploadCardTableSchema>>>;
}
export default function IOFileUploadArea({ isSample, selectedFiles, setSelectedFiles }: IOFileUploadAreaProps) {
  const classes = useStyles();

  const [tableData, setTableData] = useState<Record<number, IOUploadCardTableSchema>>([]);
  const [fileNum, setFileNum] = useState(0);
  const [errorPopup, setErrorPopup] = useState(false);

  const titleText = isSample ? 'Sample Testing Data' : 'Testing Data';

  const parseIndexAndType = (fileName: string): [number, string] =>
    isSample
      ? [Number(fileName.slice(6, fileName.indexOf('.'))), fileName.slice(fileName.indexOf('.') + 1)]
      : [Number(fileName.slice(0, fileName.indexOf('.'))), fileName.slice(fileName.indexOf('.') + 1)];

  const handleUploadFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newFiles = [...(e.target.files ?? [])];
    const newSelectedFiles = newFiles.reduce((acc: Record<number, IOUploadCardTableSchema>, file: File) => {
      const [index, type] = parseIndexAndType(file.name);

      if (!Number.isInteger(index) || index === 0) {
        setErrorPopup(true);
        return { ...acc };
      }
      if (type === 'in') {
        if (acc[index] === undefined) {
          // no corresponding .out file
          return {
            ...acc,
            [index]: {
              id: index,
              in: file,
              out: null,
            },
          };
        }
        return {
          ...acc,
          [index]: {
            ...acc[index],
            in: file,
          },
        };
      }
      if (type === 'out') {
        if (acc[index] === undefined) {
          // no corresponding .in file
          return {
            ...acc,
            [index]: {
              id: index,
              in: null,
              out: file,
            },
          };
        }
        return {
          ...acc,
          [index]: {
            ...acc[index],
            out: file,
          },
        };
      }
      // error
      setErrorPopup(true);
      return acc;
    }, selectedFiles);

    // object to array
    setSelectedFiles(newSelectedFiles);
  };

  const handleDelete = (deleteRow: IOUploadCardTableSchema) => {
    const filtered = Object.keys(selectedFiles).reduce(
      (acc, key) =>
        Number(key) === Number(deleteRow.id)
          ? acc
          : {
              ...acc,
              [Number(key)]: selectedFiles[Number(key)],
            },
      {} as Record<number, IOUploadCardTableSchema>,
    );
    setSelectedFiles(filtered);
  };

  useEffect(() => {
    setFileNum(Object.keys(selectedFiles).length);
    setTableData(Object.keys(selectedFiles).map((key) => selectedFiles[Number(key)]));
  }, [selectedFiles]);

  return (
    <>
      <div className={`${classes.wrapper}`}>
        <div className={`${classes.alignedTextWrapper} ${classes.alignedTextWrapperMd}`}>
          <Typography variant="body1" className={classes.fieldAlignedText}>
            {titleText}
          </Typography>
        </div>
        <label htmlFor="upload-file">
          <input
            style={{ display: 'none' }}
            id="upload-file"
            name="upload-file"
            type="file"
            accept=".in, .out"
            onChange={(e) => handleUploadFile(e)}
            multiple
          />
          <Button
            className={classes.browseButton}
            variant="outlined"
            color="primary"
            component="span"
            startIcon={<Icon.Folder />}
          >
            Browse
          </Button>
        </label>
        {fileNum !== 0 && (
          <Typography variant="body2" className={classes.fieldAlignedText}>
            {fileNum} files selected
          </Typography>
        )}
      </div>
      {fileNum !== 0 && (
        <Paper className={classes.root} elevation={0}>
          <TableContainer className={classes.container}>
            <Table>
              <TableHead className={classes.tableHead}>
                <TableRow>
                  <TableCell
                    key="input"
                    align="center"
                    style={{ minWidth: 150, width: 150, border: 'none' }}
                    className={classes.fileNameCell}
                  >
                    <div className={classes.column}>
                      <b>Input File</b>
                    </div>
                  </TableCell>
                  <TableCell
                    key="output"
                    align="center"
                    style={{ minWidth: 150, width: 150, border: 'none' }}
                    className={classes.fileNameCell}
                  >
                    <div className={classes.column}>
                      <b>Output File</b>
                    </div>
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {Object.values(tableData).map((row) => (
                  <TableRow hover role="checkbox" tabIndex={-1} key={row.id} className={classes.row}>
                    <TableCell align="center" className={classes.fileNameCell}>
                      <Typography variant="body2">
                        {row.in === undefined || row.in === null ? '' : row.in.name}
                      </Typography>
                    </TableCell>
                    <TableCell align="center" className={classes.fileNameCell}>
                      <Typography variant="body2">
                        {row.out === undefined || row.out === null ? '' : row.out.name}
                      </Typography>
                    </TableCell>
                    <TableCell className={classes.deleteCell} align="right">
                      <Icon.Trash
                        className={classes.deleteIcon}
                        onClick={() => {
                          handleDelete(row);
                        }}
                      />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
      )}
      <Snackbar
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        open={errorPopup}
        onClose={() => setErrorPopup(false)}
        message="Filename does not match the naming format"
        key="errorMsg"
      />
    </>
  );
}
