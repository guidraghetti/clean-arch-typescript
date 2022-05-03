import { InvalidParamError, MissingParamError } from '../../errors'
import { badRequest, serverError, success, unauthorized } from '../../helpers/http-helper'
import { Authentication, Controller, EmailValidator, HttpRequest, HttpResponse } from './login-protocols'

export class LoginController implements Controller {
  private readonly emailValidator: EmailValidator
  private readonly authentication: Authentication

  constructor (emailValidator: EmailValidator, authentication: Authentication) {
    this.emailValidator = emailValidator
    this.authentication = authentication
  }

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const { email, password } = httpRequest.body

      const requiredFields = ['email', 'password']
      for (const requiredField of requiredFields) {
        if (!httpRequest.body[requiredField]) {
          return badRequest(new MissingParamError(requiredField))
        }
      }

      if (!email) {
        return badRequest(new MissingParamError('email'))
      }

      if (!password) {
        return badRequest(new MissingParamError('password'))
      }

      const isValidEmail = this.emailValidator.isValid(email)

      if (!isValidEmail) {
        return badRequest(new InvalidParamError('email'))
      }

      const accessToken = await this.authentication.auth(email, password)

      if (!accessToken) {
        return unauthorized()
      }

      return success({ accessToken })
    } catch (error) {
      return serverError(error)
    }
  }
}
