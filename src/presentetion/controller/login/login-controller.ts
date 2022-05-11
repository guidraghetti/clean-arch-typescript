import { badRequest, serverError, success, unauthorized } from '../../helpers/http/http-helper'
import { Validation } from '../protocols/validation'
import { Authentication, Controller, HttpRequest, HttpResponse } from './login-controller-protocols'

export class LoginController implements Controller {
  private readonly authentication: Authentication
  private readonly validation: Validation

  constructor (authentication: Authentication, validation: Validation) {
    this.authentication = authentication
    this.validation = validation
  }

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const bodyError = this.validation.validate(httpRequest.body)
      if (bodyError) {
        return badRequest(bodyError)
      }

      const { email, password } = httpRequest.body

      const accessToken = await this.authentication.auth({ email, password })
      if (!accessToken) {
        return unauthorized()
      }

      return success({ accessToken })
    } catch (error) {
      return serverError(error)
    }
  }
}
