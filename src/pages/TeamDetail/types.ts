export interface TeamMemberAccountInfo {
  id: number | null;
  username: string;
  student_id: string;
  real_name: string;
}

export interface BasicTableDataRow {
  id: string;
  username: string;
  student_id: string;
  real_name: string;
  role: string;
}

export interface TableDataRow extends BasicTableDataRow {
  path: string;
}

export type TeamRole = 'NORMAL' | 'MANAGER' | 'GUEST';

export type TempAddTeamMember = {
  id: string;
  account_referral: string;
};

export type AddTeamMember = {
  account_referral: string;
  role: TeamRole;
};

export type BrowseTeamMemberResponse = {
  id: number;
  member_id: number;
  role: TeamRole;
  team_id: number;
};
