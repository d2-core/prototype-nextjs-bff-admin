import { Api } from '@/models/api'
import { AxiosResponse } from 'axios'
import { getApi } from './axios'
import { Teacher } from '@/models/teacher'
import { Cours } from '@/models/cours'
import { objectStorageUrl } from '@/constants/api'

export async function getTeacher({
  adminUserId,
}: {
  adminUserId: number
}): Promise<Api<Teacher>> {
  const { data }: AxiosResponse<Api<Teacher>> = await getApi('PRODUCT').get(
    `api/product/v1/teachers/by-admin-user/${adminUserId}`,
  )

  return data
}

export async function getTeacherCourseList({
  teacherId,
}: {
  teacherId: number
}): Promise<Api<Cours[]>> {
  const { data }: AxiosResponse<Api<Cours[]>> = await getApi('PRODUCT').get(
    `api/product/v1/teachers/${teacherId}/courses`,
  )

  return {
    ...data,
    body: data.body.map((course) => ({
      ...course,
      thumbnailImageUrls: course.thumbnailImageUrls?.map(
        (url: string) => `${objectStorageUrl}/${url}`,
      ),
    })),
  }
}
