export const adminUserRoleMap = {
  MANAGER: 'MANAGER',
  TEACHER: 'TEACHER',
  TEAM_MEMBER: 'TEAM_MEMBER',
}

export type AdminUserRole = keyof typeof adminUserRoleMap

export interface SignupForm {
  adminUserRole: AdminUserRole
  nickname: string
  email: string
  password: string
  passwordConfirm: string
  phoneNumber: string
  authCode: string
  checkAuthCodeId: number
}

export interface LoginForm {
  email: string
  password: string
}
