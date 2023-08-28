export interface BasicInfoEditForm {
  username: string;
  realName: string;
  nickname: string;
  altMail: string;
  handleBack: (msg: string) => void;
}

export interface BasicInfoForm {
  username: string;
  realName: string;
  nickname: string;
  altMail: string;
  handleEdit: () => void;
}

export interface StudentInfoCardForm {
  studentId: string;
  email: string;
  isDefault: boolean;
  instituteId: string;
  emailVerifId: string;
  pending: boolean;
  map(arg0: (p: StudentInfoCardForm) => import('react/jsx-runtime').JSX.Element): import('react').ReactNode;
}

export interface StudentInfoForm {
  // map(arg0: (p: StudentInfoForm) => import('react/jsx-runtime').JSX.Element): import('react').ReactNode;
  // id: number;
  // institute_id: number;
  // student_id: string;
  // email: string;
  // is_default: boolean;
  // length: number;
  // isDefault: boolean;
  studentId: string;
  email: string;
  isDefault: boolean;
  instituteId: string;
  emailVerifId: string;
  pending: boolean;
  map(arg0: (p: StudentInfoForm) => import('react/jsx-runtime').JSX.Element): import('react').ReactNode;
  length: number;
}

export interface StudentCards {
  id: number;
  institute_id: number;
  student_id: string;
  email: string;
  is_default: boolean;
  map(arg0: (p: StudentCards) => import('react/jsx-runtime').JSX.Element): import('react').ReactNode;
}
