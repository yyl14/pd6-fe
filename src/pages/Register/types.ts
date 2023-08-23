export interface Institute {
  id: number;
  abbreviated_name: string;
  full_name: string;
  email_domain: string;
  is_disabled: boolean;
}

export interface RegisterFormInputs {
  realName: string;
  school: string;
  username: string;
  nickname: string;
  studentId: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export interface ErrorState {
  realName: boolean;
  school: boolean;
  username: boolean;
  studentId: boolean;
  email: boolean;
  password: boolean;
  confirmPassword: boolean;
}

export interface ErrorTextState {
  realName: string;
  school: string;
  username: string;
  studentId: string;
  email: string;
  password: string;
  confirmPassword: string;
}
