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

export interface StudentInfoForm {
  studentId: string;
  email: string;
  isDefault: boolean;
  instituteId: string;
  emailVerifId: string;
  pending: boolean;
  // map(arg0: (p: StudentInfoForm) => import('react/jsx-runtime').JSX.Element): import('react').ReactNode;
  length: number;
}

export interface PendingStudentCardsForm {
  id: number;
  email: string;
  account_id: number;
  institute_id: number;
  student_id: string;
  is_consumed: boolean;
}

export interface StudentCardType {
  id: number;
  institute_id: number;
  student_id: string;
  email: string;
  is_default: boolean;
}
