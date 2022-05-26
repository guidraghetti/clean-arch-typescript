import { Authentication } from '../../../../domain/usecases'
import { badRequest, serverError, success, unauthorized } from '../../../helpers/http/http-helper'
import { Controller, HttpRequest, HttpResponse } from '../../../protocols'
import { Validation } from '../../../protocols/validation'

export class LoginController implements Controller {
  constructor (
    private readonly authentication: Authentication,
    private readonly validation: Validation
  ) {}

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
