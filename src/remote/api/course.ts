import { Cours, CoursePublishState, CourseTeacher } from '@/models/cours'
import { getApi } from './axios'
import { Api } from '@/models/api'
import { CoursForm } from '@/models/form'
import { objectStorageUrl } from '@/constants/api'
import { AxiosResponse } from 'axios'

export async function createCourse(courseForm: CoursForm): Promise<Api<Cours>> {
  const formData = createCourseFormData(courseForm)

  const { data }: AxiosResponse<Api<Cours>> = await getApi('PRODUCT').post(
    'api/product/v1/courses',
    formData,
    {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    },
  )

  return {
    ...data,
    body: {
      ...data.body,
      thumbnailImageUrls: data.body.thumbnailImageUrls?.map(
        (url: string) => `${objectStorageUrl}/${url}`,
      ),
    },
  }
}

export async function updateCourse({
  courseId,
  courseForm,
}: {
  courseId: number
  courseForm: CoursForm
}): Promise<Api<Cours>> {
  const formData = createCourseFormData(courseForm)
  const { data }: AxiosResponse<Api<Cours>> = await getApi('PRODUCT').put(
    `api/product/v1/courses/${courseId}`,
    formData,
    {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    },
  )

  return {
    ...data,
    body: {
      ...data.body,
      thumbnailImageUrls: data.body.thumbnailImageUrls?.map(
        (url: string) => `${objectStorageUrl}/${url}`,
      ),
    },
  }
}

export async function getCourseList(): Promise<Api<Cours[]>> {
  const { data }: AxiosResponse<Api<Cours[]>> = await getApi('PRODUCT').get(
    'api/product/v1/courses',
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

export async function getCourseTeacher({
  courseId,
}: {
  courseId: number
}): Promise<Api<CourseTeacher>> {
  const { data }: AxiosResponse<Api<CourseTeacher>> = await getApi(
    'PRODUCT',
  ).get(`api/product/v1/courses/${courseId}/teachers`)

  return data
}

export async function getCourse({
  courseId,
}: {
  courseId: number
}): Promise<Api<Cours>> {
  const { data }: AxiosResponse<Api<Cours>> = await getApi('PRODUCT').get(
    `api/product/v1/courses/${courseId}`,
  )

  return {
    ...data,
    body: {
      ...data.body,
      thumbnailImageUrls: data.body.thumbnailImageUrls?.map(
        (url: string) => `${objectStorageUrl}/${url}`,
      ),
    },
  }
}

export async function deleteCourse({
  courseId,
}: {
  courseId: number
}): Promise<Api<any>> {
  const { data }: AxiosResponse<Api<any>> = await getApi('PRODUCT').delete(
    `api/product/v1/courses/${courseId}`,
  )

  return data
}

export async function publishCourse(body: {
  courseId: number
  publishState: CoursePublishState
}): Promise<Api<any>> {
  const { data }: AxiosResponse<Api<any>> = await getApi('PRODUCT').post(
    `api/product/v1/courses/publish`,
    body,
  )

  return data
}

function createCourseFormData(courseForm: CoursForm): FormData {
  const formData = new FormData()
  formData.append(`teacherId`, `${courseForm.teacherId}`)
  courseForm.thumbnailImageFiles.forEach((fileForm, index) => {
    fileForm.file != null &&
      formData.append(`thumbnailImageFiles[${index}].file`, fileForm.file)
    formData.append(`thumbnailImageFiles[${index}].url`, fileForm.url)
  })

  formData.append('courseCategoryId', String(courseForm.courseCategoryId))
  formData.append('title', courseForm.title)
  formData.append('subTitle', courseForm.subTitle)
  formData.append('descriptionWithMarkdown', courseForm.descriptionWithMarkdown)
  formData.append('courseLevelId', String(courseForm.courseLevelId))
  courseForm.tags.forEach((tag, index) => {
    formData.append(`tags[${index}]`, tag)
  })
  formData.append('price', String(courseForm.price))

  return formData
}
