export interface Result {
  code: string
  reason?: string
  message?: string
}

export interface Api<T> {
  result: Result
  body: T
}
