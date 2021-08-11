import {
  makeStyles,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  Select,
  MenuItem,
  Button,
} from '@material-ui/core';

import { BiFilterAlt } from 'react-icons/bi';

import React, { useState } from 'react';
import AlignedText from './AlignedText';

const useStyles = makeStyles((theme) => ({
  filterButton: {
    justifyContent: 'space-between',
  },
  selectField: {
    width: '350px',
  },
  clearButton: {
    marginLeft: '24px',
    backgroundColor: '#FFFFFF',
    border: 'solid',
    borderColor: '#DDDDDD',
  },
}));

export default function TableFilterCard({
  popUp,
  setPopUp,
  filterInput,
  filterOptions,
  setFilterInput,
  doFilter,
}) {
  const classes = useStyles();
  const filterClear = () => {
    setFilterInput({
      filter: ['Select all'],
      sort: '(None)',
    });
  };

  const onChangeFilterInput = (e) => {
    if (e.target.value.length === 0) {
      setFilterInput((input) => ({ ...input, filter: ['Select all'] }));
    } else if (e.target.value[e.target.value.length - 1] === 'Select all') {
      setFilterInput((input) => ({ ...input, filter: ['Select all'] }));
    } else if (e.target.value[0] === 'Select all') {
      const newArr = e.target.value.slice(1);
      setFilterInput((input) => ({ ...input, filter: newArr }));
    } else {
      setFilterInput((input) => ({ ...input, filter: e.target.value }));
    }
  };

  return (
    <>
      <BiFilterAlt onClick={() => { setPopUp(true); }} />
      <Dialog
        open={popUp}
        keepMounted
        onClose={() => setPopUp(false)}
        className={classes.popUpLayout}
      >
        <DialogContent>
          <AlignedText text="Filter by" childrenType="field">
            <FormControl variant="outlined" className={classes.selectField}>
              <Select
                labelId="status"
                id="status"
                value={filterInput.filter}
                onChange={(e) => { onChangeFilterInput(e); }}
                multiple
              >
                <MenuItem value="Select all">Select all</MenuItem>
                {filterOptions.map((option) => <MenuItem key={option} value={option}>{option}</MenuItem>)}
              </Select>
            </FormControl>
          </AlignedText>
          <AlignedText text="Sort by">
            <FormControl variant="outlined" className={classes.selectField}>
              <Select
                labelId="sort"
                id="sort"
                value={filterInput.sort}
                onChange={(e) => {
                  setFilterInput((input) => ({ ...input, sort: e.target.value }));
                }}
              >
                <MenuItem value="(None)">(None)</MenuItem>
                <MenuItem value="A to Z">A to Z</MenuItem>
                <MenuItem value="Z to A">Z to A</MenuItem>
              </Select>
            </FormControl>
          </AlignedText>
        </DialogContent>
        <DialogActions className={classes.filterButton}>
          <div>
            <Button onClick={() => filterClear()} className={classes.clearButton}>
              Clear
            </Button>
          </div>
          <div>
            <Button onClick={() => setPopUp(false)} color="default">
              Cancel
            </Button>
            <Button onClick={() => { setPopUp(false); doFilter(); }} color="primary">
              Save
            </Button>
          </div>
        </DialogActions>
      </Dialog>
    </>
  );
}
