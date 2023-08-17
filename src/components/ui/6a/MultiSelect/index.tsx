import { FormControl, ListItemText, MenuItem, Select, makeStyles } from '@material-ui/core';

import CustomCheckbox from '../../CustomCheckbox';

const useStyles = makeStyles(() => ({
  selectField: {
    width: '350px',
    marginRight: '5px',
  },
  listItem: {
    marginLeft: '10px',
  },
  selectList: {
    '&.Mui-selected': {
      backgroundColor: 'transparent',
    },
    '&.Mui-selected:hover': {
      backgroundColor: 'transparent',
    },
    '&:hover': {
      backgroundColor: 'transparent',
    },
  },
}));

interface Option<T extends string | number | readonly string[]> {
  label: string;
  value: T;
}

interface MultiSelectProps<T extends string | number | readonly string[]> {
  options: Option<T>[];
  value: T[];
  setValue: (newValue: T[]) => void;
}

export default function MultiSelect<T extends string | number | readonly string[]>({
  options,
  value,
  setValue,
}: MultiSelectProps<T>) {
  const classes = useStyles();

  return (
    <>
      <FormControl variant="outlined" className={classes.selectField}>
        <Select
          labelId="status"
          id="status"
          value={value}
          onChange={(event) => {
            const newList = event.target.value as (T | '__select_all')[];
            if (newList.includes('__select_all')) {
              setValue(options.map((item) => item.value));
            } else {
              setValue(newList.filter((item) => item !== '__select_all') as T[]);
            }
          }}
          renderValue={(selected) =>
            (selected as T[]).length === options.length
              ? 'Select all'
              : (selected as T[])
                  .map((selectedValue) => options.find((option) => option.value === selectedValue)?.label)
                  .join(', ')
          }
          multiple
        >
          <MenuItem value="__select_all" className={classes.selectList}>
            Select all
          </MenuItem>
          {options.map((option) => (
            <MenuItem key={String(option.value)} value={option.value} className={classes.selectList}>
              <CustomCheckbox isChecked={value.indexOf(option.value) > -1} />
              <ListItemText className={classes.listItem} primary={option.label} />
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </>
  );
}
