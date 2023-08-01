import {
  Button,
  FormControl,
  IconButton,
  LinearProgress,
  Menu,
  MenuItem,
  Paper,
  Select,
  Snackbar,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import {
  FilterInterface,
  PaginationInterface,
  RowsPerPageOption,
  SortInterface,
} from '../../../../hooks/useBrowseParams/types';
import Icon from '../../icon/index';
import SearchField from './SearchField';
import { ColumnConfigItem, DataSchemaBase, FilterConfigItem, RowSchemaBase } from './types';
import useStyles from './useStyles';

const ROWS_PER_PAGE_OPTIONS: RowsPerPageOption[] = [10, 25, 50, 100];

type BrowsingTableProps<DataSchema extends DataSchemaBase, RowSchema extends RowSchemaBase> = (
  | { hasLink?: true; dataToRow: (data: DataSchema) => RowSchema & { link: string } }
  | { hasLink?: false; dataToRow: (data: DataSchema) => RowSchema }
) &
  BrowsingTablePropsBase<DataSchema, RowSchema>;

interface BrowsingTablePropsBase<DataSchema extends DataSchemaBase, RowSchema extends RowSchemaBase> {
  columnsConfig: ColumnConfigItem<DataSchema, RowSchema>[];
  filterConfig: FilterConfigItem<DataSchema>[];

  data: DataSchema[] | undefined;
  isLoading: boolean;
  error: any; // eslint-disable-line @typescript-eslint/no-explicit-any
  refresh?: () => void; // eslint-disable-line react/require-default-props

  pagination: PaginationInterface;
  filter: FilterInterface<DataSchema>;
  sort: SortInterface<DataSchema>;

  buttons: JSX.Element | false;
  hasRefreshButton?: boolean; // eslint-disable-line react/require-default-props
}

function BrowsingTable<DataSchema extends DataSchemaBase, RowSchema extends RowSchemaBase>({
  filterConfig,
  columnsConfig,
  data,
  isLoading,
  error,
  refresh = () => {},
  dataToRow,
  pagination,
  filter,
  sort,
  buttons,
  hasRefreshButton = false,
  hasLink = false,
}: BrowsingTableProps<DataSchema, RowSchema>) {
  const classes = useStyles();

  const hasFilter = filterConfig.length !== 0;

  const {
    currentPage,
    handleSetCurrentPage,
    totalNumberOfPages,
    handlePrevPage,
    handleNextPage,
    rowsPerPage,
    setRowsPerPage,
  } = pagination;
  const { setFilter, createFilter, filter: filterValue } = filter;
  const { sort: sortValue, setSort, createSort } = sort;

  const [filteringIndex, setFilteringIndex] = useState(0);
  const filteringItem = filterConfig[filteringIndex];

  const [pageInput, setPageInput] = useState('');

  useEffect(() => {
    setPageInput(String(currentPage + 1));
  }, [currentPage]);

  const handlePageChangeFromInput = () => {
    const pageInputValue = Number(pageInput);
    if (pageInputValue >= 1 && pageInputValue <= totalNumberOfPages) {
      handleSetCurrentPage(pageInputValue - 1);
    } else if (pageInputValue > totalNumberOfPages) {
      setPageInput(totalNumberOfPages.toString());
    } else {
      setPageInput('1');
    }
  };

  const [anchorEls, setAnchorEls] = useState<(Element | null)[]>(columnsConfig.map(() => null));

  return (
    <div>
      <div className={hasFilter ? classes.topContent1 : classes.topContent2}>
        {hasFilter && (
          <div className={classes.filterWrapper}>
            <div className={classes.searchFields}>
              <FormControl variant="outlined" style={{ flexShrink: 7 }}>
                <Select
                  autoWidth
                  className={classes.filterSelect}
                  value={filteringIndex}
                  onChange={(e) => {
                    setFilteringIndex(e.target.value as number);
                  }}
                >
                  {filterConfig.map((item, index) => (
                    <MenuItem key={item.label} value={index} className={classes.filterItem}>
                      {item.label}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </div>
            <SearchField
              filter={filterValue}
              filterConfigItem={filteringItem}
              setFilter={setFilter}
              createFilter={createFilter}
            />
            <div className={classes.buttons}>
              <Button disabled>
                {/* TODO: Advanced search */}
                <Icon.Advancedsearch />
              </Button>
            </div>
          </div>
        )}
        <div className={classes.buttons}>
          {buttons}
          {hasRefreshButton && (
            <Button color="primary" onClick={refresh} startIcon={<Icon.RefreshOutlinedIcon />}>
              Refresh
            </Button>
          )}
        </div>
      </div>
      <div className={classes.progressContainer}>
        {isLoading && <LinearProgress color="primary" className={classes.progress} />}
      </div>
      <Paper className={classes.root} elevation={0}>
        <TableContainer>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                <TableCell className={`${classes.tableHeadCell} ${classes.tableRowContainerLeftSpacing}`} />
                {columnsConfig.map((column, index) => (
                  <React.Fragment key={String(column.name)}>
                    <TableCell className={`${classes.tableHeadCell} ${classes.tableColumnLeftSpacing}`} />
                    <TableCell
                      align={column.align}
                      className={classes.tableHeadCell}
                      style={{
                        minWidth: column.minWidth,
                        width: column.width,
                        maxWidth: column.width,
                        display: 'flex',
                        justifyContent: 'center',
                      }}
                    >
                      <b>{String(column.name)}</b>
                      {column.sortable && (
                        <div>
                          <Icon.Sort
                            className={
                              sortValue.map((sortItem) => sortItem.column).includes(column.dataColumn)
                                ? `${classes.sortIcon} ${classes.activeSortIcon}`
                                : classes.sortIcon
                            }
                            id={`sort-icon-${String(column.name)}`}
                            aria-controls={`sort-menu-${String(column.name)}`}
                            aria-haspopup="true"
                            onClick={(event) => {
                              const temp = columnsConfig.map(() => null) as (Element | null)[];
                              temp[index] = event.target as Element;
                              setAnchorEls(temp);
                            }}
                          />
                          <Menu
                            id={`sort-menu-${String(column.name)}`}
                            aria-labelledby={`sort-icon-${String(column.name)}`}
                            anchorEl={anchorEls[index]}
                            open={Boolean(anchorEls[index])}
                            onClose={() => setAnchorEls(columnsConfig.map(() => null))}
                            anchorOrigin={{
                              vertical: 'bottom',
                              horizontal: 'right',
                            }}
                            transformOrigin={{
                              vertical: 'top',
                              horizontal: 'right',
                            }}
                          >
                            <MenuItem
                              onClick={() => {
                                setAnchorEls(columnsConfig.map(() => null));
                                setSort((state) => {
                                  const defaultSort = state.at(-1);

                                  return [createSort(column.dataColumn, 'ASC'), ...(defaultSort ? [defaultSort] : [])];
                                });
                              }}
                              className={
                                sortValue.includes({ column: column.dataColumn, order: 'ASC' })
                                  ? classes.selectedDirection
                                  : ''
                              }
                            >
                              A to Z
                            </MenuItem>
                            <MenuItem
                              onClick={() => {
                                setAnchorEls(columnsConfig.map(() => null));
                                setSort((state) => {
                                  const defaultSort = state.at(-1);
                                  return [createSort(column.dataColumn, 'DESC'), ...(defaultSort ? [defaultSort] : [])];
                                });
                              }}
                              className={
                                sortValue.includes({ column: column.dataColumn, order: 'DESC' })
                                  ? classes.selectedDirection
                                  : ''
                              }
                            >
                              Z to A
                            </MenuItem>
                          </Menu>
                        </div>
                      )}
                    </TableCell>
                  </React.Fragment>
                ))}
                <TableCell
                  key={hasLink ? 'link' : 'blank'}
                  align="right"
                  className={`${classes.tableHeadCell} ${classes.stickyArrowCell}`}
                  style={{
                    minWidth: 20,
                    width: '100%',
                  }}
                />
              </TableRow>
            </TableHead>
            <TableBody>
              {data
                ?.map((datum) => dataToRow(datum))
                .map((row) => (
                  <TableRow hover role="checkbox" tabIndex={-1} key={row.id} className={classes.row}>
                    <TableCell key={`${row.id}-left`} className={classes.tableRowContainerLeftSpacing} />
                    {columnsConfig.map((column) => {
                      const value = row[column.name];
                      if (column.type === 'link') {
                        return (
                          <React.Fragment key={`${row.id}-${String(column.name)}`}>
                            <TableCell className={classes.tableColumnLeftSpacing} />
                            <TableCell
                              className={`${classes.tableBodyCell} ${classes.textLink}`}
                              style={{ minWidth: column.minWidth, width: column.width, maxWidth: column.width }}
                              align={column.align}
                            >
                              <Link to={value} className={classes.textLink}>
                                {value}
                              </Link>
                            </TableCell>
                          </React.Fragment>
                        );
                      }
                      return (
                        <React.Fragment key={`${row.id}-${String(column.name)}`}>
                          <TableCell className={classes.tableColumnLeftSpacing} />
                          <TableCell
                            align={column.align}
                            className={`${column.colors && column.colors[value] && classes[column.colors[value]]} ${
                              classes.tableBodyCell
                            }`}
                            style={{ minWidth: column.minWidth, width: column.width, maxWidth: column.width }}
                          >
                            {value}
                          </TableCell>
                        </React.Fragment>
                      );
                    })}
                    {hasLink && row.link ? (
                      <TableCell
                        key={`${row.id}-show`}
                        align="right"
                        className={`${classes.stickyArrowCell} ${classes.tableCellHover}`}
                      >
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
                ))}
            </TableBody>
          </Table>
        </TableContainer>
        <div className={classes.bottomWrapper}>
          <div />
          <div className={classes.bottom}>
            <FormControl variant="outlined">
              <Select
                className={classes.pageRowSelect}
                labelId="rows-per-page"
                id="rows-per-page"
                value={rowsPerPage}
                onChange={(e) => {
                  setRowsPerPage(e.target.value as RowsPerPageOption);
                }}
              >
                {ROWS_PER_PAGE_OPTIONS.map((item) => (
                  <MenuItem key={item} value={item}>
                    {item}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <Typography className={classes.pageText} variant="body1">
              rows
            </Typography>
            <Button className={classes.pageChangeButtons} disabled={currentPage === 0} onClick={handlePrevPage}>
              <Icon.ChevronLeftOutlinedIcon className={classes.arrowIcon} />
            </Button>
            <TextField
              className={classes.pageIndexTextField}
              value={pageInput}
              onChange={(e) => setPageInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handlePageChangeFromInput()}
            />
            <Typography className={classes.pageText} variant="body1">
              {`of ${totalNumberOfPages}`}
            </Typography>
            <Button
              className={classes.pageChangeButtons}
              disabled={currentPage === totalNumberOfPages - 1}
              onClick={handleNextPage}
            >
              <Icon.ChevronRightOutlinedIcon className={classes.arrowIcon} />
            </Button>
          </div>
        </div>
      </Paper>
      <Snackbar open={error} autoHideDuration={6000} message={`Error refetching data: ${error}`} />
    </div>
  );
}

export default BrowsingTable;
