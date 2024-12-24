import { Result } from '@/models/api'

export default class ClientError extends Error {
  msg: string
  log: string
  body?: any

  constructor({
    result,
    reasonArg,
    body,
  }: {
    result: Result
    reasonArg: string
    body?: any
  }) {
    super()
    this.msg = `${result.message} [${result.code}]`
    this.log = `Code: ${result.code}, Reason: ${result.reason} [${reasonArg}]`
    this.body = body
  }
}
