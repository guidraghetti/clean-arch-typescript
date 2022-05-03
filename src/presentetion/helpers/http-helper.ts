import { HttpResponse } from '../controller/protocols/http'
import { UnauthorizedError } from '../errors'
import { ServerError } from '../errors/server-error'

export const badRequest = (error: Error): HttpResponse => ({
  statusCode: 400,
  body: error
})

export const serverError = (error: Error): HttpResponse => ({
  statusCode: 500,
  body: new ServerError(error.stack)
})

export const success = (data: any): HttpResponse => ({
  statusCode: 200,
  body: data
})

export const unauthorized = (): HttpResponse => ({
  statusCode: 401,
  body: new UnauthorizedError()
})
