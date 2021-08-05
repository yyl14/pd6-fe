import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Typography } from '@material-ui/core';
import { KeyboardArrowLeft, KeyboardArrowRight } from '@material-ui/icons';
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
  const submitLang = useSelector((state) => state.admin.system.submitLang.byId);
  const submitLangId = useSelector((state) => state.admin.system.submitLang.allIds);

  const [tableData, setTableData] = useState([]);
  const [path, setPath] = useState([]);

  useEffect(() => {
    dispatch(fetchSubmitLanguage(authToken));
  }, [authToken, dispatch]);

  useEffect(() => {
    const newData = [];
    const newPath = [];

    submitLangId.forEach((key) => {
      const item = submitLang[key];
      const temp = { ...item };
      if (item.is_disabled === true) {
        temp.is_disabled = 'Disabled';
      } else if (item.is_disabled === false) {
        temp.is_disabled = 'Enabled';
      }
      newData.push(temp);
      newPath.push(`submitlang/${item.id}/setting`);
    });
    setTableData(newData);
    setPath(newPath);
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
        path={path}
      />
    </>
  );
}
