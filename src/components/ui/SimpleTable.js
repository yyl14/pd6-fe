import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@material-ui/core';

import { makeStyles } from '@material-ui/core/styles';
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
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
  row: {
    height: '60px',
  },
  textLink: {
    textDecoration: 'none',
    color: theme.palette.primary.main,
  },
}));

export default function SimpleTable({
  columns,
  data,
}) {
  const classes = useStyles();
  const [filterData, setFilterData] = useState(data);

  useEffect(() => {
    setFilterData(data);
  }, [columns, data]);

  return (
    <>
      <Paper className={classes.root} elevation={0}>
        <TableContainer className={classes.container}>
          <Table>
            <TableHead className={classes.tableHead}>
              <TableRow>
                {columns.map((column) => (
                  <TableCell key={column.id} align={column.align} style={{ minWidth: column.minWidth, width: column.width, border: 'none' }}>
                    <div className={classes.column}>
                      <b>{column.label}</b>
                    </div>
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {filterData.map((row) => (
                <TableRow hover role="checkbox" tabIndex={-1} key={row.id} className={classes.row}>
                  {columns.map((column) => {
                    if (column.type === 'link') {
                      const link = row[column.link_id];
                      const value = row[column.id];
                      return (
                        <TableCell key={column.id} align={column.align}>
                          <Link to={link} className={classes.textLink}>{column.format && typeof value === 'number' ? column.format(value) : value}</Link>
                        </TableCell>
                      );
                    }
                    const value = row[column.id];
                    return (
                      <TableCell key={column.id} align={column.align}>
                        {column.format && typeof value === 'number' ? column.format(value) : value}
                      </TableCell>
                    );
                  })}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </>
  );
}
