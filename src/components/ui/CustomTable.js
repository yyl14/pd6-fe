import {
  Typography,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  TextField,
  Button,
  Grid,
  MenuItem,
  InputBase,
  Select,
} from '@material-ui/core';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';

import { makeStyles, withStyles } from '@material-ui/core/styles';
import React, { useState } from 'react';

const useStyles = makeStyles((theme) => ({
  topContent: {
    // width: '80%',
    // maxWidth: '1280px',
    background: '#EAEAEA',
    borderRadius: '10px 10px 0px 0px',
    padding: '10px',
    display: 'flex',
    justifyContent: 'space-between',
    height: '75px',
  },
  search: {
    height: '60px',
  },
  buttons: {
    height: '60px',
  },
  head: {
    height: '45px',
  },
  divider: {
    margin: '0px',
  },
  children: {
    margin: '16px 0px 50px 50px',
  },
  root: {
    width: '100%',
  },
  container: {
    maxHeight: 800,
  },
  bottom: {
    height: '75px',
    display: 'flex',
    alignItems: 'center',
  },
}));

const BootstrapInput = withStyles((theme) => ({
  root: {
    'label + &': {
      marginTop: theme.spacing(3),
    },
  },
  input: {
    borderRadius: 4,
    position: 'relative',
    backgroundColor: theme.palette.background.paper,
    border: '1px solid #ced4da',
    fontSize: 16,
    padding: '10px 26px 10px 12px',
    transition: theme.transitions.create(['border-color', 'box-shadow']),
    // Use the system font instead of the default Roboto font.
    fontFamily: [
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(','),
    '&:focus': {
      borderRadius: 4,
      borderColor: '#80bdff',
      boxShadow: '0 0 0 0.2rem rgba(0,123,255,.25)',
    },
  },
}))(InputBase);

export default function CustomTable({
  buttons, columnName, dataColumnName, width, data, path, children,
}) {
  const classes = useStyles();
  const [curPage, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [search, setSearch] = useState('');

  const columns = [
    {
      id: dataColumnName[0], label: columnName[0], minWidth: width[0], align: 'center',
    },
    {
      id: dataColumnName[1], label: columnName[1], minWidth: width[1], align: 'center',
    },
    {
      id: dataColumnName[2], label: columnName[2], minWidth: width[2], align: 'center',
    },
  ];

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <>
      <div className={classes.topContent}>
        <TextField id="search" className={classes.search} placeholder="Search" variant="outlined" />
        <div className={classes.buttons}>{buttons}</div>
      </div>
      {/* <hr className={classes.divider} /> */}
      <Paper className={classes.root}>
        <TableContainer className={classes.container}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead className={classes.head}>
              <TableRow>
                {columns.map((column) => (
                  <TableCell
                    key={column.id}
                    align={column.align}
                    style={{ minWidth: column.minWidth }}
                  >
                    {column.label}
                  </TableCell>
                ))}
                <TableCell
                  key="link"
                  align="right"
                  style={{ minWidth: 30 }}
                />
              </TableRow>
            </TableHead>
            <TableBody>
              {data.slice(curPage * rowsPerPage, curPage * rowsPerPage + rowsPerPage).map((row) => (
                <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                  {columns.map((column) => {
                    const value = row[column.id];
                    return (
                      <TableCell key={column.id} align={column.align}>
                        {column.format && typeof value === 'number' ? column.format(value) : value}
                      </TableCell>
                    );
                  })}
                  <TableCell key="show" align="right">
                    Link
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <div className={classes.bottom}>
          <Select
            labelId="rows-per-page"
            id="rows-per-page"
            value={rowsPerPage}
            onChange={(e) => { setRowsPerPage(e.target.value); }}
            input={<BootstrapInput />}
          >
            <MenuItem value={5}>5</MenuItem>
            <MenuItem value={10}>10</MenuItem>
            <MenuItem value={25}>25</MenuItem>
            <MenuItem value={50}>50</MenuItem>
          </Select>
          <Typography variant="body1">rows</Typography>
          <Button><ArrowBackIosIcon style={{ height: '20px' }} /></Button>
          <BootstrapInput value={1} onChange={(e) => { setPage(e.target.value - 1); }} />
          <Typography variant="body1">
            of
            {' '}
            {Math.ceil(data.length / rowsPerPage)}
          </Typography>
          <Button onClick={handleChangePage} disabled="true"><ArrowForwardIosIcon style={{ height: '20px' }} /></Button>
        </div>
        {/* <TablePagination
          className={classes.bottom}
          rowsPerPageOptions={[5, 10, 25, 50, 100]}
          component="div"
          count={data.length}
          labelRowsPerPage=""
          rowsPerPage={rowsPerPage}
          page={curPage}
          // onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          backIconButtonProps={{ size: 'medium' }}
          nextIconButtonProps={{ size: 'medium' }}
          labelDisplayedRows={({ to, count, page }) => (
            <Grid container direction="row" alignItems="center" justifyContent="center">
              <Typography variant="body1">rows  </Typography>
              <Button><ArrowBackIosIcon style={{ height: '10px' }} /></Button>
              <TextField defaultValue={1} onChange={(e) => { setPage(e.target.value - 1); }} />

              <Typography variant="body1">
                of
                {' '}
                {Math.ceil(data.length / rowsPerPage)}
              </Typography>
              <Button onClick={handleChangePage}><ArrowForwardIosIcon style={{ height: '10px' }} /></Button>
            </Grid>
          )}
        /> */}
      </Paper>
      <div className={classes.children}>{children}</div>
    </>
  );
}
