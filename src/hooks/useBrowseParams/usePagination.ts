import { useEffect, useState } from 'react';

import { RowsPerPageOption } from './types';
import useBrowseParamsQueries from './useBrowseParamsQueries';

const DEFAULT_ROWS_PER_PAGE: RowsPerPageOption = 10;
const DEFAULT_PAGE = 0;
const DEFAULT_NUMBER_OF_PAGES = 100;

const isValidRowsPerPage = (value: number | null): value is RowsPerPageOption =>
  value === 10 || value === 25 || value === 50 || value === 100;

const isValidPage = (value: number | null): value is number => value !== null && value > 0;

const usePagination = () => {
  const {
    rowsPerPage: rowsPerPageQuery,
    page: pageQuery,
    setRowsPerPageQuery,
    setPageQuery,
  } = useBrowseParamsQueries();

  const [rowsPerPage, setRowsPerPage] = useState<RowsPerPageOption>(
    isValidRowsPerPage(rowsPerPageQuery) ? rowsPerPageQuery : DEFAULT_ROWS_PER_PAGE,
  );
  const [currentPage, setCurrentPage] = useState(isValidPage(pageQuery) ? pageQuery : DEFAULT_PAGE);
  const [totalCount, setTotalCount] = useState<number | undefined>(undefined);

  const totalNumberOfPages = totalCount ? Math.ceil(totalCount / rowsPerPage) : DEFAULT_NUMBER_OF_PAGES;

  const setCurrentPageWithQuery = (value: number): void => {
    setCurrentPage(value);
    setPageQuery(value);
  };

  const setRowsPerPageWithQuery = (value: RowsPerPageOption): void => {
    setRowsPerPage(value);
    setRowsPerPageQuery(value);
  };

  const handlePrevPage = () => {
    if (currentPage > 0) setCurrentPageWithQuery(currentPage - 1);
  };
  const handleNextPage = () => {
    if (currentPage < totalNumberOfPages - 1) setCurrentPageWithQuery(currentPage + 1);
  };
  const handleSetCurrentPage = (newValue: number) => {
    if (!Number.isNaN(newValue) && newValue >= 0 && newValue <= totalNumberOfPages) setCurrentPageWithQuery(newValue);
  };

  useEffect(() => {
    if (currentPage >= totalNumberOfPages) {
      setCurrentPage(totalNumberOfPages - 1);
    }
  }, [currentPage, totalNumberOfPages]);

  useEffect(() => {
    setRowsPerPage(isValidRowsPerPage(rowsPerPageQuery) ? rowsPerPageQuery : DEFAULT_ROWS_PER_PAGE);
  }, [rowsPerPageQuery]);

  useEffect(() => {
    setCurrentPage(isValidPage(pageQuery) ? pageQuery : DEFAULT_PAGE);
  }, [pageQuery]);

  return {
    limit: rowsPerPage,
    offset: currentPage * rowsPerPage,
    rowsPerPage,
    currentPage,
    totalNumberOfPages,
    setTotalCount,
    setRowsPerPage: setRowsPerPageWithQuery,
    handlePrevPage,
    handleNextPage,
    handleSetCurrentPage,
  };
};

export default usePagination;
