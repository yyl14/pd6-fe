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
import { useParams } from 'react-router-dom';
import { fetchTeams, fetchTeamMember, editTeam } from '../../../../actions/myClass/team';
import { fetchClassMembers } from '../../../../actions/common/common';
import TeamInfo from './detail/TeamInfo';
import TeamInfoEdit from './detail/TeamInfoEdit';
import TeamMember from './detail/TeamMember';
import TeamMemberEdit from './detail/TeamMemberEdit';
import NoMatch from '../../../noMatch';
import SimpleBar from '../../../ui/SimpleBar';
import systemRoleTransformation from '../../../../function/systemRoleTransformation';
import GeneralLoading from '../../../GeneralLoading';

const useStyles = makeStyles((theme) => ({
  pageHeader: {
    marginBottom: '50px',
  },
}));

/* This is a level 4 component (page component) */
export default function ChallengeList() {
  const classNames = useStyles();
  const dispatch = useDispatch();
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

  useEffect(() => {
    user.classes.forEach((item) => {
      if (item.class_id === parseInt(classId, 10)) {
        if (item.role === 'MANAGER') {
          setIsManager(true);
        } else if (
          teamMembers[user.id] !== undefined
          && item.role === 'NORMAL'
          && teamMembers[user.id].role === 'MANAGER'
        ) {
          setIsTeamManager(true);
        }
      }
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
    dispatch(fetchTeamMember(authToken, teamId));
  }, [authToken, dispatch, teamId]);

  useEffect(() => {
    setTableData(
      teamMemberIds.map((id) => ({
        id: classMembers[id].member_id,
        username: classMembers[id].username,
        student_id: classMembers[id].student_id,
        real_name: classMembers[id].real_name,
        role: systemRoleTransformation(teamMembers[id].role),
        path: '/',
      })),
    );
  }, [teamMemberIds, classMembers, teamMembers]);

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
    setEditTeamMember(true);
  };

  if (loading.fetchTeams || loading.fetchTeamMember || commonLoading.fetchClassMember) {
    return <GeneralLoading />;
  }
  if (teams[teamId] === undefined || classMembers === undefined || teamMemberIds === undefined) {
    return <NoMatch />;
  }
  // console.log(tableData);

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
        <TeamMemberEdit isManager={isManager} setOriginData={setTableData} handleBack={handleMemberBack} />
      ) : (
        <TeamMember isManager={isManager} tableData={tableData} handleEdit={handleMemberEdit} />
      )}
    </>
  );
}
