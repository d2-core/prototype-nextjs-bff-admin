import { localstorageMap } from '@/constants/localstorage'
import ApiError from '@/errors/ApiError'
import useUser from '@/hooks/auth/useUser'
import { LoginForm } from '@/models/form'
import { login } from '@/remote/api/auth'
import { authStorage } from '@/store/local'
import { useRouter } from 'next/router'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useMutation } from 'react-query'

const defaultValues: LoginForm = {
  email: '',
  password: '',
}

function useLogin() {
  const {
    register,
    watch,
    formState: { errors },
  } = useForm<LoginForm>({
    defaultValues: defaultValues,
    mode: 'onChange',
  })

  const route = useRouter()
  const { setUser } = useUser()

  const [serverErrorMessage, setServerErrorMessage] = useState('')

  const loginMutation = useMutation(login, {
    onSuccess: (data) => {
      const {
        token: { accessToken, refreshToken },
        ...users
      } = data.body
      if (accessToken != null && refreshToken != null) {
        authStorage.set(localstorageMap.AUTH.ACCESS_TOKEN, accessToken)
        authStorage.set(localstorageMap.AUTH.REFRESH_TOKEN, refreshToken)
        setUser(users)
        route.push('/')
      } else {
        alert('로그인에 실패했습니다. 잠시후 다시 시도해주세요.')
      }
    },
    onError: (error: any) => {
      if (error instanceof ApiError) {
        const { msg, code } = error as ApiError
        const replaceMessage = msg.replace(code, '').replace('[]', '')
        setServerErrorMessage(replaceMessage)
      }
    },
  })

  const hasSubmit = Object.keys(errors).length === 0 && valid(watch())

  const handleSubmit = (formvalues: LoginForm) => {
    loginMutation.mutate(formvalues)
  }

  return {
    defaultValues,
    register,
    watch,
    errors,
    hasSubmit,
    handleSubmit,
    serverErrorMessage,
  }
}

function valid(formValues: LoginForm) {
  return Object.entries(formValues).every(([value]) => {
    return Boolean(value)
  })
}

export default useLogin
