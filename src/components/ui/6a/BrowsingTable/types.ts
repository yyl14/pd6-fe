/* eslint-disable @typescript-eslint/no-explicit-any */
import { FilterItem, FilterOperator } from '@/hooks/useBrowseParams/types';

export type DataSchemaBase = Record<string, any>;

export interface RowSchemaBase {
  id: string;
  [K: string]: string;
}

export type FilterType = 'TEXT' | 'ENUM_SINGLE' | 'ENUM_MULTI' | 'DATE';

export type SimpleFilterConfigOption<DataSchema extends DataSchemaBase, K extends keyof DataSchema> = {
  value: DataSchema[K];
  label: string;
};

export type SimpleFilterConfigItem<DataSchema extends DataSchemaBase, K extends keyof DataSchema> = {
  dataColumn: K;
  label: string;
  operator: FilterOperator;
} & (
  | { type: 'TEXT' | 'DATE' }
  | { type: 'ENUM_SINGLE' | 'ENUM_MULTI'; options: SimpleFilterConfigOption<DataSchema, K>[] }
);

export type MultiFilterConfigOption<DataSchema extends DataSchemaBase> = {
  value: FilterItem<DataSchema, keyof DataSchema, FilterOperator>[];
  label: string;
};

export type MultiFilterConfigItem<DataSchema extends DataSchemaBase> = {
  label: string;
} & { type: 'ENUM_SINGLE' | 'ENUM_MULTI'; options: MultiFilterConfigOption<DataSchema>[] };

export type FilterConfigOption<DataSchema extends DataSchemaBase, K extends keyof DataSchema> =
  | SimpleFilterConfigOption<DataSchema, K>
  | MultiFilterConfigOption<DataSchema>;

export type FilterConfigItem<DataSchema extends DataSchemaBase> =
  | ({
      multi?: false | undefined;
    } & SimpleFilterConfigItem<DataSchema, keyof DataSchema>)
  | ({ multi: true } & MultiFilterConfigItem<DataSchema>);

type ColumnAlign = 'center' | 'left' | 'right';
type ColumnColorsValue = 'default' | 'accepted' | 'error';

export type ColumnConfigItem<DataSchema extends DataSchemaBase, RowSchema extends RowSchemaBase> = (
  | { sortable?: false }
  | { sortable?: true; dataColumn: keyof DataSchema }
) &
  (
    | { type: 'string' }
    | {
        type: 'link';
        formatLink: (datum: DataSchema) => string;
      }
  ) & {
    name: Exclude<keyof RowSchema, 'link'>;
    align: ColumnAlign;

    minWidth?: number;
    width?: number;
    colors?: Record<string, ColumnColorsValue>;
  };
