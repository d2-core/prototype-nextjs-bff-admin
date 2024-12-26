import { Api } from '@/models/api'
import { Token, User, VerificationSmsCheck } from '@/models/auth'
import { getApi } from './axios'
import { headerMap } from '@/constants/auth'
import { SignupForm } from '@/models/form'

export async function refresh({
  refreshToken,
}: {
  refreshToken: string
}): Promise<Api<Token>> {
  const response = await getApi('AUTH').post(
    'api/auth/v1/tokens/refresh',
    null,
    {
      headers: {
        [headerMap.REFRESH]: refreshToken,
      },
    },
  )
  return response.data
}

export async function getUser(): Promise<Api<User>> {
  const response = await getApi('AUTH').get('api/auth/v1/admin-users/me')

  return response.data
}

export async function createSmsVerificationAuthCode(body: {
  phoneNumber: string
}): Promise<Api<Object>> {
  const response = await getApi('AUTH').post('api/auth/v1/verifications/sms', {
    ...body,
  })

  return response.data
}

export async function checkSmsVerificationCode(body: {
  phoneNumber: string
  authCode: string
}): Promise<Api<VerificationSmsCheck>> {
  const response = await getApi('AUTH').post(
    'api/auth/v1/verifications/sms/check-code',
    {
      ...body,
    },
  )

  return response.data
}

export async function signup(
  signupForm: SignupForm,
): Promise<Api<User & { token: Token }>> {
  const response = await getApi('AUTH').post('api/auth/v1/admin-users', {
    ...signupForm,
  })

  return response.data
}

export async function login(body: {
  email: string
  password: string
}): Promise<Api<User & { token: Token }>> {
  const response = await getApi('AUTH').post('api/auth/v1/admin-users/login', {
    ...body,
  })

  return response.data
}
