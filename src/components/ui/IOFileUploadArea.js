/* eslint-disable jsx-a11y/label-has-associated-control */
import {
  makeStyles, Typography, Button, Input, Paper,
  Table,
  TableContainer,
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
  deleteCell: {
    padding: '15px',
  },
  deleteIcon: {
    height: '20px',
    width: '20px',
    cursor: 'pointer',
  },
  row: {
    height: '40px',
  },
}));

export default function IOFileUploadArea({
  text, fileAcceptFormat, selectedFile, setSelectedFile, children,
}) {
  const classes = useStyles();
  const [fileNum, setFileNum] = useState(0);

  useEffect(() => {
    setFileNum(selectedFile.length);
  }, [selectedFile]);

  const handleUploadFile = (e) => {
    const newFiles = Object.keys(e.target.files).map((key) => e.target.files[key]);
    setSelectedFile(selectedFile.concat(newFiles));
  };

  const handleDelete = (e, deleteFile) => {
    const filtered = selectedFile.filter((file, index, arr) => file !== deleteFile);
    setSelectedFile(filtered);
  };

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
            accept={fileAcceptFormat}
            onChange={(e) => handleUploadFile(e)}
            multiple
          />
          <Button variant="outlined" color="primary" component="span" startIcon={<Icon.Folder />}>
            Browse
          </Button>
        </label>
        <Typography variant="body2" className={classes.fieldAlignedText}>
          {fileNum}
          {' '}
          files selected
        </Typography>
      </div>
      <Paper className={classes.root} elevation={0}>
        <TableContainer className={classes.container}>
          <Table>
            <TableBody>
              {selectedFile.map((row) => (
                <TableRow hover role="checkbox" tabIndex={-1} key={row.name} className={classes.row}>
                  <TableCell align="left">
                    {row === undefined ? 'error' : row.name}
                  </TableCell>
                  <TableCell key={`${row.id}-deleteIcon`} className={classes.deleteCell} align="right">
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
      <div>{children}</div>
    </>
  );
}
