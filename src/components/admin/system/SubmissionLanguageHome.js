import React, { useState, useEffect } from 'react';
import { useParams, BrowserRouter as Router, Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import {
  Table,
  TableBody,
  TableHead,
  TableCell,
  TableContainer,
  TableFooter,
  TablePagination,
  TableRow,
  Paper,
  IconButton,
  SvgIcon,
  TextField,
  Typography,
  Grid,
} from '@material-ui/core';
import { KeyboardArrowLeft, KeyboardArrowRight } from '@material-ui/icons';
import { makeStyles } from '@material-ui/core/styles';
import CustomTable from '../../ui/CustomTable';

const useStyles = makeStyles((theme) => ({
  pageHeader: {
    marginBottom: '50px',
  },
}));

// TODO: use ui/CustomTable to implement announcement table directly in this component

export default function SubmissionLanguageHome() {
  const classes = useStyles();

  const submitLang = useSelector((state) => state.admin.system.submitLang.byId);
  const submitLangID = useSelector((state) => state.admin.system.submitLang.allIds);

  const [tableData, setTableData] = useState([]);
  const [path, setPath] = useState([]);

  const languageName = 'python';

  useEffect(() => {
    const newData = [];
    const newPath = [];
    submitLangID.forEach((key) => {
      const item = submitLang[key];
      if (item.is_disabled === true) {
        item.is_disabled = 'Disable';
      } else if (item.is_disabled === false) {
        item.is_disabled = 'Enable';
      }
      newData.push(item);
      newPath.push(`submitLang/${item.id}/setting`);
    });
    setTableData(newData);
    setPath(newPath);
  }, [submitLang, submitLangID]);

  return (
    <div>
      <Typography variant="h3" className={classes.pageHeader}>
        Submission Language
      </Typography>
      {/* <Typography variant="h4">This is Submission Language Home</Typography> */}
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
    </div>
  );
}
