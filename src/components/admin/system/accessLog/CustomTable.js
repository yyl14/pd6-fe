import React, { useState } from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import TablePagination from '@material-ui/core/TablePagination';

const CustomTable = ({ data }) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <Paper>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Log ID</TableCell>
              <TableCell align="center">Student ID</TableCell>
              <TableCell align="center">Real Name</TableCell>
              <TableCell align="center">Username</TableCell>
              <TableCell align="center">IP</TableCell>
              <TableCell align="center">Resource Path</TableCell>
              <TableCell align="center">Request Method</TableCell>
              <TableCell align="center">Access Time</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => (
              <TableRow key={row.name}>
                <TableCell align="center">{row.LogID}</TableCell>
                <TableCell align="center">{row.StudentID}</TableCell>
                <TableCell align="center">{row.RealName}</TableCell>
                <TableCell align="center">{row.Username}</TableCell>
                <TableCell align="center">{row.IP}</TableCell>
                <TableCell align="center">{row.ResourcePath}</TableCell>
                <TableCell align="center">{row.RequestMethod}</TableCell>
                <TableCell align="center">{row.AccessTime}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={data.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
};

export default CustomTable;
