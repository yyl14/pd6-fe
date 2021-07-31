import React, { useState } from 'react';
import { BrowserRouter as Router, Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import {
  Table, TableBody, TableHead, TableCell, TableContainer, TableFooter,
  TablePagination, TableRow, Paper, IconButton, SvgIcon, TextField, Typography, Grid,
} from '@material-ui/core';
import { KeyboardArrowLeft, KeyboardArrowRight } from '@material-ui/icons';
import { makeStyles } from '@material-ui/core/styles';
import PaginationBar from './PaginationBar';

const useStyle = makeStyles((theme) => ({
  header: {
    marginLeft: '173.5px',
    marginTop: '70px',
  },
  root: {
    width: '1280px',
    marginLeft: '166px',
    marginTop: '50px',
    borderRadius: 0,
    borderTopLeftRadius: '10px',
    borderTopRightRadius: '10px',
    boxShadow: 'none',
  },
  searchBar: {
    fontSize: '18px',
    paddingLeft: '15px',
    width: '350px',
    height: '45px',
    marginLeft: '20px',
    marginTop: '15px',
    borderRadius: '10px',
    borderWidth: '3px',
    border: '#CACACA',
  },
  searchBarBackground: {
    width: '1280px',
    height: '75px',
    backgroundColor: '#EAEAEA',
  },
  tableTitle: {
    height: '45px',
  },
}));

function createData(Language, Version, Status) {
  return { Language, Version, Status };
}

const dataDetail = [
  createData('Python', '3.8.1', 'Enable'),
  createData('Python', '3.8.2', 'Enable'),
  createData('Python', '3.8.3', 'Enable'),
  createData('Python', '3.8.4', 'Enable'),
  createData('Python', '3.8.5', 'Enable'),
  createData('Python', '2.7.1', 'Enable'),
  createData('Python', '2.7.2', 'Enable'),
  createData('Python', '2.7.3', 'Enable'),
  createData('Python', '2.7.4', 'Enable'),
  createData('Python', '2.7.5', 'Enable'),
  createData('C++', '2.7.1', 'Disable'),
  createData('C++', '2.7.2', 'Disable'),
  createData('C++', '2.7.3', 'Disable'),
  createData('C++', '2.7.4', 'Disable'),
];

createData.PropTypes = {
  Language: PropTypes.string.isRequired,
  Version: PropTypes.number.isRequired,
  Status: PropTypes.string.isRequired,
};

function ArrowIcon() {
  return (
    <SvgIcon>
      <path d="M12 4l-1.41 1.41L16.17 11H4v2h12.17l-5.58 5.59L12 20l8-8-8-8z" />
    </SvgIcon>
  );
}

const LangTable = () => {
  const classes = useStyle();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [searchTerm, setSearchTerm] = useState('');
  const emptyRows = rowsPerPage - Math.min(rowsPerPage, dataDetail.length - page * rowsPerPage);

  const handleChangePage = (e, newPage) => {
    setPage(newPage);
  };
  const handleChangeRowsPerPage = (e) => {
    setRowsPerPage(parseInt(e.target.value, 10));
    setPage(0);
  };

  const filterData = (datas) => datas.filter((data) => {
    const language = data.Language.toLowerCase();
    return language.includes(searchTerm);
  });
  const filteredData = filterData(dataDetail);

  return (
    <div>
      <Typography className={classes.header} variant="h3">Submission Language</Typography>
      <TableContainer component={Paper} className={classes.root}>
        <Grid className={classes.searchBarBackground}>
          <TableRow>
            <input
              className={classes.searchBar}
              type="text"
              placeHolder="Search"
              value={searchTerm}
              onChange={(e) => { setSearchTerm(e.target.value); }}
            />
          </TableRow>
        </Grid>
        <Table>
          <TableHead className={classes.tableTitle}>
            <TableCell style={{ fontWeight: 'bold' }} align="center">Language</TableCell>
            <TableCell style={{ fontWeight: 'bold' }} align="center">Version</TableCell>
            <TableCell style={{ fontWeight: 'bold' }} align="center">Status</TableCell>
            <TableCell />
          </TableHead>

          <TableBody>
            {(rowsPerPage > 0
              ? filteredData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              : filteredData
            ).map((data) => (
              <Router key={data.Version}>
                <TableRow>
                  <TableCell style={{ width: 160 }} align="center">
                    {data.Language}
                  </TableCell>
                  <TableCell style={{ width: 160 }} align="center">
                    {data.Version}
                  </TableCell>
                  <TableCell style={{ width: 160 }} align="center">
                    {data.Status}
                  </TableCell>
                  <TableCell align="right">
                    <Link to={`/admin/system/submitlang/${data.Language.toLowerCase()}/setting`}><ArrowIcon /></Link>
                  </TableCell>
                </TableRow>
              </Router>
            ))}

            {emptyRows > 0 && (
            <TableRow style={{ height: 69 * emptyRows }}>
              <TableCell colSpan={6} />
            </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>

      <PaginationBar
        data={dataDetail}
        page={page}
        setPage={setPage}
        rowsPerPage={rowsPerPage}
        setRowsPerPage={setRowsPerPage}
      />

    </div>
  );
};

export default LangTable;
