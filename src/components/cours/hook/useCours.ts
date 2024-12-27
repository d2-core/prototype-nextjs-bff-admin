import { useMarkdownPreviewContext } from '@/contexts/MarkdownPreviewContext'
import { CoursForm } from '@/models/form'
import { createCourse } from '@/remote/api/course'
import { useRouter } from 'next/router'
import { useCallback } from 'react'
import { useForm } from 'react-hook-form'
import { useMutation } from 'react-query'

const defaultValues: CoursForm = {
  thumbnailImageFiles: [],
  courseCategoryId: 0,
  title: '',
  descriptionWithMarkdown: '### Hello 👋',
  courseLevelId: 0,
  tags: [],
  price: 0,
  subTitle: '',
}

function useCours(id?: number) {
  const route = useRouter()
  const { open } = useMarkdownPreviewContext()
  const {
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

  const createCourseMutation = useMutation(createCourse, {
    onSuccess: (data) => {
      alert('인증 코드가 전송되었습니다.')
    },
    onError: (error: any) => {
      console.log(error)
      alert('인증 코드 생성에 실패했습니다. 다시 시도해주세요.')
    },
  })

  const imagesUpload = (images: File[]) => {
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
    createCourseMutation.mutate(formValues)
    route.push('/workspace/cours')
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

export default useCours
