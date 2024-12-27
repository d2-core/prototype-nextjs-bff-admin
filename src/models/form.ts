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

export const coursLevelMap = {
  beginner: '초보',
  intermediate: '중급',
  advanced: '상급',
}
export type CoursLebvel = keyof typeof coursLevelMap

export const coursCategoryMap = {
  program: '프로그램',
  design: '디자인',
  media: '미디어',
  mindset: '마인드셋',
}
export type CoursCategory = keyof typeof coursCategoryMap

export interface CoursForm {
  thumbnailImageFiles: File[]
  courseCategoryId: number
  title: string
  subTitle: string
  descriptionWithMarkdown: string
  courseLevelId: number
  tags: string[]
  price: number
}

export interface LectureForm {
  title: string
  description: string
  videoUrl: string // with hls
  isPreview: boolean
  order: number
}
