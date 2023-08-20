export interface TeamMember {
  member_id: number;
  role: 'GUEST' | 'NORMAL' | 'MANAGER';
}

export interface SelectedTeamMember extends TeamMember {
  username: string;
}

export type AddTeamResponse = boolean[];
