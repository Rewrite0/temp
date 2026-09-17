export interface ApiResponse<T = any> {
  code: number
  msg: string
  data: T
}

export class ApiError extends Error {
  code: number
  constructor(code: number, message: string) {
    super(message)
    this.code = code
  }
}
