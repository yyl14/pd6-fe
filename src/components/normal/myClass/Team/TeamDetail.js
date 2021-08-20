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
import { fetchTeams, fetchTeamMember, editTeam } from '../../../../actions/myClass/team';
import { fetchClassMembers } from '../../../../actions/common/common';
import TeamInfo from './detail/TeamInfo';
import TeamInfoEdit from './detail/TeamInfoEdit';
import TeamMember from './detail/TeamMember';
import TeamMemberEdit from './detail/TeamMemberEdit';
import NoMatch from '../../../noMatch';
import SimpleBar from '../../../ui/SimpleBar';
import systemRoleTransformation from '../../../../function/systemRoleTransformation';

const useStyles = makeStyles((theme) => ({
  pageHeader: {
    marginBottom: '50px',
  },
}));

/* This is a level 4 component (page component) */
// TODO: delete member, edit member's role, layout

export default function ChallengeList() {
  const classNames = useStyles();
  const dispatch = useDispatch();
  const history = useHistory();
  const { classId, teamId } = useParams();

  const authToken = useSelector((state) => state.auth.token);
  const teams = useSelector((state) => state.teams.byId);
  const teamMembers = useSelector((state) => state.teamMembers.byId);
  const teamMemberIds = useSelector((state) => state.teamMembers.allIds);
  const classMembers = useSelector((state) => state.classMembers.byId);
  const loading = useSelector((state) => state.loading.myClass.team);
  const commonLoading = useSelector((state) => state.loading.common);

  const user = useSelector((state) => state.user);
  const [isManager, setIsManager] = useState(false);
  const [isTeamManager, setIsTeamManager] = useState(false);

  const [editTeamInfo, setEditTeamInfo] = useState(false);
  const [editTeamMember, setEditTeamMember] = useState(false);

  const [tableData, setTableData] = useState([]);
  const [originData, setOriginData] = useState([]);

  useEffect(() => {
    user.classes.map((item) => {
      if (`${item.class_id}` === classId) {
        if (item.role === 'MANAGER') {
          setIsManager(true);
        } else if (teamMembers[user.id] !== undefined && (item.role === 'NORMAL' && teamMembers[user.id].role === 'MANAGER')) {
          setIsTeamManager(true);
        }
      }
      return <></>;
    });
  }, [classId, teamMembers, user.classes, user.id]);

  useEffect(() => {
    dispatch(fetchClassMembers(authToken, classId));
  }, [authToken, classId, dispatch]);

  useEffect(() => {
    if (!loading.editTeam) {
      dispatch(fetchTeams(authToken, classId));
    }
  }, [authToken, classId, dispatch, loading.editTeam]);

  useEffect(() => {
    if (!loading.editTeamMember && !loading.addTeamMember && !loading.deleteTeamMember) {
      dispatch(fetchTeamMember(authToken, teamId));
    }
  }, [authToken, dispatch, loading.addTeamMember, loading.deleteTeamMember, loading.editTeamMember, teamId]);

  useEffect(() => {
    if (!loading.addTeamMember && !loading.editTeamMember && !loading.deleteTeamMember) {
      setTableData(
        teamMemberIds.map((id) => ({
          username: classMembers[id].username,
          student_id: classMembers[id].student_id,
          real_name: classMembers[id].real_name,
          role: systemRoleTransformation(classMembers[id].role),
          path: '/',
        })),
      );
    }
  }, [teamMemberIds, classMembers, loading.addTeamMember, loading.editTeamMember, loading.deleteTeamMember]);

  const handleInfoBack = () => {
    setEditTeamInfo(false);
  };

  const handleInfoEdit = () => {
    setEditTeamInfo(true);
  };

  const handleMemberBack = () => {
    setEditTeamMember(false);
  };

  const handleMemberEdit = () => {
    setOriginData(tableData);
    setEditTeamMember(true);
  };

  if (teams[teamId] === undefined || classMembers === undefined || teamMemberIds === undefined) {
    if (loading.fetchTeams || loading.fetchTeamMember || commonLoading.fetchClassMember) {
      return <div>loading...</div>;
    }
    return <NoMatch />;
  }

  return (
    <>
      <Typography className={classNames.pageHeader} variant="h3">
        {`${teams[teamId].name} / Detail`}
      </Typography>

      {editTeamInfo ? (
        <TeamInfoEdit
          isManager={isManager}
          teamName={teams[teamId].name}
          label={teams[teamId].label}
          handleBack={handleInfoBack}
        />
      ) : (
        <TeamInfo
          isManager={!(!isManager && !isTeamManager)}
          teamName={teams[teamId].name}
          label={teams[teamId].label}
          handleEdit={handleInfoEdit}
        />
      )}

      {editTeamMember ? (
        <TeamMemberEdit
          isManager={isManager}
          originData={originData}
          handleBack={handleMemberBack}
        />
      ) : (
        <TeamMember
          isManager={isManager}
          tableData={tableData}
          handleEdit={handleMemberEdit}
        />
      )}
    </>
  );
}
