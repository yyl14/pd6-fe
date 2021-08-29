/* eslint-disable jsx-a11y/label-has-associated-control */
import {
  makeStyles,
  Typography,
  Button,
  Input,
  Paper,
  Table,
  TableContainer,
  TableHead,
  TableBody,
  TableCell,
  TableRow,
} from '@material-ui/core';
import React, { useState, useEffect } from 'react';
import Icon from './icon/index';
import SimpleTable from './SimpleTable';

const useStyles = makeStyles((theme) => ({
  wrapper: {
    display: 'flex',
    flexDirection: 'row',
    // verticalAlign: 'center',
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
    overflowX: 'hide',
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

export default function IOFileUploadArea({
  text, uploadCase, selectedFile, setSelectedFile,
}) {
  const classes = useStyles();

  const [tableData, setTableData] = useState([]);

  const [fileNum, setFileNum] = useState(0);

  const handleUploadFile = (e) => {
    const newFiles = Object.keys(e.target.files).map((key) => e.target.files[key]);
    switch (uploadCase) {
      case 'sample': {
        const newSelectedFile = [...selectedFile];
        // console.log(newSelectedFile);
        newFiles.forEach((file) => {
          const index = parseInt(file.name.slice(6, file.name.indexOf('.')), 10);
          if (!Number.isInteger(index)) {
            console.log('file format error');
            return;
          }
          const type = file.name.slice(file.name.indexOf('.') + 1);
          if (type === 'in') {
            if (newSelectedFile[index] === undefined) {
              newSelectedFile[index] = {
                id: index,
                in: file,
                out: null,
              };
            } else {
              newSelectedFile[index] = {
                ...newSelectedFile[index],
                in: file,
              };
            }
          } else if (type === 'out') {
            if (newSelectedFile[index] === undefined) {
              newSelectedFile[index] = {
                id: index,
                in: null,
                out: file,
              };
            } else {
              newSelectedFile[index] = {
                ...newSelectedFile[index],
                out: file,
              };
            }
          } else {
            console.log('File Format Error');
          }
          // console.log(newSelectedFile[index]);
        });
        setSelectedFile(newSelectedFile);
        // console.log('this is for sample');
        break;
      }
      case 'testcase': {
        const newSelectedFile = [...selectedFile];
        // console.log(newSelectedFile);
        newFiles.forEach((file) => {
          const index = parseInt(file.name.slice(0, file.name.indexOf('.')), 10);
          if (!Number.isInteger(index)) {
            console.log('file format error');
            return;
          }
          const type = file.name.slice(file.name.indexOf('.') + 1);
          if (type === 'in') {
            if (newSelectedFile[index] === undefined) {
              newSelectedFile[index] = {
                id: index,
                in: file,
                out: null,
              };
            } else {
              newSelectedFile[index] = {
                ...newSelectedFile[index],
                in: file,
              };
            }
          } else if (type === 'out') {
            if (newSelectedFile[index] === undefined) {
              newSelectedFile[index] = {
                id: index,
                in: null,
                out: file,
              };
            } else {
              newSelectedFile[index] = {
                ...newSelectedFile[index],
                out: file,
              };
            }
          } else {
            console.log('File Format Error');
          }
          // console.log(newSelectedFile[index]);
        });
        setSelectedFile(newSelectedFile);
        // console.log('this is for sample');
        break;
      }
      default:
        console.log('File Format Error');
    }
  };

  const handleDelete = (e, deleteRow) => {
    const filtered = selectedFile.filter((file, index, arr) => file !== deleteRow);
    setSelectedFile(filtered);
  };

  useEffect(() => {
    const newTableData = [];
    let newNum = 0;
    selectedFile.forEach((item) => {
      if (item !== undefined) {
        if (item.in !== null) {
          newNum += 1;
        }
        if (item.out !== null) {
          newNum += 1;
        }
        newTableData.push(item);
      }
    });
    setFileNum(newNum);
    setTableData(newTableData);
  }, [selectedFile]);

  return (
    <>
      <div className={`${classes.wrapper}`}>
        <div className={`${classes.alignedTextWrapper} ${classes.alignedTextWrapperMd}`}>
          <Typography variant="body1" className={classes.fieldAlignedText}>
            {text}
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
            {fileNum}
            {' '}
            files selected
          </Typography>
        )}
      </div>
      {fileNum !== 0 && (
      <Paper className={classes.root} elevation={0}>
        <TableContainer className={classes.container}>
          <Table>
            <TableHead className={classes.tableHead}>
              <TableRow>
                <TableCell key="input" align="center" style={{ minWidth: 50, width: 80, border: 'none' }} className={classes.fileNameCell}>
                  <div className={classes.column}>
                    <b>Input File</b>
                  </div>
                </TableCell>
                <TableCell key="output" align="center" style={{ minWidth: 50, width: 80, border: 'none' }} className={classes.fileNameCell}>
                  <div className={classes.column}>
                    <b>Output File</b>
                  </div>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {tableData.map((row) => (
                <TableRow hover role="checkbox" tabIndex={-1} key={row.id} className={classes.row}>
                  <TableCell align="left" className={classes.fileNameCell}>
                    <Typography variant="body2">{row.in === undefined || row.in === null ? '' : row.in.name}</Typography>
                  </TableCell>
                  <TableCell align="left" className={classes.fileNameCell}>
                    <Typography variant="body2">{row.out === undefined || row.out === null ? '' : row.out.name}</Typography>
                  </TableCell>
                  <TableCell className={classes.deleteCell} align="right">
                    <Icon.Trash
                      className={classes.deleteIcon}
                      onClick={(e) => {
                        handleDelete(e, row);
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
    </>
  );
}
