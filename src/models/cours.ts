import { CoursCategory, CoursLebvel } from './form'

export interface Cours {
  id: number
  thumbnailImageUrls: string[]
  category?: CoursCategory
  title?: string
  description?: string
  level?: CoursLebvel
  tags: string[]
  price?: number
  duration?: number
  author?: string
  rating?: number
  enrolledCount?: number
  createdAt?: string
  updatedAt?: string
  isPublish?: boolean
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
