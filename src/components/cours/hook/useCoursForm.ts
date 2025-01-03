import { useTeacherContext } from '@/contexts/TeacherContext'
import { useMarkdownPreviewContext } from '@/contexts/MarkdownPreviewContext'
import { CoursForm } from '@/models/form'
import { FileForm } from '@/models/image'
import { createCourse, getCourse, updateCourse } from '@/remote/api/course'
import { useRouter } from 'next/router'
import { useCallback, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useMutation, useQuery } from 'react-query'

const defaultValues: CoursForm = {
  teacherId: 0,
  thumbnailImageFiles: [],
  courseCategoryId: 0,
  title: '',
  descriptionWithMarkdown: '### Hello 👋',
  courseLevelId: 0,
  tags: [],
  price: 0,
  subTitle: '',
}

function useCoursForm(id?: number) {
  const route = useRouter()
  const { teacher } = useTeacherContext()
  const { open } = useMarkdownPreviewContext()
  const {
    reset,
    register,
    setValue,
    clearErrors,
    setError,
    watch,
    formState: { errors },
  } = useForm<CoursForm>({
    defaultValues: defaultValues,
    mode: 'onChange',
  })

  const { data: course, isSuccess } = useQuery(
    ['course', id],
    () => getCourse({ courseId: id ?? 0 }),
    {
      enabled: Boolean(id),
    },
  )

  const createCourseMutation = useMutation(createCourse)
  const updateCourseMutation = useMutation(updateCourse)

  const imagesUpload = (images: FileForm[]) => {
    setValue('thumbnailImageFiles', images)
    if (images.length > 0) {
      clearErrors('thumbnailImageFiles')
    } else {
      setError('thumbnailImageFiles', {
        message: '이미지는 최소 1장 이상 등록해주세요.',
      })
    }
  }

  const onAddTag = (tags: string[]) => {
    setValue('tags', tags)
  }

  const handleSubmit = (formValues: CoursForm) => {
    if (id == null) {
      createCourseMutation.mutate(formValues, {
        onSuccess: () => {
          route.push('/workspace/cours')
        },
        onError: () => {},
      })
    } else {
      updateCourseMutation.mutate(
        { courseId: id, courseForm: { ...formValues } },
        {
          onSuccess: () => {
            route.push('/workspace/cours')
          },
          onError: () => {},
        },
      )
    }
  }

  const handleDescriptionAdd = useCallback(() => {
    open({
      markdown: watch('descriptionWithMarkdown'),
      onApply: (markdown: string) => {
        setValue('descriptionWithMarkdown', markdown)
        if (watch('descriptionWithMarkdown').length > 10) {
          clearErrors('descriptionWithMarkdown')
        } else {
          setError('descriptionWithMarkdown', {
            message: '설명은 최소 10글자 이상 등록해주세요.',
          })
        }
      },
    })
  }, [watch('descriptionWithMarkdown')])

  const hasSubmit = Object.keys(errors).length === 0

  useEffect(() => {
    setValue('teacherId', teacher?.id ?? 0)
  }, [teacher])

  useEffect(() => {
    if (isSuccess && course) {
      const {
        body: {
          thumbnailImageUrls,
          courseCategoryId,
          title,
          descriptionWithMarkdown,
          courseLevelId,
          tags,
          price,
          subTitle,
        },
      } = course

      const fileForms: FileForm[] = thumbnailImageUrls.map((url) => ({
        file: null,
        url: url,
      }))

      const form = {
        thumbnailImageFiles: fileForms,
        courseCategoryId: courseCategoryId ?? 0,
        title: title ?? '',
        descriptionWithMarkdown: descriptionWithMarkdown ?? '',
        courseLevelId: courseLevelId ?? 0,
        tags: tags,
        price: price ?? 0,
        subTitle: subTitle ?? '',
      }
      reset(form)
    }
  }, [course, isSuccess])

  return {
    defaultValues,
    register,
    watch,
    errors,
    hasSubmit,
    onAddTag,
    imagesUpload,
    handleDescriptionAdd,
    handleSubmit,
  }
}

export default useCoursForm
