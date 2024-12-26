export interface Lecture {
  id: number
  imageUrl?: string
  title?: string
  description?: string
  videoUrl?: string // with hls
  isPreview?: boolean
  isPublish?: boolean
  order?: number
  duration?: number
  createdAt?: string
  updatedAt?: string
  publishedAt?: string
}
