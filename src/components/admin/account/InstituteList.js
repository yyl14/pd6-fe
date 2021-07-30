import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import {
  makeStyles,
  Button,
} from '@material-ui/core';
import { useParams } from 'react-router-dom';
import CustomTable from '../../ui/CustomTable';

const useStyles = makeStyles((theme) => ({
}));

export default function InstituteList() {
  const classes = useStyles();

  // const institutes = useSelector((state) => state.admin.account.institutes.byId);

  const fakeData = [
    {
      institute: 'National Taiwan University',
      email_domain: 'ntu.edu.tw',
      is_disabled: 'Enabled',
    },
    {
      institute: 'National Taiwan University',
      email_domain: 'ntu.edu.tw',
      is_disabled: 'Enabled',
    },
    {
      institute: 'National Taiwan University',
      email_domain: 'ntu.edu.tw',
      is_disabled: 'Disabled',
    },
    {
      institute: 'National Taiwan University',
      email_domain: 'ntu.edu.tw',
      is_disabled: 'Enabled',
    },
    {
      institute: 'National Taiwan University',
      email_domain: 'ntu.edu.tw',
      is_disabled: 'Enabled',
    },
    {
      institute: 'National Taiwan University',
      email_domain: 'ntu.edu.tw',
      is_disabled: 'Disabled',
    },
  ];

  return (
    <>
      <CustomTable
        searchPlaceholder="Institute/Email"
        buttons={(
          <>
            <Button color="primary">Add Institute</Button>
          </>
          )}
        data={fakeData}
        columns={[
          {
            id: 'institute', label: 'Institute', minWidth: 120, align: 'center',
          },
          {
            id: 'email_domain', label: 'Email', minWidth: 100, align: 'center',
          },
          {
            id: 'is_disabled', label: 'Status', minWidth: 100, align: 'center',
          },
        ]}
        hasFilter={[false, false, true]}
        dataColumnName={['institute', 'email_domain', 'is_disabled']}
      />
    </>
  );
}
