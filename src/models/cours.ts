import { CoursCategory, CoursLebvel } from './form'

export interface Cours {
  id: number
  thumbnailImageUrls: string[]
  category?: CoursCategory
  title?: string
  descriptionWithMarkdown?: string
  level?: CoursLebvel
  tags: string[]
  price?: number
  author?: string
  rating?: number
  createdAt?: string
  updatedAt?: string
  publishState?: 'PUBLISH' | 'UN_PUBLISH'
  publishedAt?: string
  courseStatistics?: CourseDetailStatistics
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
