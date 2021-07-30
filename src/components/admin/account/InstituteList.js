import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import {
  makeStyles,
} from '@material-ui/core';
import { useParams } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
}));

export default function InstituteList() {
  const classes = useStyles();

  // const institutes = useSelector((state) => state.admin.account.institutes.byId);

  return (
    <>
      <div>hello</div>
    </>
  );
}
