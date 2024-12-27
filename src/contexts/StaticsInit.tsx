import { CourseCategory, CourseLevel } from '@/models/statics'
import { getCourseCategoryList, getCourseLevelList } from '@/remote/api/statics'
import { createContext, ReactNode } from 'react'
import { useQueries, useQuery } from 'react-query'

interface StaticsContextValue {
  courseCategories: CourseCategory[]
  courseLevels: CourseLevel[]
}

const Context = createContext<StaticsContextValue | undefined>(undefined)

function StaticsInit({ children }: { children: ReactNode }) {
  const results = useQueries([
    {
      queryKey: ['course-categories'],
      queryFn: getCourseCategoryList,
    },
    {
      queryKey: ['course-levels'],
      queryFn: getCourseLevelList,
    },
  ])

  const courseCategoryList = results[0].data?.body ?? []
  const courseLevelList = results[1].data?.body ?? []

  const value = {
    courseCategories: courseCategoryList,
    courseLevels: courseLevelList,
  }

  return <Context.Provider value={value}>{children}</Context.Provider>
}

export default StaticsInit
