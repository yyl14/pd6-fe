import React, { Component, useState } from 'react';
import PropTypes from 'prop-types';
import {
  TablePagination, Button, Typography, TextField, Grid,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { KeyboardArrowLeft, KeyboardArrowRight } from '@material-ui/icons';

const useStyle = makeStyles((theme) => ({
  root: {
    width: '1280px',
    position: 'absolute',
    left: '174px',
    border: 'transparent',
  },
}));

const PaginationBar = ({
  data, page, setPage, rowsPerPage, setRowsPerPage,
}) => {
  const classes = useStyle();
  const totalPage = Math.ceil(data.length / rowsPerPage);
  const [pageNumber, setPageNumber] = useState(1);

  const handleChangePage = (e, newPage) => {
    setPage(newPage);
  };
  const handleChangeRowsPerPage = (e) => {
    setRowsPerPage(parseInt(e.target.value, 10));
    setPage(0);
    setPageNumber(1);
  };

  const handleBackButtonClick = (e) => {
    handleChangePage(e, page - 1);
    setPageNumber(page);
  };

  const handleNextButtonClick = (e) => {
    handleChangePage(e, page + 1);
    setPageNumber(page + 2);
  };

  const pageNumberChange = (e) => {
    setPageNumber(e.target.value);
  };

  function handleKeyUp(e) {
    const { value } = e.target;
    const code = e.keyCode;
    if (code === 13 && (e.target.value <= totalPage)) { // enter
      handleChangePage(e, pageNumber - 1);
    }
  }

  const emptyAction = () => ('');

  return (
    <TablePagination
      className={classes.root}
      rowsPerPageOptions={[5, 10, 15]}
      colSpan={3}
      count={data.length}
      rowsPerPage={rowsPerPage}
      page={page}
      labelRowsPerPage=""
      labelDisplayedRows={({ count }) => (
        <Grid container direction="row" justifyContent="flex-end" alignItems="center" style={{ marginTop: '17.5px' }}>
          <Typography variant="body1" style={{ margin: '0 10px' }}>rows</Typography>
          <Button onClick={handleBackButtonClick} disabled={page === 0} aria-label="previous page">
            <KeyboardArrowLeft />
          </Button>
          <TextField
            type="text"
            value={pageNumber}
            onChange={pageNumberChange}
            onKeyUp={(e) => handleKeyUp(e)}
            style={{
              width: 100, height: 45, fontSize: 18, margin: '0 0 0 10px',
            }}
          />
          <Typography variant="body1" style={{ margin: '0 10px' }}>
            of
            {' '}
            {totalPage}
          </Typography>
          <Button
            onClick={handleNextButtonClick}
            disabled={page >= Math.ceil(count / rowsPerPage) - 1}
            aria-label="next page"
            style={{ marginRight: '20px' }}
          >
            <KeyboardArrowRight />
          </Button>
        </Grid>
      )}
      SelectProps={{
        inputProps: { 'aria-label': 'rows per page' },
        native: true,
      }}
      onPageChange={handleChangePage}
      onRowsPerPageChange={handleChangeRowsPerPage}
      ActionsComponent={emptyAction}
    />
  );
};

export default PaginationBar;
