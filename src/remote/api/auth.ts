import { Api } from '@/models/api'
import { IssuedToken, Token, User } from '@/models/auth'
import { getApi } from './axios'
import { headerMap } from '@/constants/auth'

export async function refresh(refreshToken: string): Promise<Api<IssuedToken>> {
  const response = await getApi('AUTH').post('auth/v1/tokens/refresh', null, {
    headers: {
      [headerMap.REFRESH]: refreshToken,
    },
  })
  return response.data
}

export async function getUser(): Promise<Api<User>> {
  const response = await getApi('AUTH').get('auth/v1/admin-users/me')

  return response.data
}

export async function signup(
  email: string,
  password: string,
  code: string,
): Promise<Api<User & { token: Token }>> {
  const response = await getApi('AUTH').post('auth/v1/admin-users', {
    email: email,
    password: password,
    code: code,
  })

  return response.data
}

export async function login(
  email: string,
  password: string,
): Promise<Api<User & { token: Token }>> {
  const response = await getApi('AUTH').post('auth/v1/admin-users/login', {
    email: email,
    password: password,
  })

  return response.data
}
