interface CoursFilter {
  categories: string[]
  levels: string[]
  minPrice: number
  maxPrice: number
  minDuration: number
  maxDuration: number
  minEnrolledCount: number
  maxEnrolledCount: number
  search: string
  published: string
  rating: [number, number]
  startDate: string
  endDate: string
}
