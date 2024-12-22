export interface User {
  id?: number
  role?: 'ADMIN' | 'APP'
  nickName?: string
  email?: string
  phoneNumber?: string
  status?: 'REGISTERED' | 'UNREGISTERED'
  registeredAt?: string
  modifiedAt?: string
  lastLoginAt: string
}

export interface Token {
  accessToken?: string
  accessTokenExpiredAt?: string
  refreshToken?: string
  refreshTokenExpiredAt?: string
}

export interface IssuedToken {
  token?: string
  expiredAt?: string
}
