import { Cours } from '@/models/cours'
import { getApi } from './axios'
import { Api } from '@/models/api'
import { CoursForm } from '@/models/form'

export async function createCourse(courseForm: CoursForm): Promise<Api<Cours>> {
  const formData = createCourseFormData(courseForm)
  const { data } = await getApi('PRODUCT').post(
    'api/product/v1/courses',
    formData,
    {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    },
  )

  return data
}

export async function getCourseList(): Promise<Api<Cours[]>> {
  const { data } = await getApi('PRODUCT').get('api/product/v1/courses')

  return data
}

function createCourseFormData(courseForm: CoursForm): FormData {
  const formData = new FormData()

  Object.entries(courseForm).forEach(([key, value]) => {
    if (key === 'thumbnailImageFiles' && value.length === 0) {
      formData.append(key, JSON.stringify([]))
    } else if (Array.isArray(value)) {
      value.forEach((item, index) => {
        if (item instanceof File) {
          formData.append(`${key}[${index}]`, item)
        } else {
          formData.append(`${key}[${index}]`, item)
        }
      })
    } else {
      formData.append(key, value as string)
    }
  })

  return formData
}
