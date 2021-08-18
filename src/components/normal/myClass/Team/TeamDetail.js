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
import { fetchTeams, fetchTeamMember } from '../../../../actions/myClass/team';
import NoMatch from '../../../noMatch';

const useStyles = makeStyles((theme) => ({
  pageHeader: {
    marginBottom: '50px',
  },
}));

/* This is a level 4 component (page component) */
export default function ChallengeList() {
  const classNames = useStyles();
  const dispatch = useDispatch();
  const history = useHistory();
  const { classId, teamId } = useParams();

  const authToken = useSelector((state) => state.auth.token);
  const teams = useSelector((state) => state.teams.byId);
  const teamMembers = useSelector((state) => state.teamMembers.byId);
  const teamMemberIds = useSelector((state) => state.teamMembers.allIds);
  const loading = useSelector((state) => state.loading.myClass.team);

  const user = useSelector((state) => state.user);
  const [isManager, setIsManager] = useState(false);

  useEffect(() => {
    user.classes.map((item) => {
      if (`${item.class_id}` === classId) {
        if (item.role === 'MANAGER') {
          setIsManager(true);
        }
      }
      return <></>;
    });
  }, [classId, user.classes]);

  useEffect(() => {
    if (!loading.editTeam && !loading.editTeamMember) {
      dispatch(fetchTeams(authToken, classId));
      dispatch(fetchTeamMember(authToken, teamId));
    }
  }, [authToken, classId, dispatch, loading.editTeam, loading.editTeamMember, teamId]);

  if (teams[teamId] === undefined) {
    if (loading.fetchTeams || loading.fetchTeamMember || loading.editTeam || loading.editTeamMember) {
      return <div>loading...</div>;
    }
    return <NoMatch />;
  }console.log(teams[teamId]);

  return (
    <>
      <Typography className={classNames.pageHeader} variant="h3">
        {`${teams[teamId].name} / Detail`}
      </Typography>
    </>
  );
}
