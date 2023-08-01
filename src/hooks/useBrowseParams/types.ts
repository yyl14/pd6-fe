/** Pagination */

export type RowsPerPageOption = 10 | 25 | 50 | 100;

/** Filter */

export type BinaryFilterOperator = '>' | '>=' | '=' | '<' | '<=';
export type EnumFilterOperator = 'IN' | 'NOT IN';
export type RangeFilterOperator = 'BETWEEN' | 'NOT BETWEEN';
export type FuzzyFilterOperator = 'LIKE' | 'NOT LIKE';

export type BinaryFilterOperand<T> = T;
export type EnumFilterOperand<T> = T[];
export type RangeFilterOperand<T> = [T, T];
export type FuzzyFilterOperand<T> = T;

export type FilterOperator = BinaryFilterOperator | EnumFilterOperator | RangeFilterOperator | FuzzyFilterOperator;

export type FilterOperand<T extends FilterOperator, V> = T extends BinaryFilterOperator
  ? BinaryFilterOperand<V>
  : T extends EnumFilterOperator
  ? EnumFilterOperand<V>
  : T extends RangeFilterOperator
  ? RangeFilterOperand<V>
  : FuzzyFilterOperand<V>;

export interface FilterItem<
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  DataSchema extends Record<string, any>,
  K extends keyof DataSchema,
  T extends FilterOperator,
> {
  column: K;
  operator: T;
  operand: FilterOperand<T, DataSchema[K]> | string;
}

/** Sort */

export type SortOrder = 'ASC' | 'DESC';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type SortItem<Schema extends Record<string, any>, K extends keyof Schema> = {
  column: K;
  order: SortOrder;
};

/** Main */

export interface PaginationInterface {
  rowsPerPage: RowsPerPageOption;
  currentPage: number;
  totalNumberOfPages: number;
  setRowsPerPage: (value: RowsPerPageOption) => void;
  handlePrevPage: () => void;
  handleNextPage: () => void;
  handleSetCurrentPage: (newValue: number) => void;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export interface FilterInterface<DataSchema extends Record<string, any>> {
  filter: FilterItem<DataSchema, keyof DataSchema, FilterOperator>[];
  setFilter: (
    reducer: (
      state: FilterItem<DataSchema, keyof DataSchema, FilterOperator>[],
    ) => FilterItem<DataSchema, keyof DataSchema, FilterOperator>[],
  ) => void;
  createFilter: <K extends keyof DataSchema, T extends FilterOperator>(
    column: K,
    operator: T,
    operand: FilterOperand<T, DataSchema[K]> | string | string[] | [string, string],
  ) => FilterItem<DataSchema, K, T>;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export interface SortInterface<DataSchema extends Record<string, any>> {
  sort: SortItem<DataSchema, keyof DataSchema>[];
  setSort: (
    reducer: (value: SortItem<DataSchema, keyof DataSchema>[]) => SortItem<DataSchema, keyof DataSchema>[],
  ) => void;
  createSort: <K extends keyof DataSchema>(column: K, order: SortOrder) => SortItem<DataSchema, K>;
}
