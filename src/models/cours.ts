import { CoursCategory, CoursLebvel } from './form'

export type CoursePublishState = 'PUBLISH' | 'UN_PUBLISH'

export interface Cours {
  id: number
  thumbnailImageUrls: string[]
  courseCategoryId?: number
  title?: string
  subTitle?: string
  descriptionWithMarkdown?: string
  courseLevelId?: number
  tags: string[]
  publishState?: CoursePublishState

  price?: number
  studentCount?: number
  duration?: number

  createdAt?: string
  updatedAt?: string
  publishedAt?: string
}

export interface CourseTeacher {
  id: number
  courseId?: number
  name?: string
}

export interface CourseDetailStatistics {
  studentStatistics: {
    totalStudents: number
    activeStudents: number
    completedStudents: number
  }
  lectureStatistics: {
    totalLectures: number
    totalDuration: number
    averageDuration: number
  }
}
