import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import CustomTable from '../../ui/CustomTable';
import { fetchSubmitLanguage } from '../../../actions/admin/system';

const useStyles = makeStyles((theme) => ({
  pageHeader: {
    marginBottom: '50px',
  },
}));

/* This is a level 4 component (page component) */
export default function SubmissionLanguageHome() {
  const classes = useStyles();

  const dispatch = useDispatch();
  const authToken = useSelector((state) => state.auth.user.token);
  const submitLang = useSelector((state) => state.submitLangs.byId);
  const submitLangId = useSelector((state) => state.submitLangs.allIds);

  const [tableData, setTableData] = useState([]);

  useEffect(() => {
    dispatch(fetchSubmitLanguage(authToken));
  }, [authToken, dispatch]);

  useEffect(() => {
    if (submitLangId !== null) {
      const newData = [];

      submitLangId.forEach((key) => {
        const item = submitLang[key];
        const temp = { ...item };
        if (item.is_disabled === true) {
          temp.is_disabled = 'Disabled';
        } else if (item.is_disabled === false) {
          temp.is_disabled = 'Enabled';
        }
        temp.path = `submitlang/${item.id}/setting`;
        newData.push(temp);
      });
      setTableData(newData);
    }
  }, [submitLang, submitLangId]);

  return (
    <>
      <Typography variant="h3" className={classes.pageHeader}>
        Submission Language
      </Typography>
      <CustomTable
        hasSearch
        searchPlaceholder="Language / Version"
        data={tableData}
        columns={[
          {
            id: 'name',
            label: 'Language',
            align: 'center',
            width: '150px',
          },
          {
            id: 'version',
            label: 'Version',
            align: 'center',
            width: '128px',
          },
          {
            id: 'is_disabled',
            label: 'Status',
            align: 'center',
            width: '214px',
          },
        ]}
        columnComponent={[null, null, null]}
        hasLink
        linkName="path"
      />
    </>
  );
}
