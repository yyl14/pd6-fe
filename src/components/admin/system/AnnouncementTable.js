import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import { Button } from '@material-ui/core';

import { useHistory } from 'react-router-dom';
import CustomTable from '../../ui/CustomTable';

// DO NOT USE THIS COMPONENT
const columns = [
  {
    id: 'ID',
    label: 'ID',
    minWidth: 10,
    align: 'center',
  },
  {
    id: 'Title',
    label: 'Title',
    minWidth: 10,
    align: 'center',
  },
  {
    id: 'PostTime',
    label: 'Post Time',
    minWidth: 10,
    align: 'center',
  },
  {
    id: 'EndTime',
    label: 'End Time',
    minWidth: 10,
    align: 'center',
  },
];

function createData(ID, Title, PostTime, EndTime) {
  return {
    ID,
    Title,
    PostTime,
    EndTime,
  };
}

const rows = [
  createData('21', '系統維修', '2021-06-20, 09:21', '2021-06-20, 09:21'),
  createData('21', '系統維修', '2021-06-20, 09:21', '2021-06-20, 09:21'),
  createData('21', '系統維修', '2021-06-20, 09:21', '2021-06-20, 09:21'),
];

const useStyles = makeStyles({
  root: {
    width: '75%',
  },
  container: {
    maxHeight: 440,
  },
});

export default function AnnouncementTable() {
  const history = useHistory();
  const classes = useStyles();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const add = () => {
    history.push('/admin/system/announcement/add');
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
  // <Paper className={classes.root}>
  //   <TableContainer className={classes.container}>
  //     <Table stickyHeader aria-label="sticky table">
  //       <TableHead>
  //         <TableRow>
  //           {columns.map((column) => (
  //             <TableCell
  //               key={column.id}
  //               align={column.align}
  //               style={{ minWidth: column.minWidth }}
  //             >
  //               {column.label}
  //             </TableCell>
  //           ))}
  //         </TableRow>
  //       </TableHead>
  //       <TableBody>
  //         {rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => (
  //           <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
  //             {columns.map((column) => {
  //               const value = row[column.id];
  //               return (
  //                 <TableCell key={column.id} align={column.align}>
  //                   {column.format && typeof value === 'number' ? column.format(value) : value}
  //                 </TableCell>
  //               );
  //             })}
  //           </TableRow>
  //         ))}
  //       </TableBody>
  //     </Table>
  //   </TableContainer>
  //   <TablePagination
  //     rowsPerPageOptions={[5, 10, 25]}
  //     component="div"
  //     count={rows.length}
  //     rowsPerPage={rowsPerPage}
  //     page={page}
  //     onPageChange={handleChangePage}
  //     onRowsPerPageChange={handleChangeRowsPerPage}
  //   />
  // </Paper>

    // TODO: move this to AnnouncementHome.js
    <CustomTable
      searchPlaceholder="Search"
      buttons={(
        <Button variant="contained" color="primary" onClick={add} placeholder="Search">
          Add Announcement
        </Button>
      )}
      data={rows}
      columns={columns}
      hasFilter={[false, false, false, false]}
      dataColumnName={['ID', 'Title', 'PostTime', 'EndTime']}
      hasLink={false}
    />
  );
}
