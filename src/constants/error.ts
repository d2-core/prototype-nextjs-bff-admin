import { Result } from '../models/api'

export const errorMap = {
  GLOBAL: {
    UNKNWON: {
      code: 'CLIENT-0001',
      reason: 'invalid refresh token',
      message:
        '현재 시스템에 일시적인 문제가 발생했습니다. 잠시 후 다시 시도해주세요.',
    } as Result,
  },
  API: {
    IMVALID_REFRESH_TOKEN: {
      code: 'CLIENT-1001',
      reason: 'invalid refresh token',
      message:
        '현재 시스템에 일시적인 문제가 발생했습니다. 잠시 후 다시 시도해주세요.',
    } as Result,
    CONNECT_REFUSED: {
      code: 'CLIENT-1002',
      reason: 'connect refused',
      message:
        '현재 시스템에 일시적인 문제가 발생했습니다. 잠시 후 다시 시도해주세요.',
    } as Result,
    NOT_INIT_API_INSTANCE: {
      code: 'CLIENT-1003',
      reason: 'not init api instance',
      message:
        '현재 시스템에 일시적인 문제가 발생했습니다. 잠시 후 다시 시도해주세요.',
    } as Result,
  },
}
