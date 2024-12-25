import { CoursForm } from '@/models/form'
import { useForm } from 'react-hook-form'

const defaultValues: CoursForm = {
  thumbnailImageFiles: [],
  category: undefined,
  title: '',
  description: '',
  level: undefined,
  tags: [],
  price: 0,
  subTitle: '',
}

function useCours(id?: number) {
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

  const hasSubmit = Object.keys(errors).length === 0

  return {
    defaultValues,
    register,
    watch,
    errors,
    hasSubmit,
    onAddTag,
    imagesUpload,
    handleSubmit,
  }
}

export default useCours
