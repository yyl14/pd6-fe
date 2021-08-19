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
  IconButton,
} from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import Tooltip from '@material-ui/core/Tooltip';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import React, { useState, useEffect, useLocation } from 'react';
import { Link } from 'react-router-dom';
import { nanoid } from 'nanoid';
import { customTableMount } from '../../actions/component/autoTable';
import Icon from './icon/index';

/* eslint react-hooks/exhaustive-deps: 0 */

const useStyles = makeStyles((theme) => ({
  topContent1: {
    background: theme.palette.grey.A100,
    borderRadius: '10px 10px 0px 0px',
    padding: '5px 15px 15px 15px',
    display: 'flex',
    justifyContent: 'space-between',
    height: '75px',
  },
  topContent2: {
    background: theme.palette.grey.A100,
    borderRadius: '10px 10px 0px 0px',
    padding: '5px 15px 15px 15px',
    display: 'flex',
    justifyContent: 'flex-end',
    height: '75px',
  },
  search1: {
    height: '60px',
    width: 300,
  },
  search2: {
    height: '60px',
    width: 380,
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

  tableRowContainerLeftSpacing: {
    width: '15px',
    padding: '0px',
  },
  tableColumnLeftSpacing: {
    width: '10px',
    padding: '0px',
  },
  tableHeadCell: {
    height: '45px',
    padding: '0px',
    background: 'white',
    borderBottomWidth: '1px',
    borderBottomColor: theme.palette.grey.A400,
  },
  column: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  columnLabelMoveLeft: {
    transform: 'translateX(-5px)',
  },
  columnLabelDefault: {
    transform: 'translateX(0px)',
  },
  columnComponent: {
    transform: 'translateX(5px) translateY(2px)',
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
    background: theme.palette.background.default,
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
    textDecoration: 'none',
    color: theme.palette.primary.main,
    '&:hover': {
      color: theme.palette.primary.hover,
    },
    '&:active': {
      color: theme.palette.primary.dark,
    },
  },
  toggleButtonIcon: {
    height: '20px',
    width: '20px',
  },
  arrowIcon: {
    height: '35px',
    margin: 'auto',
  },
}));

const itemsPerPage = [5, 10, 25, 50, 100];

// const tableRefetch = (limit, offset, filters, sorts) =>
//            dispatch(action(authToken, problemId, ident, limit, offset, filter, sort))

// TODO: new API

// ident
// hasFilter,
// refetch,
// buttons,
// columns,
// data,
// children,

// (item, allStates) => ({
//   username: item.username,
// })
function AutoTable({
  ident, // unique identifier for this table, used in dynamic redux state
  hasFilter, // display filter in table head
  filterConfig, // configuration of filter
  /*
  example value:
  [
    {
      reduxStateId: 'username',
      label: 'Username',
      type: 'TEXT',
      operation: 'LIKE',
    },
    {
      reduxStateId: 'role',
      label: 'Role',
      type: 'ENUM',
      options: [{value: 'MANAGER', label: 'Manager'}, {value: 'MEMBER', label: 'Member'}, {value: 'GUEST', label: 'Guest'}],
      operation: 'IN',
    },
    {
      reduxStateId: 'start_time',
      label: 'Start Time',
      type: 'DATE',
      operation: 'BETWEEN'
    }
  ],
  */
  refetch, // function to call when table change page / filter/ sort
  /*
  example value:
    (browseConfig, ident) => dispatch(fetchClassMembers(authToken, classId, browseParams: {limit, offset, filters, sorts}, ident))

  (ident, browseParams) are required parameters
  */
  columns, // configurations of columns
  /*
  example value:
  [
    {
      name: 'Institute',
      align: 'center',
      type: 'string',
    },
    {
      name: 'Email',
      align: 'center',
      type: 'string',
    },
  ];
*/
  reduxData,
  reduxDataToRows,
  hasLink,
  buttons,
}) {
  const classes = useStyles();
  const [curPage, setPage] = useState(0); // curPage * rowsPerPage = offset
  const [pageInput, setPageInput] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10); // limit

  const [filter, setFilter] = useState([]);
  const [sort, setSort] = useState([]);

  const [displayedReduxData, setDisplayedReduxData] = useState([]);
  const [rowData, setRowData] = useState([]);

  const [dataComplete, setDataComplete] = useState(true);

  const dispatch = useDispatch();
  // const allStates = useSelector((state) => state);
  const tableState = useSelector((state) => state.component.autoTable);

  // page change from button
  const handleChangePage = (event, newPage) => {
    if (newPage + 1 <= Math.ceil(tableState.byId[ident].totalCount / rowsPerPage) && newPage >= 0) {
      setPageInput(newPage + 1);
    }
  };

  // page change from input
  useEffect(() => {
    if (
      tableState.byId[ident]
      && Number(pageInput) <= Math.ceil(tableState.byId[ident].totalCount / rowsPerPage)
      && pageInput >= 1
    ) {
      setPage(Number(pageInput) - 1);
    }
  }, [ident, pageInput, rowsPerPage, tableState]);

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0); // TODO: calculate this
  };

  const labelMoveLeft = (icon, cols, col) => {
    if (icon && icon[cols.findIndex((x) => x.id === col.id)]) {
      return classes.columnLabelMoveLeft;
    }
    return classes.columnLabelDefault;
  };

  // table mount, create dynamic redux state
  useEffect(() => {
    dispatch(customTableMount(ident));
  }, [ident]);

  // table refetch
  useEffect(() => {
    refetch(
      {
        limit: rowsPerPage,
        offset: curPage * rowsPerPage,
        filter,
        sort,
      },
      ident,
    );
  }, [curPage, filter, ident, rowsPerPage, sort]);

  // switch page
  useEffect(() => {
    if (tableState.byId[ident]) {
      const newDisplayedReduxData = Array.from({ length: rowsPerPage }, (_, id) => id + rowsPerPage * curPage)
        .map((id) => tableState.byId[ident].displayedDataIds.get(id))
        .map((id) => reduxData.byId[id]);

      setDataComplete(newDisplayedReduxData.reduce((acc, item) => acc && item !== undefined, true));
      setDisplayedReduxData(newDisplayedReduxData);
    }
  }, [curPage, ident, reduxData.byId, rowsPerPage, tableState]);

  useEffect(() => {
    if (dataComplete) {
      setRowData(displayedReduxData.map((item) => reduxDataToRows(item)));
    }
  }, [dataComplete, displayedReduxData]);

  return (
    <>
      <Paper className={classes.root} elevation={0}>
        <TableContainer className={classes.container}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                <TableCell className={`${classes.tableHeadCell} ${classes.tableRowContainerLeftSpacing}`} />
                {columns.map((column) => (
                  <React.Fragment key={nanoid()}>
                    <TableCell className={`${classes.tableHeadCell} ${classes.tableColumnLeftSpacing}`} />
                    <TableCell
                      align={column.align}
                      className={classes.tableHeadCell}
                      style={{ minWidth: column.minWidth, width: column.width }}
                    >
                      {column.name}
                      {/* <div className={classes.column}>
                        <div className={labelMoveLeft(columnComponent, columns, column)}>
                          <b>{column.label}</b>
                        </div>
                        <div className={classes.columnComponent}>
                          {columnComponent && columnComponent[columns.findIndex((x) => x.id === column.id)]}
                        </div>
                      </div> */}
                    </TableCell>
                  </React.Fragment>
                ))}

                {
                  // TODO: simplify this
                  hasLink ? (
                    <TableCell key="link" align="right" className={classes.tableHeadCell} style={{ minWidth: 20 }} />
                  ) : (
                    <TableCell key="blank" align="right" className={classes.tableHeadCell} style={{ minWidth: 20 }} />
                  )
                }
              </TableRow>
            </TableHead>
            <TableBody>
              {
                /* TODO
              if => switch
              column.type: 'text', 'number', 'link', 'date'
              */
                rowData.map((row) => (
                  <TableRow hover role="checkbox" tabIndex={-1} key={row[columns[0].id]} className={classes.row}>
                    <TableCell className={classes.tableRowContainerLeftSpacing} />
                    {columns.map((column) => {
                      if (column.type === 'link') {
                        const link = row[column.link_id];
                        const value = row[column.id];
                        return (
                          <React.Fragment key={`${column.id}-${column.label}`}>
                            <TableCell className={classes.tableColumnLeftSpacing} />
                            <TableCell align={column.align}>
                              <Link to={link} className={classes.textLink} replace>
                                {column.format && typeof value === 'number' ? column.format(value) : value}
                              </Link>
                            </TableCell>
                          </React.Fragment>
                        );
                      }
                      const value = row[column.name];
                      return (
                        <React.Fragment key={nanoid()}>
                          <TableCell className={classes.tableColumnLeftSpacing} />
                          <TableCell align={column.align}>
                            {column.format && typeof value === 'number' ? column.format(value) : value}
                          </TableCell>
                        </React.Fragment>
                      );
                    })}
                    {hasLink ? (
                      <TableCell key={`${row.id}-show`} align="right">
                        <Link to={row.link} className={classes.detailLink}>
                          <IconButton>
                            <Icon.ArrowForwardRoundedIcon className={classes.toggleButtonIcon} />
                          </IconButton>
                        </Link>
                      </TableCell>
                    ) : (
                      <TableCell key={`${row.id}-blank`} align="right" style={{ minWidth: 20 }} />
                    )}
                  </TableRow>
                ))
              }
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
              {itemsPerPage.map((item) => (
                <MenuItem key={nanoid()} value={item}>
                  {item}
                </MenuItem>
              ))}
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
            <Icon.ChevronLeftOutlinedIcon className={classes.arrowIcon} />
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
            {Math.ceil((tableState.byId[ident] ? tableState.byId[ident].totalCount : 100) / rowsPerPage)}
          </Typography>
          <Button
            className={classes.pageChangeButtons}
            onClick={(e) => {
              handleChangePage(e, curPage + 1);
            }}
          >
            <Icon.ChevronRightOutlinedIcon className={classes.arrowIcon} />
          </Button>
        </div>
      </Paper>
      {dataComplete || <Typography>Loading</Typography>}
    </>
  );
}

export default AutoTable;
