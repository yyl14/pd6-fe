import { FilterOperator } from '@/hooks/useBrowseParams/types';

export interface DataSchemaBase {
  id: number;
}

export interface RowSchemaBase {
  id: string;
  [K: string]: string | LinkType;
}

export type FilterType = 'TEXT' | 'ENUM_SINGLE' | 'ENUM_MULTI' | 'DATE';

export type FilterOptions = { value: string; label: string }[];

export type FilterConfigItem<DataSchema extends DataSchemaBase> = {
  dataColumn: keyof DataSchema;
  label: string;
  operator: FilterOperator;
} & ({ type: 'TEXT' | 'DATE' } | { type: 'ENUM_SINGLE' | 'ENUM_MULTI'; options: FilterOptions });

type ColumnAlign = 'center' | 'left' | 'right';
type ColumnType = 'string' | 'link';
type ColumnColorsValue = 'default' | 'accepted' | 'error';

export type ColumnConfigItem<DataSchema extends DataSchemaBase, RowSchema extends RowSchemaBase> = (
  | { sortable?: false }
  | { sortable?: true; dataColumn: keyof DataSchema }
) & {
  name: Exclude<keyof RowSchema, 'link'>;
  align: ColumnAlign;
  type: ColumnType;
  minWidth?: number;
  width?: number;
  colors?: Record<string, ColumnColorsValue>;
};

export type LinkType = {
  text: string;
  path: string;
};
