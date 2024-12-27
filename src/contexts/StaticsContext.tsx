import {
  CourseCategory,
  CourseLevel,
  CourseRecommendTag,
} from '@/models/statics'
import {
  getCourseCategoryList,
  getCourseLevelList,
  getCoursRecommedTagList,
} from '@/remote/api/statics'
import { createContext, ReactNode, useContext } from 'react'
import { useQueries } from 'react-query'

interface StaticsContextValue {
  courseCategories: CourseCategory[]
  courseLevels: CourseLevel[]
  coursRecommedTags: CourseRecommendTag[]
}

const Context = createContext<StaticsContextValue | undefined>(undefined)

export function StaticsContextProvider({ children }: { children: ReactNode }) {
  const results = useQueries([
    {
      queryKey: ['course-categories'],
      queryFn: getCourseCategoryList,
    },
    {
      queryKey: ['course-levels'],
      queryFn: getCourseLevelList,
    },

    {
      queryKey: ['course-recommend-tags'],
      queryFn: getCoursRecommedTagList,
    },
  ])

  const courseCategoryList = results[0].data?.body ?? []
  const courseLevelList = results[1].data?.body ?? []
  const coursRecommedTagList = results[2].data?.body ?? []

  const value: StaticsContextValue = {
    courseCategories: courseCategoryList,
    courseLevels: courseLevelList,
    coursRecommedTags: coursRecommedTagList,
  }

  return <Context.Provider value={value}>{children}</Context.Provider>
}

export function useStaticsContext() {
  const values = useContext(Context)

  if (!values) {
    throw new Error('StaticsContext 내부에서 사용해야 합니다.')
  }

  return values
}
