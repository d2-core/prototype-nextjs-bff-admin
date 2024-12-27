import { Api } from '@/models/api'
import { getApi } from './axios'
import {
  CourseCategory,
  CourseLevel,
  CourseRecommendTag,
} from '@/models/statics'

export async function getCourseCategoryList(): Promise<Api<CourseCategory[]>> {
  const { data } = await getApi('PRODUCT').get(
    'api/product/v1/statics/course/categories',
  )
  return data
}

export async function getCourseLevelList(): Promise<Api<CourseLevel[]>> {
  const { data } = await getApi('PRODUCT').get(
    'api/product/v1/statics/course/levels',
  )

  return data
}

export async function getCoursRecommedTagList(): Promise<
  Api<CourseRecommendTag[]>
> {
  const { data } = await getApi('PRODUCT').get(
    'api/product/v1/statics/course/recommend-tags',
  )

  return data
}
