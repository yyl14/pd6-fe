import { Snackbar } from '@material-ui/core';
import { useEffect, useState } from 'react';

import GeneralLoading from '@/components/GeneralLoading';
import NoMatch from '@/components/noMatch';
import PageTitle from '@/components/ui/PageTitle';
import systemRoleTransformation from '@/function/systemRoleTransformation';
import useReduxStateShape from '@/hooks/useReduxStateShape';
import useAccountSummaries from '@/lib/accountSummary/useAccountSummaries';
import useTeam from '@/lib/team/useTeam';
import useTeamMember from '@/lib/team/useTeamMember';
import useUserClasses from '@/lib/user/useUserClasses';
import useUserId from '@/lib/user/useUserId';

import TeamDelete from './TeamDelete';
import TeamInfo from './TeamInfo';
import TeamInfoEdit from './TeamInfoEdit';
import TeamMember from './TeamMember';
import TeamMemberEdit from './TeamMemberEdit';
import { BrowseTeamMemberResponse, TableDataRow, TeamMemberAccountInfo } from './types';

export default function TeamDetail({
  courseId,
  classId,
  teamId,
}: {
  courseId: string;
  classId: string;
  teamId: string;
}) {
  const { accountClasses } = useUserClasses();
  const userId = useUserId();
  const { team, isLoading: teamIsLoading, error: teamError } = useTeam(Number(teamId));
  const { teamMembers, mutateTeamMembers, isLoading: teamMemberIsLoading } = useTeamMember(Number(teamId));
  const [teamMemberById, teamMemberIds] = useReduxStateShape<BrowseTeamMemberResponse>(
    teamMembers?.map((item) => ({ ...item, id: item.member_id })),
  );
  const { getAccountSummaries } = useAccountSummaries();

  const [editTeamFail, setEditTeamFail] = useState(false);

  const [isManager, setIsManager] = useState(false);
  const [isTeamManager, setIsTeamManager] = useState(false);

  const [editTeamInfo, setEditTeamInfo] = useState(false);
  const [editTeamMember, setEditTeamMember] = useState(false);

  const [tableData, setTableData] = useState<TableDataRow[]>([]);

  useEffect(() => {
    accountClasses?.forEach((item) => {
      if (item.class_id === Number(classId)) {
        if (item.role === 'MANAGER') {
          setIsManager(true);
        } else if (
          teamMemberById[userId] !== undefined &&
          item.role === 'NORMAL' &&
          teamMemberById[userId].role === 'MANAGER'
        ) {
          setIsTeamManager(true);
        }
      }
    });
  }, [classId, teamMemberById, accountClasses, userId]);

  useEffect(() => {
    async function setTable() {
      try {
        const { data } = await getAccountSummaries({
          account_ids: JSON.stringify(teamMemberIds),
        });

        // transform to object using reduce
        const teamMemberAccounts: { [key: number]: TeamMemberAccountInfo } = data.data.reduce((acc, cur) => {
          acc[cur.id] = cur as TeamMemberAccountInfo;
          return acc;
        }, {} as { [key: number]: TeamMemberAccountInfo });

        setTableData(
          teamMemberIds.map((id) => ({
            id: String(teamMemberById[id].member_id),
            username: teamMemberAccounts[Number(id)].username,
            student_id: teamMemberAccounts[Number(id)].student_id,
            real_name: teamMemberAccounts[Number(id)].real_name,
            role: systemRoleTransformation(teamMemberById[id].role),
            path: `/user-profile/${teamMemberById[id].member_id}`,
          })),
        );
      } catch {
        setTableData([]);
      }
    }

    if (team && teamMembers) {
      setTable();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [teamMembers]);

  const handleInfoBack = () => {
    setEditTeamInfo(false);
  };

  const handleInfoEdit = () => {
    setEditTeamInfo(true);
  };

  const handleMemberBack = () => {
    mutateTeamMembers();
    setEditTeamMember(false);
  };

  const handleMemberEdit = () => {
    setEditTeamMember(true);
  };

  if (teamIsLoading.read || teamMemberIsLoading.browse) {
    return <GeneralLoading />;
  }
  if (!team || !teamMemberIds) {
    return <NoMatch />;
  }

  return (
    <>
      <PageTitle text={`${team.name} / Detail`} />
      {editTeamInfo ? (
        <TeamInfoEdit
          classId={classId}
          teamId={teamId}
          isManager={isManager}
          teamName={team.name}
          label={team.label}
          handleBack={handleInfoBack}
          setEditTeamFail={setEditTeamFail}
        />
      ) : (
        <TeamInfo
          isManager={!(!isManager && !isTeamManager)}
          teamName={team.name}
          label={team.label}
          handleEdit={handleInfoEdit}
        />
      )}

      {editTeamMember ? (
        <TeamMemberEdit teamId={teamId} isManager={isManager} handleBack={handleMemberBack} />
      ) : (
        <TeamMember isManager={isManager} tableData={tableData} handleEdit={handleMemberEdit} />
      )}

      {isManager && (
        <TeamDelete courseId={courseId} classId={classId} teamId={teamId} teamName={team.name} label={team.label} />
      )}
      <Snackbar
        open={editTeamFail}
        onClose={() => setEditTeamFail(false)}
        message={`Error: ${teamError.edit?.message}`}
      />
    </>
  );
}
