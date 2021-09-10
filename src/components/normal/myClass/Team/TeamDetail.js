import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { fetchTeam, fetchTeamMembers } from '../../../../actions/myClass/team';
import TeamInfo from './detail/TeamInfo';
import TeamInfoEdit from './detail/TeamInfoEdit';
import TeamMember from './detail/TeamMember';
import TeamMemberEdit from './detail/TeamMemberEdit';
import NoMatch from '../../../noMatch';
import systemRoleTransformation from '../../../../function/systemRoleTransformation';
import GeneralLoading from '../../../GeneralLoading';
import PageTitle from '../../../ui/PageTitle';

/* This is a level 4 component (page component) */
export default function ChallengeList() {
  const dispatch = useDispatch();
  const { classId, teamId } = useParams();

  const authToken = useSelector((state) => state.auth.token);
  const teams = useSelector((state) => state.teams.byId);
  const teamMembers = useSelector((state) => state.teamMembers.byId);
  const teamMemberIds = useSelector((state) => state.teamMembers.allIds);
  const loading = useSelector((state) => state.loading.myClass.team);

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
    if (!loading.editTeam) {
      dispatch(fetchTeam(authToken, teamId));
    }
  }, [authToken, dispatch, loading.editTeam, teamId]);

  useEffect(() => {
    if (!loading.addTeamMember && !loading.editTeamMember && !loading.deleteTeamMember) {
      dispatch(fetchTeamMembers(authToken, teamId));
    }
  }, [authToken, dispatch, teamId, loading.addTeamMember, loading.deleteTeamMember, loading.editTeamMember]);

  useEffect(() => {
    setTableData(
      teamMemberIds.map((id) => ({
        id: teamMembers[id] ? teamMembers[id].member_id : '',
        username: teamMembers[id] ? teamMembers[id].account.username : '',
        student_id: teamMembers[id] ? teamMembers[id].account.student_id : '',
        real_name: teamMembers[id] ? teamMembers[id].account.real_name : '',
        role: systemRoleTransformation(teamMembers[id].role),
        path: '/',
      })),
    );
  }, [teamMemberIds, teamMembers]);

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

  if (loading.fetchTeam || loading.fetchTeamMember) {
    return <GeneralLoading />;
  }
  if (teams[teamId] === undefined || teamMemberIds === undefined) {
    return <NoMatch />;
  }

  return (
    <>
      <PageTitle text={`${teams[teamId].name} / Detail`} />
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
          tableData={tableData}
          setOriginData={setTableData}
          handleBack={handleMemberBack}
        />
      ) : (
        <TeamMember isManager={isManager} tableData={tableData} handleEdit={handleMemberEdit} />
      )}
    </>
  );
}
