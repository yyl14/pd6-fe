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
  FormControl,
  Select,
  InputAdornment,
} from '@material-ui/core';

import { ArrowForward, CenterFocusStrong, FilterList } from '@material-ui/icons';
import SearchIcon from '@material-ui/icons/Search';

import { MdKeyboardArrowRight, MdKeyboardArrowLeft } from 'react-icons/md';

import { makeStyles, withStyles } from '@material-ui/core/styles';
import React, { useState, useEffect, useLocation } from 'react';
import { Link } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  topContent1: {
    // width: '80%',
    // maxWidth: '1280px',
    background: theme.palette.grey[100],
    borderRadius: '10px 10px 0px 0px',
    padding: '5px 15px 15px 15px',
    display: 'flex',
    justifyContent: 'space-between',
    height: '75px',
  },
  topContent2: {
    background: theme.palette.grey[100],
    borderRadius: '10px 10px 0px 0px',
    padding: '5px 15px 15px 15px',
    display: 'flex',
    justifyContent: 'flex-end',
    height: '75px',
  },
  search: {
    height: '60px',
    width: 250,
    marginLeft: '5px',
  },
  search2: {
    height: '60px',
    width: 360,
    marginLeft: '5px',
  },
  search3: {
    height: '60px',
    width: 550,
    marginLeft: '5px',
  },
  buttons: {
    marginTop: '3px',
    height: '60px',
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
  tableHead: {
    height: '60px',
    background: 'white',
    borderBottomWidth: '1px',
    borderBottomColor: theme.palette.grey.A400,
  },
  column: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  columnComponent: {
    transform: 'translateX(10px)',
  },
  row: {
    height: '60px',
  },

  bottom: {
    height: '75px',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    paddingRight: '15px',
    background: '#F8F8F8',
  },
  pageChangeButtons: {
    width: '70px',
    paddingTop: '11.5px',
  },
  pageRowSelect: {
    width: '100px',
    height: '50px',
    margin: '0px 5px 5px 5px',
  },
  pageText: {
    margin: '0px 5px 0px 5px',
  },
  pageIndexTextField: {
    width: '100px',
    height: '45px',
    margin: '0px 5px 0px 5px',
  },
  detailLink: {
    color: 'black',
  },
  textLink: {
    color: 'rgba(30, 165, 255, 1)',
    textDecorationLine: 'none',
  },
  filterIcon: {
    height: '15px',
  },
  arrowIcon: {
    height: '35px',
    margin: 'auto',
  },
}));

export default function CustomTable({
  hasSearch,
  searchWidthOption = 1,
  searchPlaceholder,
  buttons,
  columns,
  columnComponent,
  data,
  hasLink,
  path,
  children,
}) {
  const classes = useStyles();
  const [curPage, setPage] = useState(0);
  const [pageInput, setPageInput] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [search, setSearch] = useState('');
  const [filterData, setFilterData] = useState(data);

  const handleChangePage = (event, newPage) => {
    if (newPage + 1 <= Math.ceil(filterData.length / rowsPerPage) && newPage >= 0) {
      setPageInput(newPage + 1);
    }
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const searchWidth = (searchWidthOptions) => {
    switch (searchWidthOptions) {
      case 1:
        return classes.search;
      case 2:
        return classes.search2;
      case 3:
        return classes.search3;
      default:
        return classes.search;
    }
  };

  useEffect(() => {
    if (pageInput <= Math.ceil(filterData.length / rowsPerPage) && pageInput >= 1) {
      setPage(pageInput - 1);
    }
  }, [filterData.length, pageInput, rowsPerPage]);

  useEffect(() => {
    if (search !== '') {
      const newData = data.filter((row) => {
        let cnt = 0;
        columns.forEach((column) => {
          if (row[column.id].indexOf(search) >= 0) {
            cnt += 1;
          }
        });
        return cnt > 0;
      });
      setFilterData(newData);
    } else {
      setFilterData(data);
    }
  }, [columns, data, search]);

  return (
    <>
      <div className={hasSearch ? classes.topContent1 : classes.topContent2}>
        { hasSearch && (
        <TextField
          id="search"
          className={searchWidth(searchWidthOption)}
          onChange={(e) => {
            setSearch(e.target.value);
          }}
          value={search}
          placeholder={searchPlaceholder}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
        />
        )}
        <div className={classes.buttons}>{buttons}</div>
      </div>

      <Paper className={classes.root} elevation={0}>
        <TableContainer className={classes.container}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                {columns.map((column) => (
                  <TableCell key={column.id} align={column.align} className={classes.tableHead} style={{ minWidth: column.minWidth, width: column.width }}>
                    <div className={classes.column}>
                      {column.label}
                      <div className={classes.columnComponent}>
                        { columnComponent && columnComponent[columns.findIndex((x) => x.id === column.id)]}
                      </div>
                    </div>
                  </TableCell>
                ))}
                {hasLink
                  ? (<TableCell key="link" align="right" className={classes.tableHead} style={{ minWidth: 20 }} />
                  ) : (<TableCell key="blank" align="right" className={classes.tableHead} style={{ minWidth: 20 }} />)}
              </TableRow>
            </TableHead>
            <TableBody>
              {filterData.slice(curPage * rowsPerPage, curPage * rowsPerPage + rowsPerPage).map((row) => (
                <TableRow hover role="checkbox" tabIndex={-1} key={row[columns[0].id]} className={classes.row}>
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
                  {hasLink ? (
                    <TableCell key={`${row.id}-show`} align="right">
                      <Link to={path[filterData.indexOf(row)]} className={classes.detailLink}>
                        <ArrowForward style={{ height: '20px' }} />
                      </Link>
                    </TableCell>
                  ) : (<TableCell key={`${row.id}-blank`} align="right" style={{ minWidth: 20 }} />)}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <div className={classes.bottom}>
          <FormControl variant="outlined">
            <Select
              className={classes.pageRowSelect}
              labelId="rows-per-page"
              id="rows-per-page"
              value={rowsPerPage}
              onChange={(e) => {
                setRowsPerPage(e.target.value);
              }}
            >
              <MenuItem value={5}>5</MenuItem>
              <MenuItem value={10}>10</MenuItem>
              <MenuItem value={25}>25</MenuItem>
              <MenuItem value={50}>50</MenuItem>
            </Select>
          </FormControl>

          <Typography className={classes.pageText} variant="body1">
            rows
          </Typography>
          <Button
            className={classes.pageChangeButtons}
            onClick={(e) => {
              handleChangePage(e, curPage - 1);
            }}
          >
            <MdKeyboardArrowLeft className={classes.arrowIcon} />
          </Button>
          <TextField
            className={classes.pageIndexTextField}
            value={pageInput}
            onChange={(e) => {
              setPageInput(e.target.value);
            }}
          />
          <Typography className={classes.pageText} variant="body1">
            of
            {' '}
            {Math.ceil(filterData.length / rowsPerPage)}
          </Typography>
          <Button
            className={classes.pageChangeButtons}
            onClick={(e) => {
              handleChangePage(e, curPage + 1);
            }}
          >
            <MdKeyboardArrowRight className={classes.arrowIcon} />
          </Button>
        </div>
      </Paper>
      <div className={classes.children}>{children}</div>
    </>
  );
}
