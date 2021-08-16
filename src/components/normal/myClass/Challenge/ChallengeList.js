import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  Typography,
  Button,
  makeStyles,
  Dialog,
  DialogTitle,
  DialogActions,
  DialogContent,
  TextField,
} from '@material-ui/core';
import { useHistory, useParams } from 'react-router-dom';
import moment from 'moment';
import AddIcon from '@material-ui/icons/Add'; // change to local icon
import CustomTable from '../../../ui/CustomTable';
import TableFilterCard from '../../../ui/TableFilterCard';
import filterData from '../../../../function/filter';
import sortData from '../../../../function/sort';
import { fetchChallenges, addChallenge } from '../../../../actions/myClass/challenge';

// cm: hasSearch, searchPlaceHolder, buttons, columns, columnComponent, data, hasLink, linkName
// cn: hasSearch, searchPlaceHolder, columns, columnComponent, data, hasLink, linkName

const useStyles = makeStyles((theme) => ({
  pageHeader: {
    marginBottom: '50px',
  },
}));

/* This is a level 4 component (page component) */
export default function ChallengeList() {
  const { courseId, classId } = useParams();
  const history = useHistory();
  const classNames = useStyles();
  const dispatch = useDispatch();

  const [tableData, setTableData] = useState([]);
  const [transformedData, setTransformedData] = useState([]);
  const [filter, setFilter] = useState(false);
  const [filterInput, setFilterInput] = useState({
    filter: ['Select all'],
    sort: '(None)',
  });

  const challenges = useSelector((state) => state.challenges.byId);
  const challengesID = useSelector((state) => state.challenges.allIds);
  const authToken = useSelector((state) => state.auth.token);
  const loading = useSelector((state) => state.loading.myClass.challenge);
  // if (courses.byId[courseId] === undefined || courses.byId[courseId].name === undefined) {

  //   return <NoMatch />;
  // }
  useEffect(() => {
    if (!loading.addChallenge) {
      dispatch(fetchChallenges(authToken, classId));
    }
  }, [authToken, classId, dispatch, loading.addChallenge]);

  useEffect(() => {
    setTableData(
      challengesID.map((id) => ({
        ...challenges[id],
        path: `/my-class/${courseId}/${classId}/challenge/${id}`,
        startTime: moment(challenges[id].start_time).format('YYYY-MM-DD, HH:mm'),
        endTime: moment(challenges[id].end_time).format('YYYY-MM-DD, HH:mm'),
      })),
    );
  }, [challenges, challengesID, classId, courseId]);

  // const filterStatus = (input) => {
  //   const tempData = filterData(transformedData, 'status', input.filter);
  //   const tempData2 = sortData(tempData, 'status', input.sort);

  //   setTableData(tempData2);
  // };

  return (
    <>
      <Typography className={classNames.pageHeader} variant="h3">
        PBC 111-1 / Challenge
      </Typography>
      <CustomTable
        hasSearch
        searchPlaceholder="Title"
        buttons={(
          <>
            <Button color="primary">
              <AddIcon />
            </Button>
          </>
        )}
        data={tableData}
        columns={[
          {
            id: 'title',
            label: 'Title',
            minWidth: 150,
            align: 'center',
            width: 250,
            type: 'string',
          },
          {
            id: 'startTime',
            label: 'Start Time',
            minWidth: 50,
            align: 'center',
            width: 200,
            type: 'string',
          },
          {
            id: 'endTime',
            label: 'End Time',
            minWidth: 50,
            align: 'center',
            width: 200,
            type: 'string',
          },
        ]}
        // columnComponent={[
        //   null,
        //   null,
        //   <TableFilterCard
        //     key="filter"
        //     popUp={filter}
        //     setPopUp={setFilter}
        //     filterInput={filterInput}
        //     filterOptions={['Closed', 'Opened', 'Not Yet']}
        //     setFilterInput={setFilterInput}
        //     doFilter={filterStatus}
        //   />,
        // ]}
        hasLink
        linkName="path"
      />
    </>
  );
}
