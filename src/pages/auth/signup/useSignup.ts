import { localstorageMap } from '@/constants/localstorage'
import useUser from '@/hooks/auth/useUser'
import { SignupForm } from '@/models/form'
import {
  checkSmsVerificationCode,
  createSmsVerificationAuthCode,
  signup,
} from '@/remote/api/auth'
import { authStorage } from '@/store/local'
import { useRouter } from 'next/router'
import { useForm } from 'react-hook-form'
import { useMutation } from 'react-query'

const defaultValues: SignupForm = {
  adminUserRole: 'TEAM_MEMBER',
  nickname: '',
  email: '',
  password: '',
  passwordConfirm: '',
  phoneNumber: '',
  authCode: '',
  checkAuthCodeId: -1,
}

function useSignup() {
  const rotue = useRouter()
  const { setUser } = useUser()
  const {
    register,
    watch,
    setValue,
    setError,
    clearErrors,
    formState: { errors },
  } = useForm<SignupForm>({
    defaultValues,
    mode: 'onChange',
  })

  const smsRequestMutation = useMutation(createSmsVerificationAuthCode, {
    onSuccess: (data) => {
      alert('인증 코드가 전송되었습니다.')
    },
    onError: (error: any) => {
      console.log(error)
      alert('인증 코드 생성에 실패했습니다. 다시 시도해주세요.')
    },
  })

  const smsVerifyMutation = useMutation(checkSmsVerificationCode, {
    onSuccess: (data) => {
      clearErrors('checkAuthCodeId')
      setValue('checkAuthCodeId', data.body.verificationSmsCheckId)
    },
    onError: (error: any) => {
      setError('checkAuthCodeId', { message: '인증 코드가 일치하지 않습니다.' })
      setValue('checkAuthCodeId', defaultValues.checkAuthCodeId)
    },
  })

  const signupMutation = useMutation(signup, {
    onSuccess: (data) => {
      alert('회원가입에 성공했습니다!')
      const {
        token: { accessToken, refreshToken },
        ...users
      } = data.body
      if (accessToken != null && refreshToken != null) {
        authStorage.set(localstorageMap.AUTH.ACCESS_TOKEN, accessToken)
        authStorage.set(localstorageMap.AUTH.REFRESH_TOKEN, refreshToken)
        setUser(users)
        rotue.push('/workspace')
      } else {
        alert('로그인에 실패했습니다. 다시 시도해주세요.')
        rotue.push('/auth/login')
      }
    },
    onError: (error: any) => {
      alert('회원가입에 실패했습니다. 다시 시도해주세요.')
    },
  })

  const handleRequestAuthCode = (phoneNumber: string) => {
    setValue('authCode', defaultValues.authCode)
    setValue('checkAuthCodeId', defaultValues.checkAuthCodeId)
    clearErrors('checkAuthCodeId')
    smsRequestMutation.mutate({ phoneNumber })
  }

  const handleAuthCodeCheck = (phoneNumber: string, authCode: string) => {
    smsVerifyMutation.mutate({ phoneNumber, authCode })
  }

  const handleSubmit = (formValues: SignupForm) => {
    signupMutation.mutate({ ...formValues })
  }

  const hasSubmit = Object.keys(errors).length === 0 && valid(watch())

  return {
    defaultValues,
    register,
    watch,
    errors,
    hasSubmit,
    handleRequestAuthCode,
    handleAuthCodeCheck,
    handleSubmit,
  }
}

function valid(formValues: SignupForm) {
  return Object.entries(formValues).every(([key, value]) => {
    if (key === 'checkAuthCodeId') {
      return value !== -1
    }
    return Boolean(value)
  })
}

export default useSignup
