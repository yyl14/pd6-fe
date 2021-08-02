import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { makeStyles, Button, Typography } from '@material-ui/core';
import { useParams } from 'react-router-dom';
import CustomTable from '../../ui/CustomTable';

const useStyles = makeStyles((theme) => ({
  pageHeader: {
    marginBottom: '50px',
  },
}));

export default function InstituteList() {
  const classes = useStyles();

  const institutes = useSelector((state) => state.admin.account.institutes.byId);
  const institutesID = useSelector((state) => state.admin.account.institutes.allIds);

  const [tableData, setTableData] = useState([]);
  const [path, setPath] = useState([]);

  useEffect(() => {
    const newData = [];
    const newPath = [];

    institutesID.forEach((key) => {
      const item = institutes[key];
      if (item.is_disabled === true) {
        item.is_disabled = 'Disabled';
      } else if (item.is_disabled === false) {
        item.is_disabled = 'Enabled';
      }
      newData.push(item);
      newPath.push(`institute/${item.id}/setting`);
    });
    setTableData(newData);
    setPath(newPath);
  }, [institutes, institutesID]);

  return (
    <>
      <Typography variant="h3" className={classes.pageHeader}>
        Institute
      </Typography>
      <CustomTable
        searchPlaceholder="Institute/Email"
        buttons={(
          <>
            <Button color="primary">Add Institute</Button>
          </>
        )}
        data={tableData}
        columns={[
          {
            id: 'full_name',
            label: 'Institute',
            minWidth: 120,
            align: 'center',
          },
          {
            id: 'email_domain',
            label: 'Email',
            minWidth: 100,
            align: 'center',
          },
          {
            id: 'is_disabled',
            label: 'Status',
            minWidth: 100,
            align: 'center',
          },
        ]}
        hasFilter={[false, false, true]}
        dataColumnName={['full_name', 'email_domain', 'is_disabled']}
        hasLink
        path={path}
      />
    </>
  );
}
