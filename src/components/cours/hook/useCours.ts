import { useMarkdownPreviewContext } from '@/contexts/MarkdownPreviewContext'
import { CoursForm } from '@/models/form'
import { useCallback } from 'react'
import { useForm } from 'react-hook-form'

const defaultValues: CoursForm = {
  thumbnailImageFiles: [],
  category: undefined,
  title: '',
  description: '### Hello 👋',
  level: undefined,
  tags: [],
  price: 0,
  subTitle: '',
}

function useCours(id?: number) {
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
    // api
    console.log('Form Submitted!', formValues)
  }

  const handleDescriptionAdd = useCallback(() => {
    open({
      markdown: watch('description'),
      onApply: (markdown: string) => {
        setValue('description', markdown)
        if (watch('description').length > 10) {
          clearErrors('description')
        } else {
          setError('description', {
            message: '설명은 최소 10글자 이상 등록해주세요.',
          })
        }
      },
    })
  }, [watch('description')])

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
