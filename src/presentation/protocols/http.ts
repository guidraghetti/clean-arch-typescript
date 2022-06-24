export type HttpResponse = {
  statusCode: number
  body: any
}

export type HttpRequest = {
  headers?: any
  body?: any
  params?: Record<string, string>
}
